import type { ProductPostRequest } from "@/http/type/products/products-post-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ProductPostRequest) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/add`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        const errorMessage =
          errorData.message || "error creating product, try again later";
        throw new Error(errorMessage);
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-products"] });
    },
  });
}
