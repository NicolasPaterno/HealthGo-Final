import * as React from "react"
import {
  Building,
  CalendarClock,
  Camera,
  LayoutDashboard,
  Database,
  FileCode,
  FileText,
  HelpCircle,
  History,
  Heart,
  Plane,
  Search,
  Settings,
  Users,
} from "lucide-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
import { getAuthUser } from "@/lib/jwt";

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
      title: "Prestador de Serviço",
      url: "/prestador",
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
      title: "Get Help",
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
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [expanded, setExpanded] = React.useState(true);
  const user = getAuthUser();
  const isPrestador = user?.role === "prestador";

  const navMain = [
    ...data.navMain.filter(item => item.title !== "Prestador de Serviço"),
    ...(isPrestador ? [{
      title: "Prestador de Serviço",
      url: "/prestador",
      icon: Users,
    }] : [])
  ];

  return (
    <Sidebar
      collapsible={expanded ? undefined : "offcanvas"}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      {...props}
    >
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
        <NavMain items={navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}