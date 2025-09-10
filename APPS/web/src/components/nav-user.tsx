// APPS/web/src/components/nav-user.tsx

import {
  CreditCard,
  MoreVertical,
  LogOut,
  Bell,
  User,
  LogOutIcon,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Link, useNavigate } from "react-router-dom";
import { getAuthUser } from "@/lib/jwt"; // Import the JWT utility
import { useEffect, useState } from "react"; // Import useState and useEffect

export function NavUser({
  // user, // No longer passed as prop directly from outside
}: {
  // user: { // Remove type definition from props
  //   name: string
  //   email: string
  //   avatar: string
  // }
}) {
  const navigate = useNavigate();
  const { isMobile } = useSidebar();
  const [currentUser, setCurrentUser] = useState({ name: "Usuário", email: "carregando...", avatar: "/avatars/default.jpg" });

  useEffect(() => {
    const authUser = getAuthUser();
    if (authUser) {
      setCurrentUser({
        name: authUser.name,
        email: authUser.email,
        avatar: "/avatars/default.jpg" // Or fetch from /Pessoa/me if stored in DB
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    // localStorage.removeItem("user"); // Remove this line
    navigate("/login");
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{currentUser.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {currentUser.email}
                </span>
              </div>
              <MoreVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{currentUser.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {currentUser.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User />
                <Link to={"settings"}>Account</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}