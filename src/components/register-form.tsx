import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ModeToggle } from "./mode-toggle";
import { Link } from "react-router-dom";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Crie sua conta</h1>
                <p className="text-muted-foreground text-balance">
                  Insira seus dados para se registrar
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" type="text" placeholder="Seu nome completo" required />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="maria@exemplo.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input id="cpf" type="text" placeholder="000.000.000-00" required />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="birthdate">Data de Nascimento</Label>
                  <Input id="birthdate" type="date" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="cep">CEP</Label>
                  <Input id="cep" type="text" placeholder="00000-000" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="city">Cidade</Label>
                  <Input id="city" type="text" placeholder="Sua cidade" />
                </div>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="street">Rua</Label>
                <Input id="street" type="text" placeholder="Nome da sua rua" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="neighborhood">Bairro</Label>
                  <Input id="neighborhood" type="text" placeholder="Seu bairro" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="addressNumber">Número</Label>
                  <Input id="addressNumber" type="text" placeholder="Número" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="guideDog" />
                <Label htmlFor="guideDog">Possui cão guia</Label>
              </div>
                <Link to={"/login"}>
              <Button type="submit" className="w-full">
                Registrar
              </Button>
                </Link>
              <div className="text-center text-sm">
                Já possui uma conta?{" "}
                <Link to="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </div>
          </form>
          <div className="relative hidden md:block">
            <ModeToggle />
            <img
              src="src/assets/logo.png"
              alt="Image"
              className="absolute top-2/5 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        Ao clicar em continuar, você concorda com nossos <a href="#">Termos de Serviço</a>{" "}
        e <a href="#">Política de Privacidade</a>.
      </div>
    </div>
  );
}