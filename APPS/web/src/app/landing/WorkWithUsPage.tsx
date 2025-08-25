import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  HeartPulse, 
  ArrowLeft,
  Hotel,
  Users,
  Building,
  Briefcase,
  Star,
  Shield,
  CheckCircle
} from "lucide-react";

export default function WorkWithUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
                <HeartPulse className="size-5" />
              </div>
              <span className="text-xl font-bold text-gray-900">HealthGo</span>
            </div>
            <Button variant="outline" asChild>
              <Link to="/landing">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Quer Trabalhar Conosco?
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Escolha como você quer fazer parte da nossa plataforma e ajude a transformar 
              a experiência de saúde de milhares de pessoas
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <Card className="bg-white hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="text-center pb-6">
                <div className="bg-blue-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Building className="h-10 w-10 text-blue-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Gerente de Hotel
                </CardTitle>
                <p className="text-gray-600">
                  Gerencie sua rede de hotéis na plataforma
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                    <span className="text-gray-700">Cadastre múltiplos hotéis</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                    <span className="text-gray-700">Gerencie quartos e disponibilidade</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                    <span className="text-gray-700">Controle de preços e promoções</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                    <span className="text-gray-700">Relatórios e analytics</span>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button size="lg" className="w-full" asChild>
                    <Link to="/register-manager">
                      Cadastrar como Gerente
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="text-center pb-6">
                <div className="bg-blue-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Briefcase className="h-10 w-10 text-blue-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Prestador de Serviço
                </CardTitle>
                <p className="text-gray-600">
                  Ofereça seus serviços especializados
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                    <span className="text-gray-700">Psicólogos especializados</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                    <span className="text-gray-700">Cuidadores profissionais</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                    <span className="text-gray-700">Motoristas particulares</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                    <span className="text-gray-700">Outros serviços de saúde</span>
                  </div>
                </div>
                
                <div className="pt-4">
                                     <Button size="lg" className="w-full" asChild>
                     <Link to="/register-prestadorservico">
                       Cadastrar como Prestador
                     </Link>
                   </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Por que escolher o HealthGo?
              </h2>
              <p className="text-lg text-gray-700">
                Benefícios exclusivos para nossos parceiros
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Cliente Qualificado</h3>
                <p className="text-gray-600">
                  Acesso a pacientes que realmente precisam dos seus serviços
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Plataforma Segura</h3>
                <p className="text-gray-600">
                  Sistema de pagamentos e avaliações confiável
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Star className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Destaque</h3>
                <p className="text-gray-600">
                  Oportunidade de se destacar no mercado de saúde
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-gray-700 mb-6">
              Ainda tem dúvidas? Entre em contato conosco!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" asChild>
                <Link to="/landing">Voltar para Landing</Link>
              </Button>
              <Button asChild>
                <Link to="/login">Já tenho conta</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
