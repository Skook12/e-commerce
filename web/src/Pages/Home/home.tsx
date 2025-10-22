import { useState } from "react";
import { Search } from "lucide-react";

import type { Product } from "@/http/type/product";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/Navbar";
import { useGetProducts } from "@/http/services/product/product-get-service";
import { useGetCategories } from "@/http/services/category/category-get-service";
//import { useCart, Product } from "../context/CartContext";

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Fone de Ouvido Premium",
    price: 299.99,
    image:
      "https://images.unsplash.com/photo-1713618651165-a3cf7f85506c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBoZWFkcGhvbmVzfGVufDF8fHx8MTc2MDExMjMwM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Audio",
    description: "Fone com cancelamento de ruído e qualidade excepcional",
  },
  {
    id: "2",
    name: "Smartwatch Pro",
    price: 899.99,
    image:
      "https://images.unsplash.com/photo-1716234479503-c460b87bdf98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNoJTIwd2VhcmFibGV8ZW58MXx8fHwxNzYwMTA0MjQ0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Wearables",
    description: "Relógio inteligente com monitoramento de saúde completo",
  },
  {
    id: "3",
    name: "Teclado Mecânico",
    price: 449.99,
    image:
      "https://images.unsplash.com/photo-1694405156884-dea1ffb40ede?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGtleWJvYXJkfGVufDF8fHx8MTc2MDAwNjExMnww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Periféricos",
    description: "Teclado mecânico RGB com switches premium",
  },
  {
    id: "4",
    name: "Notebook Ultra",
    price: 4999.99,
    image:
      "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjAwNTQzODl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Computadores",
    description: "Laptop poderoso para trabalho e entretenimento",
  },
  {
    id: "5",
    name: "Câmera Profissional",
    price: 3299.99,
    image:
      "https://images.unsplash.com/photo-1579535984712-92fffbbaa266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NjAwODU0MTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Fotografia",
    description: "Câmera DSLR com sensor full frame",
  },
  {
    id: "6",
    name: "Smartphone Elite",
    price: 2499.99,
    image:
      "https://images.unsplash.com/photo-1636308093602-b1f355e8720d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9iaWxlfGVufDF8fHx8MTc2MDA2MzMwMHww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Smartphones",
    description: "Smartphone com câmera tripla e processador potente",
  },
];

export function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const { data: products, isLoading: isLoadingProducts } = useGetProducts();
  const { data: categories, isLoading: isLoadingCategories } =
    useGetCategories();

  const filteredProducts = products?.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Todos" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="bg-gradient-to-br from-primary/10 via-background to-background border-b">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="mb-4">Encontre os melhores produtos</h1>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Tecnologia de ponta com os melhores preços do mercado
          </p>

          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
              className="pl-10"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b bg-background z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories?.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.name ? "default" : "outline"
                }
                size="sm"
                onClick={() => setSelectedCategory(category.name)}
                className="whitespace-nowrap"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-muted-foreground">
            {filteredProducts?.length}{" "}
            {filteredProducts?.length === 1
              ? "produto encontrado"
              : "produtos encontrados"}
          </p>
        </div>

        {filteredProducts?.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Nenhum produto encontrado</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
