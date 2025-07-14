import { useState } from "react";
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

// Dados mockados do hotel para edição
const hotel = {
  cnpj: "12.345.678/0001-99",
  nome: "Hotel Palace",
  tipo: "Hotel",
  email: "contato@hotelpalace.com",
  telefone: "(48) 99999-9999",
  site: "https://hotelpalace.com",
  cep: "88000-000",
  bairro: "Centro",
  rua: "Av. Central, 123",
  numeroEndereco: "123",
  descricao: "Um hotel de luxo no coração da cidade com vista panorâmica.",
};

export default function HotelEditPage() {
  const [form, setForm] = useState(hotel);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleTipoChange(value: string) {
    setForm({ ...form, tipo: value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Informações do hotel atualizadas com sucesso!");
      setLoading(false);
    }, 1200);
  }

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
                  value={form.cnpj}
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
                  value={form.nome}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2 w-full">
                <Label htmlFor="tipo">Tipo</Label>
                <Select value={form.tipo} onValueChange={handleTipoChange}>
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
                  value={form.email}
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
                  value={form.telefone}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2 w-full">
                <Label htmlFor="site">Site</Label>
                <Input
                  id="site"
                  name="site"
                  type="url"
                  value={form.site}
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
                    value={form.cep}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2 w-full">
                  <Label htmlFor="bairro">Bairro</Label>
                  <Input
                    id="bairro"
                    name="bairro"
                    type="text"
                    value={form.bairro}
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
                    value={form.rua}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2 w-full">
                  <Label htmlFor="numeroEndereco">Número</Label>
                  <Input
                    id="numeroEndereco"
                    name="numeroEndereco"
                    type="text"
                    value={form.numeroEndereco}
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
                  value={form.descricao}
                  onChange={handleChange}
                />
              </div>
              <Button
                type="submit"
                className="w-full md:col-span-2"
                disabled={loading}
              >
                {loading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
