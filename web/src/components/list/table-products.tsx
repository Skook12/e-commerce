import { Trash2 } from "lucide-react";
import { FormProduct } from "../forms/form-product";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useDeleteProduct } from "@/http/services/product/product-delete-service";
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../ui/toast";
import { toast } from "sonner";
import type { Product } from "@/http/type/product";

interface TableProps {
  products?: Product[];
}

export function ProductsTable({ products }: TableProps) {
  const { mutate: deleteProduct } = useDeleteProduct();
  async function handleDelete(id: number) {
    const loadingToastId = showLoadingToast("Deleting Product...");
    await deleteProduct(id, {
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
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-muted-foreground"
                >
                  Products not found
                </TableCell>
              </TableRow>
            ) : (
              products?.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p>{product.name}</p>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {product.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>$ {product.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <FormProduct
                        productId={product.id}
                        name={product.name}
                        category={product.category_id}
                        description={product.description}
                        image={product.image}
                        price={product.price}
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(product.id)}
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
