import { useState } from "react"
import { useParams, } from "react-router-dom"
 import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import api from "@/services/api" // Certifique-se de que o serviço está configurado
import {
     Card,
     CardContent,
     CardDescription,
     CardHeader,
     CardTitle,
   } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPasswordForm() { 
  const { token } = useParams()
  const navigate = useNavigate()

  
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!token) {
      toast.error("Token inválido ou ausente.")
      return
    }

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem.")
      return
    }

    setIsLoading(true)

    try {
      // Chamada à API com o token e nova senha
      await api.post("/auth/redefinir-senha", {
        Token : token,
        NovaSenha: password
      });

      toast.success("Senha redefinida com sucesso!", {
        description: "Você será redirecionado para o dashboard.",
        duration: 2000,
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);

    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Erro ao redefinir senha.";
      toast.error("Erro ao criar a conta.", {
         description: errorMessage,
    });
      console.error("Erro ao redefinir:", error);
    } finally {
      setIsLoading(false)
    }
  }

return (
<Card className="mx-auto max-w-md w-full border-2">
  <CardHeader className="text-center">
    <CardTitle className="text-2xl">Criar nova senha</CardTitle>
    <CardDescription>
      Digite a nova senha para sua conta
    </CardDescription>
  </CardHeader>
  <CardContent>
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="password">Nova senha</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="confirm">Confirmar senha</Label>
        <Input
          id="confirm"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Redefinindo..." : "Redefinir senha"}
      </Button>
    </form>
  </CardContent>
</Card>
)
}
