import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useCart } from "@/context/CartContext"; // Importe o useCart
import { IconShoppingCart } from "@tabler/icons-react"; // Importe o ícone do carrinho
import { Badge } from "./ui/badge";

export function SiteHeader() {
  const { openCart, cartCount } = useCart();

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Menu</h1>
        <div className="ml-auto flex items-center gap-2">
          {/* Botão do Carrinho */}
          <Button variant="ghost" size="icon" className="relative" onClick={openCart}>
            <IconShoppingCart />
            {cartCount > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 justify-center rounded-full p-0">
                {cartCount}
              </Badge>
            )}
            <span className="sr-only">Abrir carrinho</span>
          </Button>

          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://github.com/NicolasPaterno/HealthGo-react" // Link corrigido
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}