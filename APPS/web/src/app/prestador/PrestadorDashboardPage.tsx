import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/services/api";
import { getAuthUser } from "@/lib/jwt";
import { toast } from "sonner";
import { useRef } from "react";

export default function PrestadorDashboardPage() {
  // Estados para dados da pessoa
  const [pessoa, setPessoa] = useState<any>(null);
  const [prestador, setPrestador] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Campos editáveis
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [observacao, setObservacao] = useState("");
  const [precoHora, setPrecoHora] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [especialidadeId, setEspecialidadeId] = useState("");

  // Estados para cadastro de novo serviço
  const [novoPrecoHora, setNovoPrecoHora] = useState("");
  const [novoObservacao, setNovoObservacao] = useState("");
  const [novoCnpj, setNovoCnpj] = useState("");
  const [novoEspecialidadeId, setNovoEspecialidadeId] = useState("");
  const [cadastrando, setCadastrando] = useState(false);

  // Estado para lista de serviços do prestador
  const [meusServicos, setMeusServicos] = useState<any[]>([]);
  const [deletandoId, setDeletandoId] = useState<number | null>(null);

  // Estado para lista de serviços contratados
  const [servicosContratados, setServicosContratados] = useState<any[]>([]);
  const [carregandoContratados, setCarregandoContratados] = useState(false);

  // Personalização visual
  const [avatar, setAvatar] = useState<string | null>(null);
  const [panelColor, setPanelColor] = useState("#e0e7ff");
  const [selectedBadge, setSelectedBadge] = useState<string>("star");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const badgeOptions = [
    { value: "star", label: "Estrela", emoji: "⭐" },
    { value: "medal", label: "Medalha", emoji: "🏅" },
    { value: "trophy", label: "Troféu", emoji: "🏆" },
    { value: "heart", label: "Coração", emoji: "❤️" },
  ];

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setAvatar(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const user = getAuthUser();
        if (!user) return;
        // Buscar dados da pessoa
        const pessoaRes = await api.get(`/Pessoa/${user.nameid}`);
        setPessoa(pessoaRes.data);
        setNome(pessoaRes.data.nome || "");
        setEmail(pessoaRes.data.email || "");
        setTelefone(pessoaRes.data.telefone || "");
        // Buscar dados do prestador
        const prestadorRes = await api.get(`/PrestadorServico`);
        // Encontrar o prestador vinculado a esta pessoa
        const prestadorData = Array.isArray(prestadorRes.data.data)
          ? prestadorRes.data.data.find((p: any) => p.pessoa_Id === Number(user.nameid))
          : null;
        if (prestadorData) {
          setPrestador(prestadorData);
          setObservacao(prestadorData.observacao || "");
          setPrecoHora(prestadorData.precoHora?.toString() || "");
          setCnpj(prestadorData.cnpj || "");
          setEspecialidadeId(prestadorData.especialidade_Id?.toString() || "");
        }
      } catch (err) {
        toast.error("Erro ao buscar dados do prestador.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  async function fetchMeusServicos() {
    try {
      const user = getAuthUser();
      if (!user) return;
      const res = await api.get("/PrestadorServico");
      const lista = Array.isArray(res.data.data)
        ? res.data.data.filter((p: any) => p.pessoa_Id === Number(user.nameid))
        : [];
      setMeusServicos(lista);
    } catch (err) {
      toast.error("Erro ao buscar seus serviços.");
    }
  }

  useEffect(() => {
    fetchMeusServicos();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      // Atualizar pessoa
      await api.put("/Pessoa", {
        ...pessoa,
        nome,
        email,
        telefone,
      });
      // Atualizar prestador
      await api.put("/PrestadorServico", {
        ...prestador,
        observacao,
        precoHora: parseFloat(precoHora),
        cnpj,
        especialidade_Id: parseInt(especialidadeId),
      });
      toast.success("Informações atualizadas com sucesso!");
    } catch (err) {
      toast.error("Erro ao salvar alterações.");
    } finally {
      setSaving(false);
    }
  }

  async function handleCadastrarServico(e: React.FormEvent) {
    e.preventDefault();
    setCadastrando(true);
    try {
      const user = getAuthUser();
      if (!user) throw new Error("Usuário não autenticado");
      await api.post("/PrestadorServico", {
        precoHora: parseFloat(novoPrecoHora),
        observacao: novoObservacao,
        cnpj: novoCnpj || null,
        ativo: true,
        especialidade_Id: parseInt(novoEspecialidadeId),
        pessoa_Id: Number(user.nameid),
      });
      toast.success("Serviço cadastrado com sucesso!");
      setNovoPrecoHora("");
      setNovoObservacao("");
      setNovoCnpj("");
      setNovoEspecialidadeId("");
      // Opcional: atualizar lista de serviços
    } catch (err) {
      toast.error("Erro ao cadastrar serviço.");
    } finally {
      setCadastrando(false);
    }
  }

  async function handleDeletarServico(id: number) {
    setDeletandoId(id);
    try {
      await api.delete(`/PrestadorServico/${id}`);
      toast.success("Serviço deletado com sucesso!");
      setMeusServicos(meusServicos.filter(s => s.id !== id));
    } catch (err) {
      toast.error("Erro ao deletar serviço.");
    } finally {
      setDeletandoId(null);
    }
  }

  async function fetchServicosContratados() {
    setCarregandoContratados(true);
    try {
      const user = getAuthUser();
      if (!user) return;
      // Buscar todos os serviços do prestador
      const resPrestador = await api.get("/PrestadorServico");
      const meus = Array.isArray(resPrestador.data.data)
        ? resPrestador.data.data.filter((p: any) => p.pessoa_Id === Number(user.nameid))
        : [];
      const meusIds = meus.map((p: any) => p.id);
      // Buscar todas as ordens de serviço
      const resOrdens = await api.get("/OrdemServico");
      const resOrdemPrestador = await api.get("/OrdemServico_PrestadorServico");
      // Filtrar ordens vinculadas a este prestador
      const contratados = Array.isArray(resOrdemPrestador.data.data)
        ? resOrdemPrestador.data.data.filter((os: any) => meusIds.includes(os.prestadorServico_Id))
        : [];
      setServicosContratados(contratados);
    } catch (err) {
      toast.error("Erro ao buscar serviços contratados.");
    } finally {
      setCarregandoContratados(false);
    }
  }

  useEffect(() => {
    fetchServicosContratados();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">
        Bem-vindo, Prestador de Serviço!
      </h1>
      <p className="mb-6 text-lg text-blue-900 bg-blue-100 rounded p-2 shadow">
        Aqui você pode editar seus dados, cadastrar e personalizar seus serviços, e acompanhar seus contratos.
      </p>
      <Tabs defaultValue="editar" className="w-full max-w-2xl">
        <TabsList className="mb-6">
          <TabsTrigger value="editar">Editar minhas informações</TabsTrigger>
          <TabsTrigger value="cadastrar">Cadastrar novo serviço</TabsTrigger>
          <TabsTrigger value="deletar">Deletar serviços</TabsTrigger>
          <TabsTrigger value="contratados">Ver serviços contratados</TabsTrigger>
          <TabsTrigger value="personalizar">Personalizar serviços</TabsTrigger>
        </TabsList>
        <TabsContent value="editar">
          <div className="p-4 border rounded bg-muted">
            {loading ? (
              <div>Carregando...</div>
            ) : (
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block mb-1">Nome</label>
                  <Input value={nome} onChange={e => setNome(e.target.value)} required />
                </div>
                <div>
                  <label className="block mb-1">Email</label>
                  <Input value={email} onChange={e => setEmail(e.target.value)} required type="email" />
                </div>
                <div>
                  <label className="block mb-1">Telefone</label>
                  <Input value={telefone} onChange={e => setTelefone(e.target.value)} />
                </div>
                <div>
                  <label className="block mb-1">CNPJ</label>
                  <Input value={cnpj} onChange={e => setCnpj(e.target.value)} />
                </div>
                <div>
                  <label className="block mb-1">Preço por hora</label>
                  <Input value={precoHora} onChange={e => setPrecoHora(e.target.value)} type="number" min="0" step="0.01" />
                </div>
                <div>
                  <label className="block mb-1">Descrição/Observação</label>
                  <Input value={observacao} onChange={e => setObservacao(e.target.value)} />
                </div>
                <div>
                  <label className="block mb-1">Especialidade (ID)</label>
                  <Input value={especialidadeId} onChange={e => setEspecialidadeId(e.target.value)} type="number" min="1" />
                </div>
                <Button type="submit" disabled={saving}>{saving ? "Salvando..." : "Salvar alterações"}</Button>
              </form>
            )}
          </div>
        </TabsContent>
        <TabsContent value="cadastrar">
          <div className="p-4 border rounded bg-muted">
            <form onSubmit={handleCadastrarServico} className="space-y-4">
              <div>
                <label className="block mb-1">CNPJ (opcional)</label>
                <Input value={novoCnpj} onChange={e => setNovoCnpj(e.target.value)} />
              </div>
              <div>
                <label className="block mb-1">Preço por hora</label>
                <Input value={novoPrecoHora} onChange={e => setNovoPrecoHora(e.target.value)} type="number" min="0" step="0.01" required />
              </div>
              <div>
                <label className="block mb-1">Descrição/Observação</label>
                <Input value={novoObservacao} onChange={e => setNovoObservacao(e.target.value)} required />
              </div>
              <div>
                <label className="block mb-1">Especialidade (ID)</label>
                <Input value={novoEspecialidadeId} onChange={e => setNovoEspecialidadeId(e.target.value)} type="number" min="1" required />
              </div>
              <Button type="submit" disabled={cadastrando}>{cadastrando ? "Cadastrando..." : "Cadastrar serviço"}</Button>
            </form>
          </div>
        </TabsContent>
        <TabsContent value="deletar">
          <div className="p-4 border rounded bg-muted">
            <h2 className="text-lg font-semibold mb-4">Meus Serviços</h2>
            {meusServicos.length === 0 ? (
              <div>Nenhum serviço cadastrado.</div>
            ) : (
              <ul className="space-y-2">
                {meusServicos.map(servico => (
                  <li key={servico.id} className="flex items-center justify-between bg-white rounded p-2 shadow">
                    <div>
                      <div className="font-medium">{servico.observacao}</div>
                      <div className="text-xs text-muted-foreground">Preço: R$ {servico.precoHora} | Especialidade: {servico.especialidade_Id}</div>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeletarServico(servico.id)}
                      disabled={deletandoId === servico.id}
                    >
                      {deletandoId === servico.id ? "Deletando..." : "Deletar"}
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </TabsContent>
        <TabsContent value="contratados">
          <div className="p-4 border rounded bg-muted">
            <h2 className="text-lg font-semibold mb-4">Serviços Contratados</h2>
            {carregandoContratados ? (
              <div>Carregando...</div>
            ) : servicosContratados.length === 0 ? (
              <div>Nenhum serviço contratado encontrado.</div>
            ) : (
              <ul className="space-y-2">
                {servicosContratados.map((contrato, idx) => (
                  <li key={idx} className="bg-white rounded p-2 shadow">
                    <div className="font-medium">Ordem de Serviço #{contrato.ordemServico_Id}</div>
                    <div className="text-xs text-muted-foreground">
                      Preço: R$ {contrato.preco} | Horas: {contrato.horasTrabalhadas} | Status: {contrato.statusOs}
                    </div>
                    <div className="text-xs">Início: {contrato.dataInicio?.slice(0,10)} | Fim: {contrato.dataFim?.slice(0,10)}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </TabsContent>
        <TabsContent value="personalizar">
          <div className="p-4 border rounded bg-muted flex flex-col gap-6" style={{ background: panelColor }}>
            <h2 className="text-xl font-semibold mb-2">Personalize sua experiência</h2>
            {/* Avatar */}
            <div>
              <label className="block mb-1 font-medium">Avatar/Fotoperfil</label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border">
                  {avatar ? (
                    <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl">👤</span>
                  )}
                </div>
                <Button type="button" onClick={() => fileInputRef.current?.click()}>
                  Selecionar foto
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
            </div>
            {/* Cor do painel */}
            <div>
              <label className="block mb-1 font-medium">Cor do painel</label>
              <input
                type="color"
                value={panelColor}
                onChange={e => setPanelColor(e.target.value)}
                className="w-12 h-8 border rounded cursor-pointer"
              />
            </div>
            {/* Bonificações */}
            <div>
              <label className="block mb-1 font-medium">Ícone de bonificação</label>
              <div className="flex gap-4">
                {badgeOptions.map(badge => (
                  <button
                    key={badge.value}
                    type="button"
                    className={`text-3xl p-2 rounded border-2 ${selectedBadge === badge.value ? 'border-blue-500 bg-blue-100' : 'border-transparent'}`}
                    onClick={() => setSelectedBadge(badge.value)}
                  >
                    <span role="img" aria-label={badge.label}>{badge.emoji}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              * Essas opções são apenas visuais e não afetam seus dados de serviço.
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 