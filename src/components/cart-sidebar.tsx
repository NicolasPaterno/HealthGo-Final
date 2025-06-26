import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { IconMinus, IconPlus, IconTrash, IconShoppingCart } from "@tabler/icons-react";

export function CartSidebar() {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, cartTotal, isCartOpen, closeCart } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Carrinho de Compras</SheetTitle>
        </SheetHeader>
        <Separator />
        {cartItems.length > 0 ? (
          <>
            <ScrollArea className="flex-grow pr-4">
              <div className="flex flex-col gap-4 py-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img src={item.image || `https://via.placeholder.com/64?text=${item.name.charAt(0)}`} alt={item.name} className="h-16 w-16 rounded-md object-cover" />
                    <div className="flex-grow">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">R$ {item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => decreaseQuantity(item.id)}>
                          <IconMinus size={12} />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => increaseQuantity(item.id)}>
                          <IconPlus size={12} />
                        </Button>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.id)}>
                      <IconTrash size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <Separator />
            <SheetFooter className="mt-auto">
              <div className="w-full space-y-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>R$ {cartTotal.toFixed(2)}</span>
                  </div>
                  <SheetClose asChild>
                    <Button className="w-full">Finalizar Compra</Button>
                  </SheetClose>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
             <IconShoppingCart size={48} className="text-muted-foreground mb-4" />
            <p className="text-lg font-semibold">Seu carrinho está vazio</p>
            <p className="text-sm text-muted-foreground">Adicione itens para vê-los aqui.</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}