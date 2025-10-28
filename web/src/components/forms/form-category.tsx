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
import { useState } from "react";
import z from "zod/v4";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../ui/toast";
import { toast } from "sonner";
import { useCreateCategory } from "@/http/services/category/category-post-service";
import { useUpdateCategory } from "@/http/services/category/category-put-service";

interface FormProductProps {
  categoryId?: number;
  name?: string;
}

const createSimpleSchema = z.object({
  name: z.string().min(1, { message: "Type a name" }),
});
type createSimpleFormData = z.infer<typeof createSimpleSchema>;

export function FormCategory({ categoryId, name }: FormProductProps) {
  const { mutate: useCreate } = useCreateCategory();
  const { mutate: useUpdate } = useUpdateCategory();
  const [open, setOpen] = useState(false);
  const createForm = useForm<createSimpleFormData>({
    resolver: zodResolver(createSimpleSchema),
    defaultValues: {
      name: name,
    },
  });

  const {
    formState: { errors },
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
    const loadingToastId = showLoadingToast("Updating Category...");
    await useUpdate(
      { data, id: categoryId },
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
        {categoryId ? (
          <Button size="icon" variant="ghost">
            <Pencil className="w-4 h-4" />
          </Button>
        ) : (
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Category
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {categoryId ? "Update Category" : "New Category"}
          </DialogTitle>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={
            categoryId
              ? createForm.handleSubmit(handleUpdate)
              : createForm.handleSubmit(handleCreate)
          }
        >
          <div className="space-y-2">
            <Label htmlFor="name">Category Name</Label>
            <Input id="name" {...createForm.register("name")} />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {categoryId ? "Update" : "Create"} Category
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
