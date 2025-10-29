import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useRemoveCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/cart/remove/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        const errorMessage = errorData?.detail || "Error, try again later.";

        throw new Error(errorMessage);
      }

      return response.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-cart"] });
    },
  });
}

export function useRemoveItemCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/cart/removeitem/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        const errorMessage = errorData.message || "Error, try again later.";

        throw new Error(errorMessage);
      }

      return response.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-cart"] });
    },
  });
}
