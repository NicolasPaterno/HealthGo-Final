import { SettingsForm } from "@/components/settings-form"
import { useAuth } from "@/hooks/useAuth"
import { LoadingSpinner } from "@/components/loading-spinner"
import { AppSidebar } from "@/components/app-sidebar"
import { AppSidebarGerenteHotel } from "@/components/app-sidebarGerenteHotel"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import React from "react"

export default function SettingsPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      {user?.role === "Gerente" ? (
        <AppSidebarGerenteHotel variant="inset" />
      ) : (
        <AppSidebar variant="inset" />
      )}
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <h1 className="text-2xl font-semibold tracking-tight">Configurações</h1>
                <p className="text-muted-foreground">
                  Gerencie as configurações da sua conta e preferências.
                </p>
              </div>
              <div className="px-4 lg:px-6">
                <SettingsForm />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}