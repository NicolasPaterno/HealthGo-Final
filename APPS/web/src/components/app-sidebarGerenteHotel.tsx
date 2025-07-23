import { Link, useLocation } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { Building, CalendarClock, FileText, HelpCircle, History, LayoutDashboard, Settings } from "lucide-react";
import { NavMain } from "./nav-main";
import { NavDocuments } from "./nav-documents";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";


export function AppSidebarGerenteHotel({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const location = useLocation();
  
    // Menu específico para gerente de hotel
    const gerenteNavMain = [
      {
        title: "Visão Geral",
        url: "/dashboard-gerente",
        icon: LayoutDashboard,
      },
      {
        title: "Quartos",
        url: "/dashboard-gerente/quartos",
        icon: Building,
      },
      {
        title: "Reservas",
        url: "/dashboard-gerente/add-hotel",
        icon: CalendarClock,
      },
      {
        title: "Relatórios",
        url: "/dashboard-gerente/relatorios",
        icon: FileText,
      },
    ];

    const gerenteDocuments = [
      {
        name: "Histórico de reservas",
        url: "/dashboard-gerente/reservas/historico",
        icon: History,
      },
      {
        name: "Relatórios",
        url: "/dashboard-gerente/relatorios",
        icon: FileText,
      },
    ];
  
    const gerenteNavSecondary = [
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
                <Link to="/dashboard-gerente">
                  <Building className="!size-7" />
                  <span className="text-base font-semibold">Hotel Manager</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={gerenteNavMain} pathname={location.pathname} />
          <NavDocuments items={gerenteDocuments} pathname={location.pathname}/>
          <NavSecondary items={gerenteNavSecondary} pathname={location.pathname} className="mt-auto" />
        </SidebarContent>
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
      </Sidebar>
    );
  }