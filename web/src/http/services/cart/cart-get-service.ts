import type { Cart } from "@/http/type/cart";
import { useQuery } from "@tanstack/react-query";

export function useGetCart() {
  return useQuery({
    queryKey: ["get-cart"],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cart`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData.message || "Error loading categories.";
        throw new Error(errorMessage);
      }

      return (await response.json()) as Cart[];
    },
  });
}
