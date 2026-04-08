import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FilePlus, 
  Search, 
  Upload, 
  FileText,
  Filter,
  ArrowRight
} from 'lucide-react'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"



interface FormTemplate {
  id: string
  name: string
  category: string
  isPopular?: boolean
}

const formLibrary: FormTemplate[] = [
  { id: 'ca-rpa', name: 'California Residential Purchase Agreement (RPA)', category: 'CAR Forms', isPopular: true },
  { id: 'ca-ad', name: 'Disclosure Regarding Real Estate Agency Relationship', category: 'CAR Forms', isPopular: true },
  { id: 'ca-rlas', name: 'Residential Lease or Month-to-Month Rental Agreement', category: 'CAR Forms' },
  { id: 'ca-spq', name: 'Seller Property Questionnaire (SPQ)', category: 'CAR Forms', isPopular: true },
  { id: 'rad-keysafe', name: 'Radius Keysafe/Lockbox Addendum', category: 'Radius Forms' },
  { id: 'rad-aba', name: 'Affiliated Business Arrangement Disclosure', category: 'Radius Forms' },
]

export default function AddDocumentsModal({ 
  open, 
  onOpenChange, 
  onAdd 
}: { 
  open: boolean, 
  onOpenChange: (open: boolean) => void,
  onAdd: (doc: any) => void 
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const filteredForms = formLibrary.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const handleAdd = () => {
    const selected = formLibrary.filter(f => selectedIds.includes(f.id))
    onAdd(selected)
    onOpenChange(false)
    setSelectedIds([])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1000px] max-h-[85vh] p-0 overflow-hidden rounded-[48px] border-none shadow-2xl flex flex-col bg-white">
        <DialogHeader className="p-6 bg-brand/5 border-b border-brand/10 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-brand shadow-sm border border-brand/10">
              <FilePlus size={20} />
            </div>
            <div>
              <DialogTitle className="text-sm font-black text-gray-900 tracking-[0.2em] uppercase">Radius Document Library</DialogTitle>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1 h-1 rounded-full bg-brand animate-pulse" />
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Active System Library</p>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-1 overflow-hidden min-h-0">
          {/* Sidebar categories */}
          <aside className="w-56 border-r border-gray-100 bg-gray-50/30 p-6 flex flex-col gap-2 shrink-0">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Library</h4>
            {['All Forms', 'Popular', 'CA Favorites', 'Radius Custom', 'Audit Forms'].map((cat) => (
              <Button
                key={cat}
                variant="ghost"
                className={cn(
                  "justify-start h-10 rounded-xl font-bold text-[11px] transition-all",
                  cat === 'All Forms' ? "bg-white text-brand shadow-sm" : "text-gray-500 hover:bg-white/50"
                )}
              >
                {cat}
              </Button>
            ))}
          </aside>

          {/* Main content */}
          <div className="flex-1 flex flex-col overflow-hidden min-h-0 bg-white">
            <div className="p-6 pb-2 shrink-0 flex gap-3">
              <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand transition-colors" size={16} />
                <Input 
                  placeholder="Search forms..." 
                  className="pl-12 h-11 bg-gray-50 border-none rounded-xl font-bold text-xs focus-visible:ring-8 focus-visible:ring-brand/5 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl border-gray-100 text-gray-400 hover:text-brand hover:border-brand/20">
                <Filter size={16} />
              </Button>
            </div>

            <ScrollArea className="flex-1">
              <div className="w-full">
                {/* Table Header */}
                <div className="flex items-center px-6 h-10 bg-gray-50/50 border-b border-gray-100 sticky top-0 z-20 backdrop-blur-md">
                   <div className="w-8" /> 
                   <div className="flex-1 text-[9px] font-black text-gray-400 uppercase tracking-widest pl-4">Form Name</div>
                   <div className="w-40 text-[9px] font-black text-gray-400 uppercase tracking-widest pl-4">Library</div>
                   <div className="w-24 text-[9px] font-black text-gray-400 uppercase tracking-widest text-right pr-4">Status</div>
                </div>

                <div className="divide-y divide-gray-50">
                  {filteredForms.map((form) => {
                    const isSelected = selectedIds.includes(form.id)
                    return (
                      <motion.div
                        key={form.id}
                        onClick={() => toggleSelect(form.id)}
                        className={cn(
                          "flex items-center px-6 h-12 cursor-pointer transition-all relative group",
                          isSelected ? "bg-brand/[0.03] z-10" : "bg-white hover:bg-gray-50/50"
                        )}
                      >
                        {isSelected && <div className="absolute left-0 w-1 h-1/2 bg-brand rounded-r-full" />}
                        
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center transition-all shrink-0 border",
                          isSelected ? "bg-brand text-white border-brand shadow-md shadow-brand/20" : "bg-white text-gray-400 border-gray-100 group-hover:bg-brand/5 group-hover:text-brand"
                        )}>
                          <FileText size={14} />
                        </div>

                        <div className="flex-1 pl-4 min-w-0">
                          <h4 className={cn(
                            "font-bold text-xs truncate transition-colors",
                            isSelected ? "text-brand" : "text-gray-900 group-hover:text-brand"
                          )}>
                            {form.name}
                          </h4>
                        </div>

                        <div className="w-40 pl-4 shrink-0">
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                            {form.category}
                          </span>
                        </div>

                        <div className="w-24 pl-4 shrink-0 text-right pr-2">
                          {form.isPopular && (
                            <Badge className="bg-emerald-50 text-emerald-600 border-none text-[8px] font-black uppercase tracking-tighter">Popular</Badge>
                          )}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className="p-6 bg-gray-50/50 border-t flex flex-col gap-4 shrink-0">
          <div className="border border-dashed border-gray-300 rounded-[20px] px-5 h-12 flex items-center justify-between gap-4 bg-white/50 hover:bg-white hover:border-brand/40 transition-all cursor-pointer group">
            <div className="flex items-center gap-3">
              <Upload size={14} className="text-gray-400 group-hover:text-brand transition-colors" />
              <span className="text-[10px] font-black text-gray-900 uppercase tracking-tight">Upload local files</span>
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest ml-1">PDF/DOCX</span>
            </div>
            <p className="text-[9px] text-gray-300 font-bold uppercase tracking-widest group-hover:text-brand transition-colors">Drag & drop Here</p>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <Button variant="ghost" onClick={() => onOpenChange(false)} className="px-6 h-10 rounded-xl font-black text-[10px] text-gray-400 uppercase tracking-widest hover:text-gray-900">
              Close
            </Button>
            <Button 
              className={cn(
                "px-8 h-12 rounded-xl bg-brand hover:bg-brand/90 text-white font-black text-[11px] uppercase tracking-[0.1em] shadow-lg shadow-brand/20 transition-all active:scale-95 flex items-center gap-3",
                selectedIds.length === 0 && "opacity-5 grayscale pointer-events-none"
              )}
              onClick={handleAdd}
            >
              Inject {selectedIds.length} forms
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
