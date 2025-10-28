import { useNavigate } from "react-router-dom";
import { Package, LogOut } from "lucide-react";
import { Card } from "@/components/ui/card";
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
import { ProductsTable } from "@/components/list/table-products";
import { useState } from "react";
import { CategoryTable } from "@/components/list/table-category";
import { useGetCategories } from "@/http/services/category/category-get-service";
import { FormCategory } from "@/components/forms/form-category";

export function Dashboard() {
  const { mutate: Logout } = useLogout();
  const { data: products } = useGetProducts();
  const [table, setTable] = useState("products");
  const { data: categories } = useGetCategories();
  const navigate = useNavigate();

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
            <h1 className="mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage the products and categories
            </p>
          </div>
          {table === "products" ? <FormProduct /> : <FormCategory />}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6" onClick={() => setTable("products")}>
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

          <Card className="p-6" onClick={() => setTable("categories")}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-muted-foreground">Categorias</p>
                <h3>{categories?.length}</h3>
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

        {table === "products" ? (
          <ProductsTable products={products} />
        ) : (
          <CategoryTable categories={categories} />
        )}
      </div>
    </div>
  );
}
