"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Layout, Settings, ArrowLeft, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = pathname.startsWith("/admin");

  const handleLogout = () => {
    sessionStorage.removeItem("isAdminAuthenticated");
    router.refresh(); // Trigger a re-render of the protected page
    window.location.reload(); // Hard reload to clear component states
  };

  return (
    <nav className="flex justify-between items-center mb-10">
      <div className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-2 tracking-tight">
        <Layout className="w-6 h-6 text-indigo-400" />
        {isAdmin ? "LinkFlow Admin" : "LinkFlow"}
      </div>
      <div className="flex gap-4">
        {isAdmin ? (
          <div className="flex gap-2">
            <Link
              href="/"
              className={cn(
                "glass px-4 py-2 rounded-lg flex items-center gap-2 text-slate-400 font-medium transition-all hover:text-white hover:bg-white/10 text-sm"
              )}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Link>
            <button
              onClick={handleLogout}
              className={cn(
                "glass px-4 py-2 rounded-lg flex items-center gap-2 text-red-400 font-medium transition-all hover:text-white hover:bg-red-500/20 text-sm"
              )}
            >
              <LogOut className="w-4 h-4" />
              <span>Log out</span>
            </button>
          </div>
        ) : (
          <Link
            href="/admin"
            className={cn(
              "glass px-4 py-2 rounded-lg flex items-center gap-2 text-slate-400 font-medium transition-all hover:text-white hover:bg-white/10 text-sm"
            )}
          >
            <Settings className="w-4 h-4" />
            <span>Admin</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
