import { ShoppingCart, User, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Navbar() {
  const onNavigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("home");

  const handleLogout = () => {
    onNavigate("/");
  };

  return (
    <header className="border-b sticky top-0 bg-background z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl">ModernShop</span>
        </button>

        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => onNavigate("home")}
            className={`transition-colors hover:text-primary ${
              currentPage === "home" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Produtos
          </button>

          <button
            onClick={() => onNavigate("dashboard")}
            className={`transition-colors hover:text-primary ${
              currentPage === "dashboard"
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            Dashboard
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="w-5 h-5" />

            <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0">
              10
            </Badge>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate("dashboard")}
            className="md:hidden"
          >
            <LayoutDashboard className="w-5 h-5" />
          </Button>

          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate("login")}
          >
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
