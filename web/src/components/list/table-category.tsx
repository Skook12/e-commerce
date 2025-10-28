import { Card } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../ui/toast";
import { toast } from "sonner";
import type { Category } from "@/http/type/category";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { FormCategory } from "../forms/form-category";
import { useDeleteCategory } from "@/http/services/category/category-delete-service";

interface TableProps {
  categories?: Category[];
}

export function CategoryTable({ categories }: TableProps) {
  const { mutate: deleteCategory } = useDeleteCategory();
  async function handleDelete(id: number) {
    const loadingToastId = showLoadingToast("Deleting Category...");
    await deleteCategory(id, {
      onSuccess: () => {
        toast.dismiss(loadingToastId);
        showSuccessToast(`product deleted sucessfully`);
      },
      onError: (error) => {
        toast.dismiss(loadingToastId);
        showErrorToast(String(error) || "Error, try again later");
      },
    });
  }
  return (
    <Card>
      <div className="overflow-x-auto p-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-muted-foreground"
                >
                  Categories not found
                </TableCell>
              </TableRow>
            ) : (
              categories?.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <FormCategory
                        categoryId={category.id}
                        name={category.name}
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(category.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
