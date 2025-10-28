import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/category/delete/${id}`,
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

        const errorMessage =
          errorData?.detail || "Erro ao deletar. Tente novamente mais tarde.";

        throw new Error(errorMessage);
      }

      return response.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-category"] });
    },
  });
}
