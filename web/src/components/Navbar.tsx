import { ShoppingCart, User, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { CartSheet } from "./Cart";
import { showErrorToast, showLoadingToast, showSuccessToast } from "./ui/toast";
import { toast } from "sonner";
import { useLogout } from "@/http/services/login/logout-service";

export function Navbar() {
  const onNavigate = useNavigate();
  const { mutate: Logout } = useLogout();
  function handleLogout() {
    const loadingToastId = showLoadingToast("Validating user...");
    Logout(undefined, {
      onSuccess: () => {
        toast.dismiss(loadingToastId);
        showSuccessToast(`Logged out sucessfully`);
      },
      onError: (error) => {
        toast.dismiss(loadingToastId);
        showErrorToast(String(error) || "Error, try again later");
      },
    });
  }

  return (
    <header className="border-b sticky top-0 bg-background z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => onNavigate("/")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl">ModernShop</span>
        </button>

        <div className="flex items-center gap-2">
          <CartSheet />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate("dashboard")}
            className="md:hidden"
          >
            <LayoutDashboard className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate("login")}
          >
            <User className="w-5 h-5" />
          </Button>

          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
