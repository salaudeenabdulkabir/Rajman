import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="flex min-h-screen bg-[#F7F3ED]">
      <AdminSidebar />
      {/* Main content — offset by sidebar width */}
      <div className="flex-1 ml-64">
        <main className="p-8 min-h-screen">{children}</main>
      </div>
    </div>
  );
}
