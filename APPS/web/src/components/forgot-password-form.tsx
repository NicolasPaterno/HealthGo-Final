import { useState } from "react"
// import api from "@/services/api" ← quando for conectar
import { toast } from "sonner";
import api from "@/services/api" // Certifique-se de que o serviço está configurado
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    if (!email) {
      alert("Por favor, preencha o email.")
      setIsLoading(false)
      return
    }

    try {
      // Envie o email real aqui:
      await api.post("/Auth/recuperar-senha", email, {
        headers: {
            "Content-Type": "application/json"
        }
    });

      toast.success("E-mail enviado com sucesso!", {
        description: "Clique no link enviado em seu e-mail para redefinir sua senha.",
        duration: 2000,
     });

      // nao precisa né? navigate("/email-enviado") // <-- crie essa rota depois

    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Não foi possível enviar o email. Digite um email válido.";
      toast.error("Falha AO MANDA EMAIL", {
       description: errorMessage,
     });
    } finally {
      setIsLoading(false)
    }
  }

  return (
  <Card className="mx-auto max-w-md w-full border-2">
    <CardHeader className="text-center">
      <CardTitle className="text-2xl">Recuperar senha</CardTitle>
      <CardDescription>
        Informe seu e-mail para receber um link de redefinição de senha
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Enviando..." : "Enviar link de redefinição"}
        </Button>
      </form>
    </CardContent>
  </Card>
);
}