import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  HeartPulse, 
  MapPin, 
  Calendar, 
  Users, 
  Car, 
  Hotel, 
  Brain, 
  Shield, 
  Star,
  ArrowRight,
  CheckCircle,
  Target,
  TrendingUp,
  Award,
  Clock,
  Phone
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
                <HeartPulse className="size-5" />
              </div>
              <span className="text-xl font-bold text-gray-900">HealthGo</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Cadastro</Link>
              </Button>
                             <Button variant="secondary" asChild>
                 <Link to="/work-with-us">Quer trabalhar conosco?</Link>
               </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Cuidando de você durante o
            <span className="text-primary"> tratamento</span>
          </h1>
                     <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
             Conectamos pacientes em tratamentos médicos com serviços essenciais em uma plataforma única, 
             prática e segura, promovendo uma experiência de saúde mais acolhedora e eficiente.
           </p>
                     <div className="flex justify-center">
             <Button size="lg" asChild>
               <Link to="/register">
                 Começar Agora
                 <ArrowRight className="ml-2 h-5 w-5" />
               </Link>
             </Button>
           </div>
        </div>
              </section>

        <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Problemas que Resolvemos
            </h2>
                         <p className="text-xl text-gray-700 max-w-3xl mx-auto">
               Facilitamos todo o processo de tratamento médico, eliminando as principais dificuldades enfrentadas pelos pacientes
             </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Hotel className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Hospedagem Próxima</h3>
                                 <p className="text-gray-700">
                   Dificuldade de encontrar hotéis próximos ao hospital com boas avaliações
                 </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Apoio Psicológico</h3>
                                 <p className="text-gray-700">
                   Falta de apoio psicológico durante tratamentos delicados
                 </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Cuidadores Capacitados</h3>
                                 <p className="text-gray-700">
                   Falta de cuidadores capacitados, especialmente para pacientes sozinhos
                 </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Agenda Organizada</h3>
                                 <p className="text-gray-700">
                   Desorganização da agenda médica e logística do paciente
                 </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Car className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Transporte Seguro</h3>
                                 <p className="text-gray-700">
                   Estresse com deslocamentos e imprevistos durante o tratamento
                 </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Segurança Total</h3>
                                 <p className="text-gray-700">
                   Garantia de qualidade e segurança em todos os serviços oferecidos
                 </p>
              </CardContent>
            </Card>
          </div>
        </div>
              </section>

        <section id="funcionalidades" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Funcionalidades Principais
            </h2>
                         <p className="text-xl text-gray-700 max-w-3xl mx-auto">
               Uma plataforma completa com tudo que você precisa durante seu tratamento
             </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-primary text-white p-3 rounded-lg">
                  <Hotel className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Busca de Hotéis</h3>
                                     <p className="text-gray-700">
                     Hotéis próximos ao hospital com filtros por data, preço, distância e avaliações. 
                     Catálogo completo com planos e quartos disponíveis.
                   </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary text-white p-3 rounded-lg">
                  <Brain className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Psicólogos Especializados</h3>
                                     <p className="text-gray-700">
                     Encontre psicólogos especializados em saúde emocional para apoio durante o tratamento.
                   </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary text-white p-3 rounded-lg">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Cuidadores Profissionais</h3>
                                     <p className="text-gray-700">
                     Cuidadores capacitados para acompanhamento profissional durante todo o tratamento.
                   </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary text-white p-3 rounded-lg">
                  <Car className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Motoristas Particulares</h3>
                                     <p className="text-gray-700">
                     Transporte seguro para ida e volta de consultas com motoristas verificados.
                   </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl">
                             <div className="space-y-6">
                 <div className="flex items-center space-x-3">
                   <CheckCircle className="h-6 w-6 text-blue-500" />
                   <span className="font-medium">Calendário Integrado</span>
                 </div>
                 <div className="flex items-center space-x-3">
                   <CheckCircle className="h-6 w-6 text-blue-500" />
                   <span className="font-medium">Busca Personalizada</span>
                 </div>
                 <div className="flex items-center space-x-3">
                   <CheckCircle className="h-6 w-6 text-blue-500" />
                   <span className="font-medium">Filtros Avançados</span>
                 </div>
                 <div className="flex items-center space-x-3">
                   <CheckCircle className="h-6 w-6 text-blue-500" />
                   <span className="font-medium">Avaliações e Segurança</span>
                 </div>
                 <div className="flex items-center space-x-3">
                   <CheckCircle className="h-6 w-6 text-blue-500" />
                   <span className="font-medium">Suporte 24/7</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
              </section>

        <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Para Quem é o HealthGo?
            </h2>
                         <p className="text-xl text-gray-700 max-w-3xl mx-auto">
               Nossa plataforma atende diferentes perfis de usuários que precisam de apoio durante tratamentos médicos
             </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
                         <Card className="text-center p-8 hover:shadow-lg transition-shadow">
               <CardContent>
                 <div className="bg-blue-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                   <HeartPulse className="h-10 w-10 text-blue-600" />
                 </div>
                 <h3 className="text-2xl font-semibold mb-4">Pacientes</h3>
                 <p className="text-gray-700 mb-6">
                   Pessoas que precisam realizar tratamentos médicos e buscam apoio logístico e emocional
                 </p>
                 <ul className="text-left space-y-2 text-sm text-gray-600">
                   <li className="flex items-center space-x-2">
                     <CheckCircle className="h-4 w-4 text-blue-500" />
                     <span>Tratamentos especializados</span>
                   </li>
                   <li className="flex items-center space-x-2">
                     <CheckCircle className="h-4 w-4 text-blue-500" />
                     <span>Cirurgias e procedimentos</span>
                   </li>
                   <li className="flex items-center space-x-2">
                     <CheckCircle className="h-4 w-4 text-blue-500" />
                     <span>Consultas médicas</span>
                   </li>
                 </ul>
               </CardContent>
             </Card>
             <Card className="text-center p-8 hover:shadow-lg transition-shadow">
               <CardContent>
                 <div className="bg-blue-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                   <Users className="h-10 w-10 text-blue-600" />
                 </div>
                 <h3 className="text-2xl font-semibold mb-4">Acompanhantes</h3>
                 <p className="text-gray-700 mb-6">
                   Familiares e amigos que acompanham pacientes e precisam de suporte logístico
                 </p>
                 <ul className="text-left space-y-2 text-sm text-gray-600">
                   <li className="flex items-center space-x-2">
                     <CheckCircle className="h-4 w-4 text-blue-500" />
                     <span>Organização da agenda</span>
                   </li>
                   <li className="flex items-center space-x-2">
                     <CheckCircle className="h-4 w-4 text-blue-500" />
                     <span>Hospedagem próxima</span>
                   </li>
                   <li className="flex items-center space-x-2">
                     <CheckCircle className="h-4 w-4 text-blue-500" />
                     <span>Transporte seguro</span>
                   </li>
                 </ul>
               </CardContent>
             </Card>
             <Card className="text-center p-8 hover:shadow-lg transition-shadow">
               <CardContent>
                 <div className="bg-blue-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                   <Target className="h-10 w-10 text-blue-600" />
                 </div>
                 <h3 className="text-2xl font-semibold mb-4">Prestadores</h3>
                 <p className="text-gray-700 mb-6">
                   Profissionais que oferecem serviços e buscam novos clientes na plataforma
                 </p>
                 <ul className="text-left space-y-2 text-sm text-gray-600">
                   <li className="flex items-center space-x-2">
                     <CheckCircle className="h-4 w-4 text-blue-500" />
                     <span>Psicólogos</span>
                   </li>
                   <li className="flex items-center space-x-2">
                     <CheckCircle className="h-4 w-4 text-blue-500" />
                     <span>Cuidadores</span>
                   </li>
                   <li className="flex items-center space-x-2">
                     <CheckCircle className="h-4 w-4 text-blue-500" />
                     <span>Motoristas</span>
                   </li>
                   <li className="flex items-center space-x-2">
                     <CheckCircle className="h-4 w-4 text-blue-500" />
                     <span>Hotéis</span>
                   </li>
                 </ul>
               </CardContent>
             </Card>
          </div>
        </div>
              </section>

        <section className="py-20 bg-gradient-to-br from-blue-50 to-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nossos Diferenciais
            </h2>
                         <p className="text-xl text-gray-700 max-w-3xl mx-auto">
               O que torna o HealthGo único no mercado de saúde e turismo médico
             </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
                <Award className="h-12 w-12 text-primary mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Curadoria Inteligente</h3>
                             <p className="text-gray-700">
                 Recomendações personalizadas com base no histórico e preferências do paciente
               </p>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
                <Calendar className="h-12 w-12 text-primary mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Calendário Integrado</h3>
                             <p className="text-gray-700">
                 Controle completo da jornada médica em uma só tela, organizando tudo
               </p>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
                <HeartPulse className="h-12 w-12 text-primary mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Foco Humano</h3>
                             <p className="text-gray-700">
                 Experiência pensada para quem está em situação de vulnerabilidade
               </p>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
                <MapPin className="h-12 w-12 text-primary mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Localização Precisa</h3>
                             <p className="text-gray-700">
                 Serviços mapeados por distância ao hospital com precisão
               </p>
            </div>
          </div>
        </div>
              </section>

        <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Mercado em Crescimento
            </h2>
                         <p className="text-xl text-gray-700 max-w-3xl mx-auto">
               O turismo hospitalar interno no Brasil está em expansão e oferece grandes oportunidades
             </p>
          </div>
                     <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
             <div className="text-center p-6 bg-blue-50 rounded-2xl">
               <div className="text-4xl font-bold text-blue-600 mb-2">5M</div>
               <p className="text-gray-700">Brasileiros viajam anualmente para tratamentos médicos</p>
             </div>
             <div className="text-center p-6 bg-blue-100 rounded-2xl">
               <div className="text-4xl font-bold text-blue-700 mb-2">R$ 1,5B</div>
               <p className="text-gray-700">Movimentação anual do setor de turismo médico</p>
             </div>
             <div className="text-center p-6 bg-blue-50 rounded-2xl">
               <div className="text-4xl font-bold text-blue-600 mb-2">R$ 15K</div>
               <p className="text-gray-700">Gasto médio por paciente com serviços relacionados</p>
             </div>
             <div className="text-center p-6 bg-blue-100 rounded-2xl">
               <div className="text-4xl font-bold text-blue-700 mb-2">5</div>
               <p className="text-gray-700">Principais cidades para tratamentos especializados</p>
             </div>
           </div>
        </div>
              </section>

        <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Transforme sua experiência médica
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Do início do tratamento até o fim, o HealthGo vai estar presente para te ajudar 
            a tornar tudo mais fácil e acolhedor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/register">
                Começar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
                         <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-gray-50" asChild>
               <Link to="/work-with-us">Quero Trabalhar Conosco</Link>
             </Button>
          </div>
        </div>
              </section>

        <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
                  <HeartPulse className="size-5" />
                </div>
                <span className="text-xl font-bold">HealthGo</span>
              </div>
              <p className="text-gray-400">
                Transformando a experiência de quem precisa cuidar da saúde com uma plataforma 
                completa, humana e inteligente.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Para Pacientes</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/register" className="hover:text-white">Cadastro</Link></li>
                <li><Link to="/login" className="hover:text-white">Login</Link></li>
                <li><Link to="#funcionalidades" className="hover:text-white">Funcionalidades</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Para Prestadores</h3>
              <ul className="space-y-2 text-gray-400">
                                 <li><Link to="/register-prestadorservico" className="hover:text-white">Cadastro</Link></li>
                <li><Link to="/login" className="hover:text-white">Login</Link></li>
                <li><Link to="#" className="hover:text-white">Como Funciona</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contato</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>(11) 99999-9999</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Suporte 24/7</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 HealthGo. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
