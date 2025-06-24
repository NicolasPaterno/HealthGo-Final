import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Link } from "react-router-dom"

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <Card className={cn("mx-auto max-w-lg", className)} {...props}>
      <CardHeader>
        <CardTitle className="text-2xl">Criar conta</CardTitle>
        <CardDescription>
          Insira seus dados abaixo para criar sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" type="text" placeholder="Seu nome completo" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="nome@exemplo.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input id="cpf" type="text" placeholder="000.000.000-00" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="birthdate">Data de Nascimento</Label>
              <Input id="birthdate" type="date" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="cep">CEP</Label>
              <Input id="cep" type="text" placeholder="00000-000" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="city">Cidade</Label>
              <Input id="city" type="text" placeholder="Sua cidade" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="street">Rua</Label>
            <Input id="street" type="text" placeholder="Nome da sua rua" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="neighborhood">Bairro</Label>
              <Input id="neighborhood" type="text" placeholder="Seu bairro" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="addressNumber">Número</Label>
              <Input id="addressNumber" type="text" placeholder="Número" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="guideDog" />
            <Label htmlFor="guideDog" className="font-normal">Possui cão guia</Label>
          </div>
          <Button type="submit" className="w-full">
            Criar conta
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Já possui uma conta?{" "}
          <Link to="/login" className="underline">
            Entrar
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}