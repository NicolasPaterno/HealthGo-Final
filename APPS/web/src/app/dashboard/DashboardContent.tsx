import { WelcomeBanner } from "@/components/WelcomeBanner";
import { RemindersCard } from "@/components/RemindersCard";
import { QuickActionsCard } from "@/components/QuickActionsCard";
import { HealthSummaryCard } from "@/components/HealthSummaryCard";
import { HealthTipsCard } from "@/components/HealthTipsCard";

export default function DashboardContent() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <WelcomeBanner />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 lg:px-6">
        <div className="lg:col-span-2">
            <QuickActionsCard />
        </div>
        <HealthSummaryCard />
        
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 lg:px-6">
        <div className="lg:col-span-2">
          <RemindersCard />
        </div>
        <div className="flex flex-col gap-4">
            <HealthTipsCard/>
        </div>
      </div>
    </div>
  );
}