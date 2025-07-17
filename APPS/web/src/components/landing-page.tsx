import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  IconHotelService,
  IconUserHeart,
  IconCalendarTime,
  IconMapPin,
  IconUsers,
  IconShieldCheck,
} from "@tabler/icons-react";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-200 dark:from-background dark:to-blue-950">
      <header className="w-full flex justify-between items-center px-6 py-4 bg-white/80 dark:bg-background/80 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">HealthGo</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button variant="default" onClick={() => navigate("/register")}>
            Cadastre-se
          </Button>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-0 py-0 w-full">
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-r from-blue-100 to-blue-300 dark:from-blue-900 dark:to-blue-950 py-12 px-4 flex flex-col items-center">
          <img
            src="/public/landing-healthcare.jpg"
            alt="Cuidado em saúde"
            className="w-40 h-40 md:w-56 md:h-56 object-cover rounded-2xl shadow-lg mb-6 border-4 border-white dark:border-blue-900"
            style={{ background: "#e0e7ff" }}
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-900 dark:text-white leading-tight text-center drop-shadow-lg">
            Sua jornada de saúde mais leve e acolhedora
          </h1>
          <p className="text-lg md:text-xl text-blue-900/80 dark:text-blue-100/90 max-w-2xl text-center mb-6">
            Uma plataforma que conecta pacientes, famílias e profissionais para
            tornar o cuidado médico mais humano, organizado e seguro.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-4">
            <Button
              size="lg"
              className="text-lg px-8 py-6"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6"
              onClick={() => navigate("/register")}
            >
              Cadastre-se
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6"
              onClick={() => navigate("/work-with-us")}
            >
              Quer trabalhar conosco?
            </Button>
          </div>
        </section>

        {/* Funcionalidades em Cards */}
        <section className="w-full bg-white dark:bg-blue-950 py-16 px-4 flex flex-col items-center border-b border-blue-200 dark:border-blue-800">
          <h2 className="text-3xl font-bold mb-10 text-blue-800 dark:text-blue-200 text-center">
            O que você encontra no HealthGo?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
            <div className="bg-blue-100 dark:bg-blue-900 rounded-2xl shadow p-8 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <IconHotelService className="w-14 h-14 text-blue-700 dark:text-blue-200 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Hotéis próximos ao hospital
              </h3>
              <p className="text-base text-blue-900/80 dark:text-blue-100/90">
                Encontre hospedagem acessível e confortável, com filtros de
                preço, distância e acessibilidade.
              </p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 rounded-2xl shadow p-8 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <IconUserHeart className="w-14 h-14 text-pink-600 dark:text-pink-200 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Apoio emocional</h3>
              <p className="text-base text-blue-900/80 dark:text-blue-100/90">
                Conecte-se a psicólogos e cuidadores especializados para suporte
                durante todo o tratamento.
              </p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 rounded-2xl shadow p-8 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <IconCalendarTime className="w-14 h-14 text-green-600 dark:text-green-200 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Agenda integrada</h3>
              <p className="text-base text-blue-900/80 dark:text-blue-100/90">
                Organize consultas, transporte e hospedagem em um só lugar, sem
                estresse.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mt-8">
            <div className="bg-blue-100 dark:bg-blue-900 rounded-2xl shadow p-8 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <IconMapPin className="w-14 h-14 text-yellow-600 dark:text-yellow-200 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Localização precisa
              </h3>
              <p className="text-base text-blue-900/80 dark:text-blue-100/90">
                Veja no mapa os serviços mais próximos e escolha o melhor para
                sua necessidade.
              </p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 rounded-2xl shadow p-8 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <IconUsers className="w-14 h-14 text-indigo-600 dark:text-indigo-200 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Rede de profissionais
              </h3>
              <p className="text-base text-blue-900/80 dark:text-blue-100/90">
                Cuidadores, psicólogos, nutricionistas e mais, todos avaliados e
                prontos para ajudar.
              </p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 rounded-2xl shadow p-8 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <IconShieldCheck className="w-14 h-14 text-emerald-600 dark:text-emerald-200 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Segurança e confiança
              </h3>
              <p className="text-base text-blue-900/80 dark:text-blue-100/90">
                Todos os prestadores são verificados e avaliados, garantindo
                tranquilidade para você e sua família.
              </p>
            </div>
          </div>
        </section>

        {/* Chamada para ação */}
        <section className="w-full bg-blue-100 dark:bg-blue-900 py-16 px-4 flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-6 text-blue-900 dark:text-white text-center">
            Transforme sua experiência de saúde com o HealthGo
          </h2>
          <p className="text-lg md:text-xl text-blue-900/80 dark:text-blue-100/90 max-w-2xl text-center mb-8">
            Mais conforto, mais organização, mais cuidado. Junte-se a nós e faça
            parte dessa transformação!
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-2">
            <Button
              size="lg"
              className="text-lg px-8 py-6"
              onClick={() => navigate("/login")}
            >
              Entrar
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6"
              onClick={() => navigate("/register")}
            >
              Quero me cadastrar
            </Button>
          </div>
        </section>
      </main>
      <footer className="w-full text-center py-6 text-muted-foreground text-sm bg-white/60 dark:bg-background/60 mt-auto">
        &copy; {new Date().getFullYear()} HealthGo. Todos os direitos
        reservados.
      </footer>
    </div>
  );
}
