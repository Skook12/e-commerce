import { useState } from "react";
import { LogIn, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Login() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-background p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="mb-2">Acesso ao Dashboard</h2>
          <p className="text-muted-foreground">
            Entre com suas credenciais administrativas
          </p>
        </div>

        <form className="space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Erro</AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@shop.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>

          <Button type="submit" className="w-full" size="lg">
            Entrar
          </Button>

          <div className="bg-muted p-4 rounded-lg mt-4">
            <p className="text-sm text-muted-foreground">
              <strong>Credenciais de teste:</strong>
              <br />
              Email: admin@shop.com
              <br />
              Senha: admin123
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
}
