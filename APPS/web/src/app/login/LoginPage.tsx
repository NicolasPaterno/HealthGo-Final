import { LoginForm } from "@/components/login-form"
import { HeartPulse } from "lucide-react"
import { Link } from "react-router-dom"; // Importar Link
import { Button } from "@/components/ui/button"; // Importar Button

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <HeartPulse className="size-4" />
          </div>
          Health Go
        </a>
        <LoginForm />
        <Link to="/" className="self-center">
          <Button variant="link" className="text-sm text-muted-foreground">
            Voltar para a Página Inicial
          </Button>
        </Link>
      </div>
    </div>
  )
}