// app/(panel)/layout.tsx

import Sidebar from "../../components/Sidebar";
import { Toaster } from "sonner"

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
          <Sidebar/>
        <main className="bg-[#F3F4F6] pb-24 xl:ml-[260px] xl:pb-0 min-h-screen">
          {children}
          <br className="hidden xl:block"/>
        </main>
        <Toaster richColors />
    </div>
  );
}