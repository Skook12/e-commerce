import type { CategoryPutRequest } from "@/http/type/category/category-put-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CategoryPutRequest) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/category/update/${data.id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data.data),
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
      queryClient.invalidateQueries({ queryKey: ["get-category"] });
    },
  });
}
