import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { UpcomingAppointments } from "@/components/upcoming-appointments"; // Import the new component
import data from "./data.json";
import { WelcomeBanner } from "@/components/welcomeBanner";
import { RemindersCard } from "@/components/RemindersCard";

export default function DashboardContent() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <WelcomeBanner/>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <div className="px-4 lg:px-6">
        <RemindersCard/>
      </div>
      <DataTable data={data} />
    </div>
  );
}