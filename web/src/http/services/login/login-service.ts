import type { LoginRequest } from "@/http/type/login/login-request";
import { useMutation } from "@tanstack/react-query";

export function useLoginValidation() {
  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
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
