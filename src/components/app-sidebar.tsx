import * as React from "react"
import {
  IconBuilding,
  IconCalendarTime,
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHeart,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconMapPinHeart,
  IconPlane,
  IconPlaneArrival,
  IconReport,
  IconSearch,
  IconSettings,
  IconUserBitcoin,
  IconUserHeart,
  IconUsers,
} from "@tabler/icons-react"

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
      icon: IconDashboard,
    },
    {
      title: "Hoteis",
      url: "/dashboard/places",
      icon: IconBuilding,
    },
    {
      title: "Passagens",
      url: "/dashboard/tickets",
      icon: IconPlane,
    },
    {
      title: "Psicologos",
      url: "/dashboard/Psychologist",
      icon: IconUserHeart,
    },
    {
      title: "cuidadores",
      url: "/dashboard/caregivers",
      icon: IconUsers,
    },
    {
      title: "calendario",
      url: "/dashboard/calendar",
      icon: IconCalendarTime,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
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
      icon: IconFileDescription,
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
      icon: IconFileAi,
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
      url: "/dashboard/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "/dashboard/help",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "/dashboard",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "/dashboard",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "/dashboard",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "/dashboard",
      icon: IconFileWord,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconMapPinHeart className="!size-7" />
                <span className="text-base font-semibold">HealthGo</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}