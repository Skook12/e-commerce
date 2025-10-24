import { LogIn, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "@/components/ui/toast";
import { toast } from "sonner";
import { useLoginValidation } from "@/http/services/login/login-service";
import { useNavigate } from "react-router-dom";

const createSimpleSchema = z.object({
  username: z.string().min(1, { message: "Type a username" }),
  password: z.string().min(1, { message: "Type a password" }),
});
type createSimpleFormData = z.infer<typeof createSimpleSchema>;

export function Login() {
  const { mutate: useLogin } = useLoginValidation();
  const navigate = useNavigate();

  const createForm = useForm<createSimpleFormData>({
    resolver: zodResolver(createSimpleSchema),
  });

  async function handleLogin(data: createSimpleFormData) {
    const loadingToastId = showLoadingToast("Validating user...");
    await useLogin(data, {
      onSuccess: () => {
        toast.dismiss(loadingToastId);
        showSuccessToast(`logged sucessfully`);
        navigate("/dashboard");
      },
      onError: (error) => {
        toast.dismiss(loadingToastId);
        showErrorToast(String(error) || "Error, try again later");
      },
    });
    createForm.reset();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-background p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="mb-2">Access to dashboard</h2>
          <p className="text-muted-foreground">
            Use your username and password to access the dashboard
          </p>
        </div>

        <form
          className="space-y-4"
          onSubmit={createForm.handleSubmit(handleLogin)}
        >
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Error</AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="username">username</Label>
            <Input id="username" {...createForm.register("username")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              {...createForm.register("password")}
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            Entrar
          </Button>

          <div className="bg-muted p-4 rounded-lg mt-4">
            <p className="text-sm text-muted-foreground">
              <strong>user for test:</strong>
              <br />
              username: admin
              <br />
              password: 123
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
}
