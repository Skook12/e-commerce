import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import type { Product } from "@/http/type/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
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
          <span className="text-primary">R$ {product.price.toFixed(2)}</span>
          <Button size="sm" className="gap-2">
            <ShoppingCart className="w-4 h-4" />
            Adicionar
          </Button>
        </div>
      </div>
    </Card>
  );
}
