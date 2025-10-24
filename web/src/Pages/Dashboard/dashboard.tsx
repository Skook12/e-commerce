import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Package, LogOut } from "lucide-react";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLogout } from "@/http/services/login/logout-service";
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "@/components/ui/toast";
import { toast } from "sonner";
import { FormProduct } from "@/components/forms/form-product";
import { Button } from "@/components/ui/button";
import { useGetProducts } from "@/http/services/product/product-get-service";

const CATEGORIES = [
  "Audio",
  "Wearables",
  "Periféricos",
  "Computadores",
  "Fotografia",
  "Smartphones",
];

export function Dashboard() {
  const { mutate: Logout } = useLogout();
  const navigate = useNavigate();
  const { data: products } = useGetProducts();

  function handleLogout() {
    const loadingToastId = showLoadingToast("Validating user...");
    Logout(undefined, {
      onSuccess: () => {
        toast.dismiss(loadingToastId);
        showSuccessToast(`logged out sucessfully`);
        navigate("/");
      },
      onError: (error) => {
        toast.dismiss(loadingToastId);
        showErrorToast(String(error) || "Error, try again later");
      },
    });
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex items-end justify-end p-5">
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="mb-2">Dashboard de Produtos</h1>
            <p className="text-muted-foreground">
              Gerencie o catálogo de produtos da sua loja
            </p>
          </div>

          <FormProduct />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground">Total de Produtos</p>
                <h3>{products?.length}</h3>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-muted-foreground">Categorias</p>
                <h3>{CATEGORIES.length}</h3>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-muted-foreground">Valor Médio</p>
                <h3>
                  R${" "}
                  {products
                    ? (
                        products?.reduce((sum, p) => sum + p.price, 0) /
                        products.length
                      ).toFixed(2)
                    : "0.00"}
                </h3>
              </div>
            </div>
          </Card>
        </div>

        {/* Products Table */}
        <Card>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Imagem</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products?.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-muted-foreground"
                    >
                      Nenhum produto cadastrado
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
                      <TableCell>R$ {product.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="icon" variant="ghost">
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost">
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
      </div>
    </div>
  );
}
