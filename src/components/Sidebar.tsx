import { 
  Home, 
  Users, 
  FileText, 
  BarChart3, 
  LayoutGrid, 
  Gift, 
  Settings, 
  LogOut,
  Megaphone,
  Network,
  Briefcase
} from 'lucide-react'
import { cn } from "@/lib/utils"

const SidebarItem = ({ icon: Icon, active = false }: { icon: any, active?: boolean }) => (
  <div className={cn(
    "p-3 rounded-xl cursor-pointer transition-all duration-300 group",
    active ? "bg-brand text-white shadow-lg shadow-brand/20" : "text-gray-400 hover:bg-gray-50 hover:text-brand"
  )}>
    <Icon size={22} className="group-hover:scale-110 transition-transform" />
  </div>
)

export default function Sidebar() {
  return (
    <aside className="w-20 min-h-screen bg-white border-r border-brand-border flex flex-col items-center py-8 gap-8 sticky top-0">
      <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center text-white mb-4">
        <Home size={22} />
      </div>
      
      <div className="flex flex-col gap-4">
        <SidebarItem icon={Users} />
        <SidebarItem icon={FileText} active />
        <SidebarItem icon={BarChart3} />
        <SidebarItem icon={LayoutGrid} />
        <SidebarItem icon={Briefcase} />
        <SidebarItem icon={Gift} />
      </div>

      <div className="mt-auto flex flex-col gap-4">
        <SidebarItem icon={Network} />
        <SidebarItem icon={Megaphone} />
        <SidebarItem icon={Settings} />
        <SidebarItem icon={LogOut} />
      </div>
    </aside>
  )
}
