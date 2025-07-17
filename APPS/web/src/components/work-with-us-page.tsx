import { Button } from "@/components/ui/button";
import { IconUserHeart, IconBuilding } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export default function WorkWithUsPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 dark:from-background dark:to-blue-950 px-4 py-10">
      <div className="w-full max-w-2xl mx-auto flex flex-col items-start mb-4">
        <Button variant="ghost" onClick={() => navigate("/")}>
          ← Voltar
        </Button>
      </div>
      <div className="max-w-2xl w-full mx-auto bg-white dark:bg-blue-950 rounded-2xl shadow-lg p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-8 text-blue-900 dark:text-white text-center">
          Cadastre-se para trabalhar conosco
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Prestador de Serviço */}
          <div className="bg-blue-100 dark:bg-blue-900 rounded-xl shadow p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
            <IconUserHeart className="w-14 h-14 text-pink-600 dark:text-pink-200 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Prestador de Serviço</h2>
            <p className="text-base text-blue-900/80 dark:text-blue-100/90 mb-4">
              Cadastre-se como cuidador, psicólogo, nutricionista ou outro
              profissional de apoio à saúde.
            </p>
            <Button onClick={() => alert("Formulário de prestador em breve!")}>
              Quero ser prestador
            </Button>
          </div>
          {/* Dono de Hotel */}
          <div className="bg-blue-100 dark:bg-blue-900 rounded-xl shadow p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
            <IconBuilding className="w-14 h-14 text-blue-700 dark:text-blue-200 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Dono de Hotel</h2>
            <p className="text-base text-blue-900/80 dark:text-blue-100/90 mb-4">
              Cadastre seu hotel para receber pacientes e acompanhantes em busca
              de conforto e praticidade.
            </p>
            <Button onClick={() => navigate("/work-with-us/hotel-register")}>
              Quero cadastrar meu hotel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
