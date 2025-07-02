import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { IconHistory, IconReceipt } from "@tabler/icons-react";

export default function PurchaseHistoryPage() {
  const { purchaseHistory } = useCart();

  return (
    <main className="flex-1 p-4 md:p-6">
      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <IconHistory />
              Histórico de Compras
            </CardTitle>
        </CardHeader>
        <CardContent>
          {purchaseHistory.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {purchaseHistory.map((order) => (
                <AccordionItem key={order.orderId} value={order.orderId}>
                  <AccordionTrigger>
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="text-left">
                        <p className="font-semibold">
                          Pedido #{order.orderId.slice(0, 8)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.date).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                         <p className="font-semibold">R$ {order.total.toFixed(2)}</p>
                         <p className="text-sm text-muted-foreground">{order.items.length} item(s)</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-4 pl-4 ml-4 border-l">
                        {order.items.map((item) => (
                           <div key={item.id} className="flex items-center justify-between gap-4">
                               <div className="flex items-center gap-4">
                                   <img src={item.image || `https://via.placeholder.com/64?text=${item.name.charAt(0)}`} alt={item.name} className="h-12 w-12 rounded-md object-cover" />
                                   <div>
                                       <p className="font-medium">{item.name}</p>
                                       <p className="text-sm text-muted-foreground">
                                           {item.quantity} x R$ {item.price.toFixed(2)}
                                       </p>
                                   </div>
                               </div>
                               <p className="font-semibold">R$ {(item.quantity * item.price).toFixed(2)}</p>
                           </div>
                        ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center text-muted-foreground py-16">
              <IconReceipt size={48} className="mx-auto mb-4" />
              <p className="text-lg font-semibold">
                Nenhuma compra foi realizada ainda.
              </p>
              <p className="text-sm">
                Seu histórico de compras aparecerá aqui.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}