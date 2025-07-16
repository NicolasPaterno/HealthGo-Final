import { useState } from "react"
// import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import api from "@/services/api" ← quando for conectar
import { toast } from "sonner";
import api from "@/services/api" // Certifique-se de que o serviço está configurado

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  // const navigate = useNavigate()

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
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <form className="flex w-full max-w-sm flex-col gap-6" onSubmit={handleSubmit}>
        <div className="space-y-2 text-center">
          <h2 className="text-xl font-semibold">Recuperar senha</h2>
          <p className="text-sm text-muted-foreground">
            Informe seu e-mail para receber um link de redefinição de senha.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="seu@email.com"
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Enviando..." : "Enviar link de redefinição"}
        </Button>
      </form>
    </div>
  )
}