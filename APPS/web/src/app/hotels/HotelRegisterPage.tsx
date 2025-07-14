import { HotelRegisterForm } from "@/components/hotel-register-form";

export default function HotelRegisterPage() {
  return (
    <div className="bg-background min-h-svh flex items-center justify-center p-4 md:p-10">
      <div className="w-full max-w-6xl mx-auto">
        <HotelRegisterForm />
      </div>
    </div>
  );
}
