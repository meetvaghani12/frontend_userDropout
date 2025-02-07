import { SidebarProvider } from "@/components/ui/sidebar";
import { Meet } from "@/components/Dropdown"

export default function DashboardPage() {
  return (
    <SidebarProvider> {/* Ensure SidebarProvider is present */}
      <div className="flex min-h-screen">
        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="absolute top-4 right-4"> 
              <Meet /> {/* Dropdown placed in the top-right for user options */}
            </div>
          </div>
          {/* Add your dashboard content here */}
        </main>
      </div>
    </SidebarProvider>
  );
}
