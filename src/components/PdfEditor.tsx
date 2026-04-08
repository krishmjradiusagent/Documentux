import { motion } from 'framer-motion'
import { 
  X, 
  ZoomIn, 
  ZoomOut, 
  Download, 
  Printer, 
  CheckCircle2,
  Users as UsersIcon,
  Tag
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

const airbnbTransition: any = {
  ease: [0.32, 0.72, 0, 1],
  duration: 0.5
}

interface PdfEditorProps {
  documentName: string
  onClose: () => void
}

export default function PdfEditor({ documentName, onClose }: PdfEditorProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: 20 }}
      transition={airbnbTransition}
      className="fixed inset-0 z-50 bg-[#F5F7F9] flex flex-col"
    >
      {/* Top Header */}
      <header className="h-16 bg-white border-b px-6 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X size={20} />
          </Button>
          <Separator orientation="vertical" className="h-8" />
          <div>
            <h2 className="text-sm font-bold text-gray-900">{documentName}</h2>
            <p className="text-[10px] text-gray-500 font-medium">Draft • Last saved 2m ago</p>
          </div>
          <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-600 border-blue-100 uppercase text-[9px]">
            Editor Mode
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-gray-100 rounded-full px-1 py-1 mr-4">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-gray-600"><ZoomOut size={16} /></Button>
            <span className="text-xs font-bold px-3">100%</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-gray-600"><ZoomIn size={16} /></Button>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full text-gray-600"><Printer size={18} /></Button>
          <Button variant="ghost" size="icon" className="rounded-full text-gray-600"><Download size={18} /></Button>
          <div className="h-8 w-[1px] bg-gray-200 mx-2" />
          <Button className="bg-brand hover:bg-brand/90 text-white rounded-full px-6 font-bold text-sm shadow-lg shadow-brand/20">
            Ready to Send
          </Button>
        </div>
      </header>

      {/* Main Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Pages Sidebar */}
        <aside className="w-64 bg-white border-r flex flex-col p-4 gap-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Pages</h3>
            <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full font-bold">1/4</span>
          </div>
          <ScrollArea className="flex-1">
            <div className="space-y-4">
              {[1, 2, 3, 4].map((page) => (
                <div key={page} className={cn(
                  "aspect-[1/1.41] w-full rounded-md border-2 transition-all cursor-pointer",
                  page === 1 ? "border-brand shadow-md" : "border-transparent hover:border-gray-200"
                )}>
                  <div className="w-full h-full bg-gray-50 flex items-center justify-center text-[10px] font-bold text-gray-300">
                    Page {page}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </aside>

        {/* Main Document Canvas */}
        <main className="flex-1 overflow-auto p-12 flex flex-col items-center">
          <div className="max-w-4xl w-full bg-white shadow-2xl relative min-h-[1200px] p-16">
            {/* Mock PDF Content Header */}
            <div className="flex justify-between items-start mb-8 border-b pb-8">
              <div>
                <h1 className="text-2xl font-serif font-bold text-gray-800 uppercase tracking-tighter">Agreement</h1>
                <p className="text-xs text-gray-500 mt-1">REAL ESTATE TRANSFER DISCLOSURE STATEMENT</p>
              </div>
              <div className="text-[10px] text-right text-gray-400">
                Form RPA-CA<br />Revised 12/23
              </div>
            </div>

            {/* Editable Field Examples */}
            <div className="space-y-8">
              <section>
                <h4 className="text-[10px] font-bold text-gray-400 mb-2 uppercase">I. Property Identification</h4>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <EditableField label="Street Address" value="Neighborhood 01, Neighborhood 02" />
                  <EditableField label="City/State" value="Dublin, CA" />
                  <EditableField label="Property Type" value="Residential Single Family" />
                  <EditableField label="Year Built" value="2020" />
                </div>
              </section>

              <section className="bg-yellow-50/50 p-6 rounded-xl border border-yellow-100">
                <h4 className="text-[10px] font-bold text-brand-warning mb-4 uppercase flex items-center gap-2">
                  <Tag size={12} />
                  Signature Mapping required
                </h4>
                <div className="space-y-6">
                  <p className="text-xs text-brand-neutral leading-relaxed">
                    By signing below, the Buyer(s) and Seller(s) acknowledge that they have read and understood the terms of this agreement.
                  </p>
                  <div className="flex gap-8">
                    <SignatureBox role="Buyer" name="John Buyer" />
                    <SignatureBox role="Seller Agent" name="Vanessa Brown" />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>

        {/* Tools Palette (Right) */}
        <aside className="w-80 bg-white border-l p-6 space-y-8">
          <div>
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
              <UsersIcon size={16} className="text-brand" />
              Party Roles
            </h3>
            <div className="space-y-3">
              <PartyItem name="John Buyer" role="Buyer" active />
              <PartyItem name="Vanessa Brown" role="Agent" />
              <PartyItem name="Sarah Jenkins" role="Co-Buyer" />
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-500" />
              Progress
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500 font-medium">Fields Completion</span>
                <span className="font-bold text-brand">4/12</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-brand h-full w-1/3 transition-all duration-1000" />
              </div>
              <ul className="space-y-2 pt-2">
                <li className="flex items-center gap-2 text-[11px] text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  Address missing zip code
                </li>
                <li className="flex items-center gap-2 text-[11px] text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  Signature block for Seller unassigned
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </motion.div>
  )
}

function EditableField({ label, value }: { label: string, value: string }) {
  return (
    <div className="group transition-all duration-200">
      <label className="text-[10px] text-brand-muted font-bold block mb-1 uppercase tracking-tighter opacity-70">{label}</label>
      <div className="bg-brand/5 border border-brand/20 p-2 rounded-md font-medium text-xs text-brand-neutral cursor-pointer hover:bg-brand/10 hover:border-brand/40 transition-colors">
        {value}
      </div>
    </div>
  )
}

function SignatureBox({ role, name }: { role: string, name: string }) {
  return (
    <div className="flex-1 border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 bg-white hover:border-brand/30 hover:bg-brand/5 transition-all text-center">
      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
        <UsersIcon size={20} />
      </div>
      <div>
        <div className="text-[10px] font-bold text-brand-muted uppercase">{role}</div>
        <div className="text-xs font-bold text-gray-800">{name}</div>
      </div>
      <Button variant="outline" size="sm" className="rounded-full border-brand/20 text-brand text-[10px] h-7 px-4">
        Assign Signature
      </Button>
    </div>
  )
}

function PartyItem({ name, role, active = false }: { name: string, role: string, active?: boolean }) {
  return (
    <div className={cn(
      "flex items-center gap-3 p-3 rounded-2xl transition-all cursor-pointer border",
      active ? "bg-brand/5 border-brand/30 shadow-sm" : "border-transparent hover:bg-gray-50"
    )}>
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px]",
        active ? "bg-brand text-white" : "bg-gray-100 text-gray-500"
      )}>
        {name.split(' ').map(n=>n[0]).join('')}
      </div>
      <div>
        <div className="text-xs font-bold">{name}</div>
        <div className="text-[10px] text-brand-muted">{role}</div>
      </div>
    </div>
  )
}


