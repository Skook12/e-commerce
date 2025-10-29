import { Pencil, Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useGetCategories } from "@/http/services/category/category-get-service";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import z from "zod/v4";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../ui/toast";
import { toast } from "sonner";
import { useCreateProduct } from "@/http/services/product/product-post-service";
import { useUpdateProduct } from "@/http/services/product/product-put-service";

interface FormProductProps {
  productId?: number;
  category?: number;
  description?: string;
  image?: string;
  price?: number;
  name?: string;
}

const createSimpleSchema = z.object({
  name: z.string().min(1, { message: "Type a username" }),
  category: z.number().min(1, { message: "Choose a category" }),
  description: z.string().min(1, { message: "Type a description" }),
  image: z.string().min(1, { message: "Type Image url" }),
  price: z.number(),
});
type createSimpleFormData = z.infer<typeof createSimpleSchema>;

export function FormProduct({
  productId,
  name,
  category,
  description,
  image,
  price,
}: FormProductProps) {
  const { data: categories } = useGetCategories();
  const { mutate: useCreate } = useCreateProduct();
  const { mutate: useUpdate } = useUpdateProduct();
  const [open, setOpen] = useState(false);
  const createForm = useForm<createSimpleFormData>({
    resolver: zodResolver(createSimpleSchema),
    defaultValues: {
      name: name,
      category: category,
      description: description,
      image: image,
      price: price,
    },
  });

  const {
    formState: { errors },
    control,
  } = createForm;

  async function handleCreate(data: createSimpleFormData) {
    const loadingToastId = showLoadingToast("Creating Product...");
    await useCreate(data, {
      onSuccess: () => {
        toast.dismiss(loadingToastId);
        showSuccessToast(`Created sucessfully`);
        setOpen(false);
      },
      onError: (error) => {
        toast.dismiss(loadingToastId);
        showErrorToast(String(error) || "Error, try again later");
      },
    });
    createForm.reset();
  }

  async function handleUpdate(data: createSimpleFormData) {
    const loadingToastId = showLoadingToast("Updating Product...");
    await useUpdate(
      { data, id: productId },
      {
        onSuccess: () => {
          toast.dismiss(loadingToastId);
          showSuccessToast(`Updated sucessfully`);
          setOpen(false);
        },
        onError: (error) => {
          toast.dismiss(loadingToastId);
          showErrorToast(String(error) || "Error, try again later");
        },
      }
    );
    createForm.reset();
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {productId ? (
          <Button size="icon" variant="ghost">
            <Pencil className="w-4 h-4" />
          </Button>
        ) : (
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Product
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {productId ? "Update Product" : "New Product"}
          </DialogTitle>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={
            productId
              ? createForm.handleSubmit(handleUpdate)
              : createForm.handleSubmit(handleCreate)
          }
        >
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" {...createForm.register("name")} />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                {...createForm.register("price", { valueAsNumber: true })}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={String(field.value || "")}
                    name={field.name}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((item) => (
                        <SelectItem key={item.id} value={String(item.id)}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              type="url"
              placeholder="https://exemplo.com/imagem.jpg"
              {...createForm.register("image")}
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...createForm.register("description")}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {productId ? "Update" : "Create"} Product
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
