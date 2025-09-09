import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Smartphone, FileText, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { getAuthUser } from "@/lib/jwt";
import api from "@/services/api";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type PaymentMethod = "credit" | "pix" | "boleto";

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { cartItems, cartTotal, completePurchase } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit");
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const handlePaymentMethodChange = (value: PaymentMethod) => {
    setPaymentMethod(value);
  };

  const handleCardDataChange = (field: string, value: string) => {
    setCardData(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value: string) => {
    return value.replace(/\D/g, '').replace(/(.{2})/, '$1/');
  };

  const mapPaymentMethodToString = (method: PaymentMethod): string => {
    switch (method) {
      case "credit":
        return "Cartão de Crédito";
      case "pix":
        return "PIX";
      case "boleto":
        return "Boleto Bancário";
      default:
        return "Cartão de Crédito";
    }
  };

  const createOrdemServico = async (formaPagamento: string) => {
    try {
      const decodedUser = getAuthUser();
      if (!decodedUser) {
        throw new Error("Usuário não autenticado");
      }

      const pessoaId = parseInt(decodedUser.nameid);
      if (isNaN(pessoaId)) {
        throw new Error("ID do usuário inválido");
      }

      const ordemServicoData = {
        dataCriacao: new Date().toISOString(),
        statusOS: "Concluído",
        formaPagamento: formaPagamento,
        pessoa_Id: pessoaId
      };

      const response = await api.post("/OrdemServico", ordemServicoData);
      
      return response.data;
    } catch (error: any) {
      console.error("Erro ao criar OrdemServico:", error);
      throw new Error(error.response?.data?.message || "Erro ao criar ordem de serviço");
    }
  };

  const handleFinalizePurchase = async () => {
    if (cartItems.length === 0) {
      toast.error("Carrinho vazio!");
      return;
    }

    setIsProcessing(true);

    try {
      if (paymentMethod === "credit") {
        if (!cardData.number || !cardData.name || !cardData.expiry || !cardData.cvv) {
          toast.error("Preencha todos os dados do cartão!");
          setIsProcessing(false);
          return;
        }
      }

      await new Promise(resolve => setTimeout(resolve, 1500));

      const formaPagamento = mapPaymentMethodToString(paymentMethod);

      await createOrdemServico(formaPagamento);

      completePurchase();
      onClose();
      
      toast.success("Compra finalizada com sucesso!", {
        description: `Ordem de serviço criada com pagamento via ${formaPagamento}`
      });
    } catch (error: any) {
      console.error("Erro ao finalizar compra:", error);
      toast.error("Erro ao processar pagamento", {
        description: error.message || "Tente novamente mais tarde."
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getPaymentIcon = (method: PaymentMethod) => {
    switch (method) {
      case "credit":
        return <CreditCard className="h-5 w-5" />;
      case "pix":
        return <Smartphone className="h-5 w-5" />;
      case "boleto":
        return <FileText className="h-5 w-5" />;
    }
  };

  const getPaymentDescription = (method: PaymentMethod) => {
    switch (method) {
      case "credit":
        return "Cartão de Crédito";
      case "pix":
        return "PIX - Aprovação instantânea";
      case "boleto":
        return "Boleto Bancário - Vencimento em 3 dias";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Finalizar Compra</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Resumo do Pedido */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <img 
                        src={item.image || `https://via.placeholder.com/40?text=${item.name.charAt(0)}`} 
                        alt={item.name} 
                        className="h-10 w-10 rounded object-cover" 
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qtd: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium">R$ {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span>R$ {cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Métodos de Pagamento */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Forma de Pagamento</CardTitle>
              <CardDescription>Escolha como deseja pagar</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={handlePaymentMethodChange}>
                <div className="space-y-4">
                  {/* Cartão de Crédito */}
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50">
                    <RadioGroupItem value="credit" id="credit" />
                    <Label htmlFor="credit" className="flex items-center gap-3 cursor-pointer flex-1">
                      {getPaymentIcon("credit")}
                      <div>
                        <p className="font-medium">{getPaymentDescription("credit")}</p>
                        <p className="text-sm text-muted-foreground">Visa, Mastercard, Elo</p>
                      </div>
                    </Label>
                  </div>

                  {/* PIX */}
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50">
                    <RadioGroupItem value="pix" id="pix" />
                    <Label htmlFor="pix" className="flex items-center gap-3 cursor-pointer flex-1">
                      {getPaymentIcon("pix")}
                      <div>
                        <p className="font-medium">{getPaymentDescription("pix")}</p>
                        <p className="text-sm text-muted-foreground">Aprovação imediata</p>
                      </div>
                    </Label>
                  </div>

                  {/* Boleto */}
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50">
                    <RadioGroupItem value="boleto" id="boleto" />
                    <Label htmlFor="boleto" className="flex items-center gap-3 cursor-pointer flex-1">
                      {getPaymentIcon("boleto")}
                      <div>
                        <p className="font-medium">{getPaymentDescription("boleto")}</p>
                        <p className="text-sm text-muted-foreground">Pagamento em até 3 dias úteis</p>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Dados do Cartão (se selecionado) */}
          {paymentMethod === "credit" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Dados do Cartão</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Número do Cartão</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardData.number}
                    onChange={(e) => handleCardDataChange("number", formatCardNumber(e.target.value))}
                    maxLength={19}
                  />
                </div>
                <div>
                  <Label htmlFor="cardName">Nome no Cartão</Label>
                  <Input
                    id="cardName"
                    placeholder="João Silva"
                    value={cardData.name}
                    onChange={(e) => handleCardDataChange("name", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cardExpiry">Validade</Label>
                    <Input
                      id="cardExpiry"
                      placeholder="MM/AA"
                      value={cardData.expiry}
                      onChange={(e) => handleCardDataChange("expiry", formatExpiry(e.target.value))}
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardCvv">CVV</Label>
                    <Input
                      id="cardCvv"
                      placeholder="123"
                      value={cardData.cvv}
                      onChange={(e) => handleCardDataChange("cvv", e.target.value.replace(/\D/g, ''))}
                      maxLength={4}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Informações específicas do PIX */}
          {paymentMethod === "pix" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Pagamento via PIX
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-green-800 mb-2">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Aprovação Instantânea</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Após confirmar a compra, você receberá o QR Code para pagamento via PIX.
                    O pagamento será processado instantaneamente.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Informações específicas do Boleto */}
          {paymentMethod === "boleto" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Pagamento via Boleto
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-blue-800 mb-2">
                    <FileText className="h-5 w-5" />
                    <span className="font-medium">Vencimento em 3 dias úteis</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Após confirmar a compra, você receberá o boleto bancário por email.
                    O pagamento deve ser realizado até a data de vencimento.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>
            Cancelar
          </Button>
          <Button 
            onClick={handleFinalizePurchase} 
            disabled={isProcessing}
            className="min-w-[140px]"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processando...
              </>
            ) : (
              "Finalizar Compra"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
