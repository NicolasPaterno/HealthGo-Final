import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Edit3, Save, X, User } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import api from "@/services/api";
import { getAuthUser } from "@/lib/jwt";

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "/avatars/default-profile.jpg"
  );

  // Inicializar com dados do token descriptografado
  const decodedUser = getAuthUser();
  const [name, setName] = useState(decodedUser?.name || "");
  const [description, setDescription] = useState(
    "Descreva sua experiência, especialidades e abordagem profissional..."
  );
  const [tempName, setTempName] = useState(decodedUser?.name || "");
  const [tempDescription, setTempDescription] = useState(description);

  // Estados para especialidades
  const [showSpecialtyModal, setShowSpecialtyModal] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [hourlyPrice, setHourlyPrice] = useState("");
  const [specialties, setSpecialties] = useState<
    Array<{ id: number; nome: string; preco: number }>
  >([]);

  // Buscar informações do usuário quando a página carregar
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // 1. Verificar se temos o token descriptografado
        const decodedUser = getAuthUser();
        if (!decodedUser) {
          console.warn("Token não encontrado ou inválido");
          toast.error("Erro de autenticação", {
            description:
              "Não foi possível verificar sua autenticação. Tente recarregar a página.",
          });
          return;
        }

        const userId = parseInt(decodedUser.nameid);
        if (isNaN(userId)) {
          throw new Error("ID do usuário inválido no token.");
        }

        // 2. O nome já está sendo exibido do token (carregamento imediato)
        // Agora vamos buscar informações adicionais da API

        // 3. Buscar informações completas da pessoa da API
        const response = await api.get(`/Pessoa/${userId}`);
        const userData = response.data;

        // 4. Atualizar com dados reais da API (se disponíveis)
        if (userData.nome && userData.nome !== decodedUser.name) {
          setName(userData.nome);
          setTempName(userData.nome);
        }

        // 5. Atualizar foto se disponível na API
        if (userData.enderecoFoto && userData.enderecoFoto !== "default.jpg") {
          setProfileImage(userData.enderecoFoto);
        }

        // 6. Buscar todas as informações do prestador de serviço usando a rota all_infos
        const prestadorResponse = await api.get(`/PrestadorServico/all_infos`);
        const prestadorData = prestadorResponse.data;

        // 7. Atualizar descrição
        if (prestadorData.observacao) {
          setDescription(prestadorData.observacao);
          setTempDescription(prestadorData.observacao);
        } else {
          // Manter descrição padrão se não houver observação
          const descricaoPadrao =
            "Descreva sua experiência, especialidades e abordagem profissional...";
          setDescription(descricaoPadrao);
          setTempDescription(descricaoPadrao);
        }
      } catch (error) {
        console.error("Erro ao buscar informações do usuário:", error);
        // O nome já está sendo exibido do token, então não precisamos fazer fallback
      }
    };

    if (isAuthenticated) {
      fetchUserInfo();
      fetchSpecialties(); // Buscar especialidades também
    }
  }, [isAuthenticated]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
        // Toast será mostrado apenas quando salvar as alterações
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      // 1. Verificar autenticação usando token descriptografado
      const decodedUser = getAuthUser();
      if (!decodedUser) {
        toast.error("Erro de autenticação", {
          description:
            "Usuário não encontrado. Por favor, faça login novamente.",
        });
        return;
      }

      const userId = parseInt(decodedUser.nameid);
      if (isNaN(userId)) {
        throw new Error("ID do usuário inválido no token.");
      }

      // 2. Buscar todas as informações atuais da pessoa da API
      const pessoaResponse = await api.get(`/Pessoa/${userId}`);
      const pessoaAtual = pessoaResponse.data;

      // 2. Atualizar informações da pessoa na API (mantendo todos os campos originais)
      const pessoaUpdateData = {
        ...pessoaAtual, // Manter todos os campos originais
      };

      // Atualizar apenas os campos que foram modificados
      if (tempName !== name) {
        pessoaUpdateData.nome = tempName; // ✅ Nome atualizado apenas se mudou (usando minúsculo)
      }

      // Atualizar a foto apenas se foi alterada
      if (profileImage !== "/avatars/default-profile.jpg") {
        pessoaUpdateData.enderecoFoto = profileImage; // ✅ Foto atualizada condicionalmente (usando camelCase)
      }

      // Definir role fixo como 2
      pessoaUpdateData.role = 2;

      console.log("Dados para atualizar pessoa:", pessoaUpdateData);
      const response = await api.put("/Pessoa", pessoaUpdateData);

      // 3. Buscar o ID do prestador de serviço usando a rota all_infos
      const prestadorResponse = await api.get(`/PrestadorServico/all_infos`);

      const prestadorId = prestadorResponse.data.id;

      // 4. Atualizar a observação na tabela PrestadorServico
      const prestadorUpdateData = {
        id: prestadorId,
        idPessoa: userId,
        cnpj: prestadorResponse.data.cnpj,
        observacao: tempDescription,
      };

      console.log("Dados para atualizar prestador:", prestadorUpdateData);
      const response1 = await api.put("/PrestadorServico", prestadorUpdateData);

      // Atualizar estado local
      setName(tempName);
      setDescription(tempDescription);
      setIsEditing(false);
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      toast.error("Erro ao atualizar perfil. Tente novamente.");
    }
  };

  const handleCancel = () => {
    setTempName(name);
    setTempDescription(description);
    setIsEditing(false);
  };

  // Funções para gerenciar especialidades
  const handleAddSpecialty = () => {
    setShowSpecialtyModal(true);
    setSelectedSpecialty("");
    setHourlyPrice("");
  };

  const handleSaveSpecialty = async () => {
    if (!selectedSpecialty || !hourlyPrice) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    try {
      const decodedUser = getAuthUser();
      if (!decodedUser) {
        toast.error("Erro de autenticação");
        return;
      }

      const userId = parseInt(decodedUser.nameid);
      if (isNaN(userId)) {
        throw new Error("ID do usuário inválido");
      }

      // Buscar o ID do prestador de serviço
      const prestadorResponse = await api.get(`/PrestadorServico/all_infos`);
      const prestadorId = prestadorResponse.data.id;

      // Criar nova especialidade
      const newSpecialty = {
        idPrestadorServico: prestadorId,
        idEspecialidade: parseInt(selectedSpecialty),
        preco: parseFloat(hourlyPrice),
      };

      await api.post("/Especialidade", newSpecialty);

      // Atualizar lista de especialidades
      await fetchSpecialties();

      setShowSpecialtyModal(false);
      setSelectedSpecialty("");
      setHourlyPrice("");
      toast.success("Especialidade adicionada com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar especialidade:", error);
      toast.error("Erro ao adicionar especialidade");
    }
  };

  const fetchSpecialties = async () => {
    try {
      const decodedUser = getAuthUser();
      if (!decodedUser) return;

      const userId = parseInt(decodedUser.nameid);
      if (isNaN(userId)) return;

      const prestadorResponse = await api.get(`/PrestadorServico/all_infos`);
      const prestadorId = prestadorResponse.data.id;

      const response = await api.get(
        `/Especialidade/by-prestador/${prestadorId}`
      );
      setSpecialties(response.data);
    } catch (error) {
      console.error("Erro ao buscar especialidades:", error);
    }
  };

  // Verificar se está carregando ou não autenticado
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-muted-foreground">Usuário não autenticado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header da Página */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>
      </div>

      {/* Card Principal do Perfil */}
      <Card>
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Informações Pessoais</CardTitle>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)} variant="outline">
                <Edit3 className="mr-2 h-4 w-4" />
                Editar Perfil
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Seção da Foto e Informações Básicas */}
          <div className="flex items-center space-x-6">
            {/* Foto de Perfil */}
            <div className="space-y-2">
              <input
                id="fotoPerfil"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={!isEditing}
              />
              <label
                htmlFor="fotoPerfil"
                className={`flex flex-col items-center group ${
                  isEditing ? "cursor-pointer" : "cursor-default opacity-60"
                }`}
              >
                {profileImage &&
                profileImage !== "/avatars/default-profile.jpg" ? (
                  <div className="relative">
                    <img
                      src={profileImage}
                      alt="Foto de perfil"
                      className="rounded-full w-32 h-32 object-cover border-4 border-primary shadow-lg transition-all group-hover:opacity-80"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-full transition-all flex items-center justify-center">
                      <Edit3 className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ) : (
                  <div className="rounded-full w-32 h-32 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center border-4 border-dashed border-primary/30 text-primary/50 text-6xl group-hover:border-primary group-hover:text-primary transition-all">
                    <User />
                  </div>
                )}
                <span className="text-sm text-primary font-medium mt-2">
                  {profileImage &&
                  profileImage !== "/avatars/default-profile.jpg"
                    ? "Alterar Foto"
                    : "Adicionar Foto"}
                </span>
              </label>
            </div>

            {/* Informações do Perfil */}
            <div className="flex-1 space-y-4">
              {isEditing ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      className="text-lg font-semibold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      value={tempDescription}
                      onChange={(e) => setTempDescription(e.target.value)}
                      rows={4}
                      placeholder="Descreva sua experiência, especialidades e abordagem..."
                    />
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-foreground">{name}</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Botões de Ação */}
          {isEditing && (
            <div className="flex space-x-3 pt-4">
              <Button onClick={handleSave} className="px-6">
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </Button>
              <Button onClick={handleCancel} variant="outline">
                <X className="mr-2 h-4 w-4" />
                Cancelar
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Informações Adicionais */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Especialidades */}
        <Card>
          <CardHeader>
            <CardTitle>Especialidades</CardTitle>
          </CardHeader>
          <CardContent>
            {specialties.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8">
                <p className="text-muted-foreground mb-4 text-center">
                  Nenhuma especialidade cadastrada
                </p>
                <Button
                  variant="outline"
                  className="w-full max-w-xs"
                  onClick={handleAddSpecialty}
                >
                  <Edit3 className="mr-2 h-4 w-4" />
                  Adicionar Especialidade
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {specialties.map((specialty) => (
                    <span
                      key={specialty.id}
                      className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                    >
                      {specialty.nome} - R$ {specialty.preco}/h
                    </span>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleAddSpecialty}
                >
                  <Edit3 className="mr-2 h-4 w-4" />
                  Adicionar Mais Especialidades
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Estatísticas */}
        <Card>
          <CardHeader>
            <CardTitle>Estatísticas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Pacientes Atendidos
                </span>
                <span className="font-semibold">156</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Anos de Experiência
                </span>
                <span className="font-semibold">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Avaliação Média</span>
                <span className="font-semibold">4.8 ⭐</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal para adicionar especialidade */}
      {showSpecialtyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Adicionar Especialidade
            </h3>

            <div className="space-y-4">
              <div>
                <Label htmlFor="specialty">Especialidade</Label>
                <select
                  id="specialty"
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  <option value="">Selecione uma especialidade</option>
                  <option value="1">Assistente Pessoal</option>
                  <option value="2">Cuidador de Idosos</option>
                  <option value="3">Enfermeiro</option>
                  <option value="4">Fisioterapeuta</option>
                  <option value="5">Psicólogo</option>
                  <option value="6">Nutricionista</option>
                </select>
              </div>

              <div>
                <Label htmlFor="price">Preço por Hora (R$)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={hourlyPrice}
                  onChange={(e) => setHourlyPrice(e.target.value)}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <Button onClick={handleSaveSpecialty} className="flex-1">
                Salvar
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowSpecialtyModal(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
