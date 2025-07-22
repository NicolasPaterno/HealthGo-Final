import * as React from "react";
import {
  Building,
  CalendarClock,
  Camera,
  LayoutDashboard,
  FileCode,
  FileText,
  HelpCircle,
  History,
  Heart,
  Plane,
  Search,
  Settings,
  Users,
  Hospital,
  LayoutDashboardIcon,
} from "lucide-react"

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router-dom"

const data = {
  user: {
    name: "UserData",
    email: "User@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Hoteis",
      url: "/dashboard/hotels",
      icon: Building,
    },
     {
      title: "Hospitais", // Novo item
      url: "/dashboard/hospitals",
      icon: Hospital,
    },
    {
      title: "Passagens",
      url: "/dashboard/tickets",
      icon: Plane,
    },
    {
      title: "Psicologos",
      url: "/dashboard/Psychologist",
      icon: Heart,
    },
    {
      title: "cuidadores",
      url: "/dashboard/caregivers",
      icon: Users,
    },
    {
      title: "calendário",
      url: "/dashboard/calendar",
      icon: CalendarClock,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: Camera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "/dashboard",
        },
        {
          title: "Archived",
          url: "/dashboard",
        },
      ],
    },
    {
      title: "Proposal",
      icon: FileText,
      url: "/dashboard",
      items: [
        {
          title: "Active Proposals",
          url: "/dashboard",
        },
        {
          title: "Archived",
          url: "/dashboard",
        },
      ],
    },
    {
      title: "Prompts",
      icon: FileCode,
      url: "/dashboard",
      items: [
        {
          title: "Active Proposals",
          url: "/dashboard",
        },
        {
          title: "Archived",
          url: "/dashboard",
        },
      ],
    },
  ],
  navSecondary: [
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
    {
      title: "Search",
      url: "/dashboard",
      icon: Search,
    },
  ],
  documents: [
    {
      name: "Histórico de compras",
      url: "/purchase/history",
      icon: History,
    },
    {
      name: "Reports",
      url: "/dashboard",
      icon: FileText,
    },
    {
      name: "Word Assistant",
      url: "/dashboard",
      icon: FileText,
    },
  ],
};

const navMainHotelOwner = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Cadastrar Hotel",
    url: "/dashboard/hotels/register",
    icon: Building,
  },
  {
    title: "Listar Hotéis",
    url: "/dashboard/hotels/list",
    icon: Building,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/dashboard">
                <Heart className="!size-7" />
                <span className="text-base font-semibold">HealthGo</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* A LINHA ABAIXO FOI ALTERADA */}
        <NavMain items={data.navMain} pathname={location.pathname} />
        {/* A LINHA ABAIXO FOI ALTERADA */}
        <NavDocuments items={data.documents} pathname={location.pathname}/>
        {/* A LINHA ABAIXO FOI ALTERADA */}
        <NavSecondary items={data.navSecondary} pathname={location.pathname} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {/* A LINHA ABAIXO FOI ALTERADA */}
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
