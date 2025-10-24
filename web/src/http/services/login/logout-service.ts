import { useMutation } from "@tanstack/react-query";

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        const errorMessage =
          errorData.message || "error in login, try again later";
        throw new Error(errorMessage);
      }

      return await response.json();
    },
  });
}
