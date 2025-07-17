import { useState } from "react"
import { useParams, } from "react-router-dom"
// import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import api from "@/services/api" // Certifique-se de que o serviço está configurado
// import axios from "axios";

export default function ResetPasswordForm() { 
  const { token } = useParams()
  // const navigate = useNavigate()

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

      toast.success("Senha redefinida com sucesso!")

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
    <div className="flex min-h-screen items-center justify-center bg-muted p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-6 rounded-lg bg-white p-6 shadow-md"
      >
        <div className="space-y-2 text-center">
          <h2 className="text-xl font-semibold">Criar nova senha</h2>
          <p className="text-sm text-muted-foreground">
            Digite a nova senha para sua conta.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Nova senha</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
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
    </div>
  )
}
