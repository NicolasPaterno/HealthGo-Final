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

  const decodedUser = getAuthUser();
  const [name, setName] = useState(decodedUser?.name || "");
  const [description, setDescription] = useState(
    "Descreva sua experiência, especialidades e abordagem profissional..."
  );
  const [tempName, setTempName] = useState(decodedUser?.name || "");
  const [tempDescription, setTempDescription] = useState(description);

  const [showSpecialtyModal, setShowSpecialtyModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [hourlyPrice, setHourlyPrice] = useState("");
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<number | null>(
    null
  );
  const [specialtyToDelete, setSpecialtyToDelete] = useState<number | null>(
    null
  );
  const [specialties, setSpecialties] = useState<
    Array<{
      id?: number;
      prestadorServico_Id: number;
      especialidade_Id: number;
      precoHora: number;
    }>
  >([]);

  const especialidadesMap = {
    1: "Assistente Pessoal",
    2: "Cuidador de Idosos",
    3: "Enfermeiro",
    4: "Fisioterapeuta",
    5: "Psicólogo",
    6: "Nutricionista",
  };

  // Buscar informações do usuário quando a página carregar
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
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

        const response = await api.get(`/Pessoa/${userId}`);
        const userData = response.data;

        if (userData.nome && userData.nome !== decodedUser.name) {
          setName(userData.nome);
          setTempName(userData.nome);
        }

        if (userData.enderecoFoto && userData.enderecoFoto !== "default.jpg") {
          setProfileImage(userData.enderecoFoto);
        }

        const prestadorResponse = await api.get(
          `/PrestadorServico/get_by_pessoa_id?id=${userId}`
        );
        const prestadorData = prestadorResponse.data;

        if (prestadorData.observacao) {
          setDescription(prestadorData.observacao);
          setTempDescription(prestadorData.observacao);
        } else {
          const descricaoPadrao =
            "Descreva sua experiência, especialidades e abordagem profissional...";
          setDescription(descricaoPadrao);
          setTempDescription(descricaoPadrao);
        }
      } catch (error) {
        console.error("Erro ao buscar informações do usuário:", error);
      }
    };

    if (isAuthenticated) {
      fetchUserInfo();
      fetchSpecialties();
    }
  }, [isAuthenticated]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
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

      const pessoaResponse = await api.get(`/Pessoa/${userId}`);
      const pessoaAtual = pessoaResponse.data;

      const pessoaUpdateData = {
        ...pessoaAtual,
      };

      if (tempName !== name) {
        pessoaUpdateData.nome = tempName;
      }

      if (profileImage !== "/avatars/default-profile.jpg") {
        pessoaUpdateData.enderecoFoto = profileImage;
      }

      pessoaUpdateData.role = 2;

      console.log("Dados para atualizar pessoa:", pessoaUpdateData);
      const response = await api.put("/Pessoa", pessoaUpdateData);

      const prestadorResponse = await api.get(
        `/PrestadorServico/get_by_pessoa_id?id=${userId}`
      );

      console.log("Dados do prestador:", prestadorResponse.data);
      const prestadorId = prestadorResponse.data.id;

      const prestadorUpdateData = {
        id: prestadorId,
        pessoa_id: userId,
        cnpj: prestadorResponse.data.cnpj,
        observacao: tempDescription,
      };

      console.log("Dados para atualizar prestador:", prestadorUpdateData);
      await api.put("/PrestadorServico", prestadorUpdateData);

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

  const handleAddSpecialty = () => {
    setShowSpecialtyModal(true);
    setSelectedSpecialty("");
    setHourlyPrice("");
    setSelectedSpecialtyId(null);
  };

  const handleEditSpecialty = (specialty: any) => {
    setShowSpecialtyModal(true);
    setSelectedSpecialty(specialty.especialidade_Id.toString());
    setHourlyPrice(specialty.precoHora.toString());
    setSelectedSpecialtyId(specialty.id);
  };

  const handleDeleteSpecialty = (specialtyId: number) => {
    setSpecialtyToDelete(specialtyId);
    setShowDeleteModal(true);
  };

  const confirmDeleteSpecialty = async () => {
    if (!specialtyToDelete) return;

    try {
      await api.delete(`/PrestadorServicoEspecialidade/${specialtyToDelete}`);
      await fetchSpecialties();
      toast.success("Especialidade removida com sucesso!");
      setShowDeleteModal(false);
      setSpecialtyToDelete(null);
    } catch (error) {
      console.error("Erro ao remover especialidade:", error);
      toast.error("Erro ao remover especialidade");
    }
  };

  const handleSaveSpecialty = async () => {
    if (!selectedSpecialty || !hourlyPrice) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    const especialidadeId = parseInt(selectedSpecialty);
    const isDuplicate = specialties.some(
      (specialty) =>
        specialty.especialidade_Id === especialidadeId &&
        specialty.id !== selectedSpecialtyId
    );

    if (isDuplicate) {
      toast.error("Você já possui esta especialidade cadastrada");
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

      const prestadorResponse = await api.get(
        `/PrestadorServico/get_by_pessoa_id?id=${userId}`
      );
      const prestadorId = prestadorResponse.data.id;

      const newSpecialty = {
        PrestadorServico_Id: parseInt(prestadorId),
        Especialidade_Id: parseInt(selectedSpecialty),
        PrecoHora: parseFloat(hourlyPrice) || 0.0,
      };

      if (selectedSpecialtyId) {
        await api.put("/PrestadorServicoEspecialidade", {
          ...newSpecialty,
          id: selectedSpecialtyId,
        });
        toast.success("Especialidade atualizada com sucesso!");
      } else {
        await api.post("/PrestadorServicoEspecialidade", newSpecialty);
        toast.success("Especialidade adicionada com sucesso!");
      }

      await fetchSpecialties();

      setShowSpecialtyModal(false);
      setSelectedSpecialty("");
      setHourlyPrice("");
      setSelectedSpecialtyId(null);
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

      const prestadorResponse = await api.get(
        `/PrestadorServico/get_by_pessoa_id?id=${userId}`
      );
      const prestadorId = prestadorResponse.data.id;

      const response = await api.get(
        `/PrestadorServicoEspecialidade/${prestadorId}/get-especialidades`
      );
      setSpecialties(response.data);
    } catch (error) {
      console.error("Erro ao buscar especialidades:", error);
    }
  };

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
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>
      </div>

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
          <div className="flex items-center space-x-6">
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

      <div className="grid gap-6 md:grid-cols-2">
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
                <div className="grid gap-4">
                  {specialties.map((specialty) => (
                    <div
                      key={specialty.id}
                      className="flex items-center justify-between p-4 border rounded-lg bg-card"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">
                          {especialidadesMap[
                            specialty.especialidade_Id as keyof typeof especialidadesMap
                          ] || "Especialidade"}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          R$ {specialty.precoHora}/h
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditSpecialty(specialty)}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteSpecialty(specialty.id || 0)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
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

        <Card>
          <CardHeader>
            <CardTitle>Agenda</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-muted-foreground mb-4 text-center">
                Nenhum agendamento para hoje
              </p>
              <Button variant="outline" className="w-full max-w-xs">
                <Edit3 className="mr-2 h-4 w-4" />
                Ver Agenda Completa
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {showSpecialtyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {selectedSpecialty && hourlyPrice
                ? "Editar Especialidade"
                : "Adicionar Especialidade"}
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

      {/* Modal de confirmação para excluir especialidade */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-destructive">
              Confirmar Exclusão
            </h3>

            <p className="text-muted-foreground mb-6">
              Tem certeza que deseja excluir esta especialidade? Esta ação não
              pode ser desfeita.
            </p>

            <div className="flex space-x-3">
              <Button
                variant="destructive"
                onClick={confirmDeleteSpecialty}
                className="flex-1"
              >
                Excluir
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowDeleteModal(false);
                  setSpecialtyToDelete(null);
                }}
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
