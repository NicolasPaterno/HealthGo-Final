import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/services/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function HotelEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchHotel() {
      setLoading(true);
      setError("");
      try {
        console.log("ID recebido para edição:", id); // <-- log do id
        const response = await api.get(`/Hotel/${id}`);
        console.log("Hotel para edição:", response.data); // <-- log do hotel
        setForm(response.data);
      } catch (err) {
        setError("Erro ao buscar hotel.");
      } finally {
        setLoading(false);
      }
    }
    fetchHotel();
  }, [id]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleTipoChange(value: string) {
    setForm({ ...form, tipo: value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      // Corrigir o campo site para sempre ter http(s)://
      let site = form.site || "";
      if (site && !/^https?:\/\//i.test(site)) {
        site = "http://" + site;
      }
      const formToSend = { ...form, site };
      await api.put("/Hotel", formToSend);
      toast.success("Informações do hotel atualizadas com sucesso!");
      navigate(`/dashboard/hotels/profile/${id}`);
    } catch (err: any) {
      toast.error("Erro ao atualizar hotel.", {
        description:
          err?.response?.data?.message || "Tente novamente mais tarde.",
      });
    } finally {
      setSaving(false);
    }
  }

  if (loading)
    return (
      <div className="bg-background min-h-svh flex items-center justify-center p-4 md:p-10">
        <p>Carregando hotel...</p>
      </div>
    );
  if (error || !form)
    return (
      <div className="bg-background min-h-svh flex items-center justify-center p-4 md:p-10">
        <p className="text-red-500">{error || "Hotel não encontrado."}</p>
      </div>
    );

  return (
    <div className="bg-background min-h-svh flex items-center justify-center p-4 md:p-10">
      <div className="w-full max-w-4xl mx-auto">
        <Card className="mx-auto w-full">
          <CardHeader>
            <CardTitle className="text-2xl">Editar Hotel</CardTitle>
            <CardDescription>
              Altere as informações do hotel abaixo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="grid gap-8 grid-cols-1 md:grid-cols-2"
            >
              <div className="grid gap-2 w-full">
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input
                  id="cnpj"
                  name="cnpj"
                  type="text"
                  value={form.cnpj || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2 w-full">
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  name="nome"
                  type="text"
                  value={form.nome || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2 w-full">
                <Label htmlFor="tipo">Tipo</Label>
                <Select
                  value={form.tipo || ""}
                  onValueChange={handleTipoChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Apartamento">Apartamento</SelectItem>
                    <SelectItem value="Pousada">Pousada</SelectItem>
                    <SelectItem value="Hotel">Hotel</SelectItem>
                    <SelectItem value="Casa">Casa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2 w-full">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2 w-full">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  value={form.telefone || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2 w-full">
                <Label htmlFor="site">Site</Label>
                <Input
                  id="site"
                  name="site"
                  type="text"
                  value={form.site || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="grid gap-2 w-full">
                  <Label htmlFor="cep">CEP</Label>
                  <Input
                    id="cep"
                    name="cep"
                    type="text"
                    value={form.cep || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2 w-full">
                  <Label htmlFor="bairro">Bairro</Label>
                  <Input
                    id="bairro"
                    name="bairro"
                    type="text"
                    value={form.bairro || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="grid gap-2 w-full">
                  <Label htmlFor="rua">Rua</Label>
                  <Input
                    id="rua"
                    name="rua"
                    type="text"
                    value={form.rua || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2 w-full">
                  <Label htmlFor="numeroEndereco">Número</Label>
                  <Input
                    id="numeroEndereco"
                    name="numeroEndereco"
                    type="text"
                    value={form.numeroEndereco || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid gap-2 w-full md:col-span-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Input
                  id="descricao"
                  name="descricao"
                  type="text"
                  value={form.descricao || ""}
                  onChange={handleChange}
                />
              </div>
              <Button
                type="submit"
                className="w-full md:col-span-2"
                disabled={saving}
              >
                {saving ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
