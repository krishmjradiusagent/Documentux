import { 
  Home, 
  Users, 
  FileText, 
  BarChart3, 
  LayoutGrid, 
  Settings, 
  LogOut,
  Briefcase,
  Megaphone,
  PlusCircle,
  Command
} from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from "@/lib/utils"

const itemVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  whileHover: { backgroundColor: "rgba(90, 95, 242, 0.1)", scale: 1.1 },
  whileTap: { scale: 0.95 }
}

const SidebarItem = ({ icon: Icon, active = false }: { icon: any, active?: boolean }) => (
  <motion.div
    variants={itemVariants}
    initial="initial"
    animate="animate"
    whileHover="whileHover"
    whileTap="whileTap"
    className={cn(
      "p-3 rounded-2xl cursor-pointer transition-colors relative group",
      active ? "bg-brand text-white shadow-lg shadow-brand/20" : "text-gray-400 hover:text-brand"
    )}
  >
    <Icon size={22} />
    {!active && (
      <div className="absolute left-full ml-4 px-3 py-1 bg-gray-900 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
        {Icon.name}
      </div>
    )}
  </motion.div>
)

export default function Sidebar() {
  return (
    <aside className="w-20 min-h-screen bg-white border-r border-brand-border flex flex-col items-center py-8 sticky top-0 z-50 shadow-sm">
      {/* Brand Logo */}
      <div className="w-12 h-12 bg-brand rounded-2xl flex items-center justify-center text-white shadow-xl shadow-brand/20 mb-12 cursor-pointer active:scale-90 transition-transform">
        <Command size={24} />
      </div>
      
      <div className="flex flex-col gap-6">
        <SidebarItem icon={Home} />
        <SidebarItem icon={Users} />
        <SidebarItem icon={FileText} active />
        <SidebarItem icon={Briefcase} />
        <SidebarItem icon={BarChart3} />
        <SidebarItem icon={LayoutGrid} />
        <SidebarItem icon={Megaphone} />
      </div>

      <div className="mt-auto flex flex-col gap-6">
        <SidebarItem icon={PlusCircle} />
        <SidebarItem icon={Settings} />
        <SidebarItem icon={LogOut} />
      </div>
    </aside>
  )
}
