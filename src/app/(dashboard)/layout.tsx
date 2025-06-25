import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full flex gap-4 h-screen bg-white">
      <div className="py-6 pl-6">
        <Sidebar />
      </div>
      <div className="py-6 pr-6 flex flex-col flex-1 h-full overflow-hidden">
        <Topbar />
        <div className="bg-[#FAFAFA] mt-4 w-full flex-1 flex flex-col gap-5 overflow-y-auto p-4 rounded-[10px]">
          {children}
        </div>
      </div>
    </div>
  );
}
