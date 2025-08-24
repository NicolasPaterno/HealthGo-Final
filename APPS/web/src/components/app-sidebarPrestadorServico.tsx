import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import {
  LayoutDashboard,
  Settings,
  HelpCircle,
  FileText,
  History,
} from "lucide-react";
import { NavMain } from "./nav-main";
import { NavDocuments } from "./nav-documents";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";

export function AppSidebarPrestadorServico({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();

  // Menu específico para prestador de serviço
  const prestadorNavMain = [
    {
      title: "Perfil",
      url: "/dashboard-prestador",
      icon: LayoutDashboard,
    },
    // Futuras abas podem ser adicionadas aqui
    // {
    //   title: "Meus Serviços",
    //   url: "/dashboard-prestador/servicos",
    //   icon: Briefcase,
    // },
    // {
    //   title: "Agenda",
    //   url: "/dashboard-prestador/agenda",
    //   icon: Calendar,
    // },
  ];

  const prestadorDocuments = [
    {
      name: "Histórico de serviços",
      url: "/dashboard-prestador/historico",
      icon: History,
    },
    {
      name: "Relatórios",
      url: "/dashboard-prestador/relatorios",
      icon: FileText,
    },
  ];

  const prestadorNavSecondary = [
    {
      title: "Configurações",
      url: "/settings",
      icon: Settings,
    },
    {
      title: "Ajuda",
      url: "/dashboard/help",
      icon: HelpCircle,
    },
  ];

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/dashboard-prestador">
                <LayoutDashboard className="!size-7" />
                <span className="text-base font-semibold">
                  Prestador de Serviço
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={prestadorNavMain} pathname={location.pathname} />
        <NavDocuments items={prestadorDocuments} pathname={location.pathname} />
        <NavSecondary
          items={prestadorNavSecondary}
          pathname={location.pathname}
          className="mt-auto"
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
