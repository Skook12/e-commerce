import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import type { Product } from "@/http/type/product";
import { useAddItemCart } from "@/http/services/cart/cart-post-service";
import { showErrorToast, showLoadingToast, showSuccessToast } from "./ui/toast";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { mutate: createCartItem } = useAddItemCart();
  async function handleCreate(id: number) {
    const loadingToastId = showLoadingToast("Adding product...");
    await createCartItem(id, {
      onSuccess: () => {
        toast.dismiss(loadingToastId);
        showSuccessToast(`Product added sucessfully`);
      },
      onError: (error) => {
        toast.dismiss(loadingToastId);
        showErrorToast(String(error) || "Error, try again later");
      },
    });
  }
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <div className="mb-2">
          <h3 className="line-clamp-1">{product.name}</h3>
          <p className="text-muted-foreground line-clamp-2 mt-1">
            {product.description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-primary">$ {product.price.toFixed(2)}</span>
          <Button
            size="sm"
            className="gap-2"
            onClick={() => handleCreate(product.id)}
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </Button>
        </div>
      </div>
    </Card>
  );
}
