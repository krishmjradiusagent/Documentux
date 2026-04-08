import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FilePlus, 
  Search, 
  Upload, 
  FileText,
  ArrowRight,
  Eye,
  Download,
  Layers
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
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

interface FormTemplate {
  id: string
  name: string
  category: string
  isPopular?: boolean
  isPackage?: boolean
  children?: { id: string, name: string }[]
}

const formLibrary: FormTemplate[] = [
  { id: 'ca-rpa', name: 'California Residential Purchase Agreement (RPA)', category: 'Offers', isPopular: true },
  { id: 'ca-ad', name: 'Disclosure Regarding Real Estate Agency Relationship', category: 'Offers', isPopular: true },
  { id: 'ca-rlas', name: 'Residential Lease or Month-to-Month Rental Agreement', category: 'Listings' },
  { id: 'ca-spq', name: 'Seller Property Questionnaire (SPQ)', category: 'Listings', isPopular: true },
  { 
    id: 'pkg-standard', 
    name: 'Standard Disclosure Package', 
    category: 'Templates', 
    isPackage: true,
    children: [
      { id: 'pkg-1', name: 'Environmental Hazards Booklet' },
      { id: 'pkg-2', name: 'Lead-Based Paint Disclosure' },
      { id: 'pkg-3', name: 'Homeowners Guide to Earthquake Safety' }
    ]
  },
  { id: 'ca-aae', name: 'Additional Agent Acknowledgement', category: 'Templates' },
  { id: 'rad-keysafe', name: 'Radius Keysafe/Lockbox Addendum', category: 'Templates', isPopular: true },
  { id: 'aud-pre', name: 'Pre-Audit Compliance Checklist', category: 'Offers' },
  { id: 'aud-fin', name: 'Final Broker Review Log', category: 'Listings' },
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
  const [selectedCategory, setSelectedCategory] = useState('Offers')
  const [selectedState, setSelectedState] = useState('California')

  const filteredForms = formLibrary.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase())
    if (selectedCategory === 'Uploads') return false
    return matchesSearch && f.category === selectedCategory
  })

  const toggleSelect = (id: string, isPackage = false, children?: { id: string }[]) => {
    setSelectedIds(prev => {
      if (isPackage && children) {
        const childIds = children.map(c => c.id)
        const allSelected = childIds.every(cid => prev.includes(cid))
        if (allSelected) {
          return prev.filter(pid => !childIds.includes(pid))
        } else {
          return Array.from(new Set([...prev, ...childIds]))
        }
      }
      return prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    })
  }

  const handleAdd = () => {
    const selected: any[] = []
    formLibrary.forEach(f => {
      if (f.isPackage && f.children) {
        f.children.forEach(c => {
          if (selectedIds.includes(c.id)) selected.push(c)
        })
      } else if (selectedIds.includes(f.id)) {
        selected.push(f)
      }
    })
    onAdd(selected)
    onOpenChange(false)
    setSelectedIds([])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1000px] max-h-[85vh] p-0 overflow-hidden rounded-[48px] border-none shadow-2xl flex flex-col bg-white">
        <DialogHeader className="p-6 bg-brand/5 border-b border-brand/10 shrink-0 h-24">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand shadow-sm border border-brand/10">
                <FilePlus size={24} />
              </div>
              <div>
                <DialogTitle className="text-base font-black text-gray-900 tracking-[0.2em] uppercase">Radius Document Library</DialogTitle>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Active System Library</p>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-1 overflow-hidden min-h-0">
          <aside className="w-64 border-r border-gray-100 bg-gray-50/30 p-6 flex flex-col gap-2 shrink-0">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Library</h4>
            {['Offers', 'Listings', 'Templates', 'Uploads'].map((cat) => (
              <Button
                key={cat}
                variant="ghost"
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "justify-start h-12 rounded-xl font-bold text-xs transition-all relative px-4",
                  cat === selectedCategory 
                    ? "bg-white text-brand shadow-sm border border-brand/10" 
                    : "text-gray-500 hover:bg-white/50"
                )}
              >
                {cat}
                {cat === selectedCategory && (
                  <motion.div layoutId="navBlade" className="absolute left-0 w-1 h-6 bg-brand rounded-r-full" />
                )}
              </Button>
            ))}
          </aside>

          <div className="flex-1 flex flex-col overflow-hidden min-h-0 bg-white">
            <AnimatePresence mode="wait">
              {selectedCategory === 'Uploads' ? (
                <motion.div 
                  key="upload-view"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="flex-1 flex flex-col items-center justify-center p-12"
                >
                  <div className="w-full max-w-2xl aspect-[1.6/1] border-2 border-dashed border-brand/20 rounded-[40px] bg-brand/[0.02] flex flex-col items-center justify-center p-12 text-center group hover:border-brand/40 transition-all cursor-pointer">
                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-brand shadow-xl shadow-brand/10 mb-8 mb-8 group-hover:scale-110 transition-transform">
                      <Upload size={32} />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-2 font-outfit uppercase tracking-tight">Drag and drop file(s) to upload</h3>
                    <p className="text-xs text-gray-400 font-bold mb-6">PDF up to 25MB</p>
                    <div className="flex items-center gap-4 w-full justify-center mb-8">
                      <div className="h-px bg-gray-100 flex-1" />
                      <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">OR</span>
                      <div className="h-px bg-gray-100 flex-1" />
                    </div>
                    <Button className="h-12 px-12 rounded-full bg-brand hover:bg-brand/90 text-white font-black text-sm shadow-xl shadow-brand/20 mb-8 transition-all active:scale-95">
                      Browse files
                    </Button>
                    <Select defaultValue="own">
                      <SelectTrigger className="w-full max-w-xs h-12 rounded-2xl bg-white border-gray-100 font-bold text-gray-500 shadow-sm">
                        <SelectValue placeholder="Documents for my own use" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl">
                        <SelectItem value="own" className="rounded-xl">Documents for my own use</SelectItem>
                        <SelectItem value="client" className="rounded-xl">Client specific documents</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="list-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 flex flex-col overflow-hidden min-h-0"
                >
                  <div className="p-6 pb-2 shrink-0 flex gap-3 items-center">
                    <div className="relative flex-1 group">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand transition-colors" size={18} />
                      <Input 
                        placeholder="Search library" 
                        className="pl-12 h-12 bg-gray-50 border-none rounded-2xl font-bold text-sm focus-visible:ring-8 focus-visible:ring-brand/5 transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Select value={selectedState} onValueChange={setSelectedState}>
                      <SelectTrigger className="w-48 h-12 rounded-2xl bg-white border border-gray-100 font-bold text-gray-900 shadow-sm">
                        <SelectValue placeholder="State" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl">
                        <SelectItem value="California" className="rounded-xl">California</SelectItem>
                        <SelectItem value="Texas" className="rounded-xl">Texas</SelectItem>
                        <SelectItem value="Florida" className="rounded-xl">Florida</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <ScrollArea className="flex-1 px-6">
                    <div className="divide-y divide-gray-50 min-h-[400px] pt-4">
                      {filteredForms.map((form) => (
                        <div key={form.id} className="py-1">
                          {form.isPackage ? (
                            <Accordion type="single" collapsible className="border-none">
                              <AccordionItem value={form.id} className="border-none">
                                <div className="flex items-center h-12 group px-2 hover:bg-gray-50/50 transition-all rounded-xl">
                                  <div className="w-10 flex items-center justify-center mr-2">
                                    <Checkbox 
                                      checked={form.children?.every(c => selectedIds.includes(c.id))}
                                      onCheckedChange={() => toggleSelect(form.id, true, form.children)}
                                      className="w-5 h-5 rounded-md border-gray-200 data-[state=checked]:bg-brand data-[state=checked]:border-brand"
                                    />
                                  </div>
                                  <AccordionTrigger className="flex-1 hover:no-underline py-0 h-full">
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center">
                                        <Layers size={14} />
                                      </div>
                                      <span className="font-bold text-sm text-gray-800">{form.name}</span>
                                      <Badge variant="outline" className="text-[9px] font-black uppercase text-gray-400 border-gray-100">Package</Badge>
                                    </div>
                                  </AccordionTrigger>
                                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity pr-4">
                                     <Eye className="text-brand h-4 w-4 cursor-pointer" />
                                     <Download className="text-brand h-4 w-4 cursor-pointer" />
                                  </div>
                                </div>
                                <AccordionContent className="pb-2 pt-1">
                                  {form.children?.map(child => (
                                    <div key={child.id} className="flex items-center h-10 pl-14 pr-6 group hover:bg-gray-50/30 transition-all rounded-lg ml-2">
                                      <div className="w-8 flex items-center justify-center mr-2">
                                        <Checkbox 
                                          checked={selectedIds.includes(child.id)}
                                          onCheckedChange={() => toggleSelect(child.id)}
                                          className="w-4 h-4 rounded border-gray-200 data-[state=checked]:bg-brand data-[state=checked]:border-brand"
                                        />
                                      </div>
                                      <span className="flex-1 text-xs font-bold text-gray-500 truncate">{child.name}</span>
                                      <FileText size={12} className="text-gray-300 opacity-0 group-hover:opacity-100" />
                                    </div>
                                  ))}
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          ) : (
                            <div className="flex items-center h-12 group px-2 hover:bg-gray-50/50 transition-all rounded-xl">
                              <div className="w-10 flex items-center justify-center mr-2">
                                <Checkbox 
                                  checked={selectedIds.includes(form.id)}
                                  onCheckedChange={() => toggleSelect(form.id)}
                                  className="w-5 h-5 rounded-md border-gray-200 data-[state=checked]:bg-brand data-[state=checked]:border-brand"
                                />
                              </div>
                              <div className="flex-1 flex items-center gap-3 pl-2">
                                <div className="w-8 h-8 rounded-lg bg-gray-50 text-gray-400 flex items-center justify-center group-hover:bg-brand/5 group-hover:text-brand">
                                  <FileText size={14} />
                                </div>
                                <span className={cn(
                                  "text-sm font-bold transition-colors",
                                  selectedIds.includes(form.id) ? "text-brand" : "text-gray-700"
                                )}>{form.name}</span>
                              </div>
                              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity pr-4">
                                 <Button variant="ghost" size="icon" className="h-8 w-8 text-brand hover:bg-brand/5 rounded-full"><Eye size={16} /></Button>
                                 <Button variant="ghost" size="icon" className="h-8 w-8 text-brand hover:bg-brand/5 rounded-full"><Download size={16} /></Button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="p-6 bg-gray-50/30 border-t flex flex-col gap-4 shrink-0">
          <div className="border border-dashed border-gray-200 rounded-2xl px-5 h-12 flex items-center justify-between gap-4 bg-white/50 hover:bg-white hover:border-brand/30 transition-all cursor-pointer group">
            <div className="flex items-center gap-3">
              <Upload size={16} className="text-gray-400 group-hover:text-brand transition-colors" />
              <span className="text-[11px] font-black text-gray-900 uppercase tracking-tight">Upload local files</span>
              <span className="text-[9px] text-gray-300 font-bold uppercase tracking-widest ml-1">PDF Only</span>
            </div>
            <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest group-hover:text-brand transition-colors">Drag & drop Here</p>
          </div>
          
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => onOpenChange(false)} className="px-6 h-10 rounded-xl font-black text-[10px] text-gray-400 uppercase tracking-widest hover:text-gray-900">
              Close
            </Button>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2">{selectedIds.length} documents selected</span>
              <Button 
                className={cn(
                  "px-8 h-12 rounded-xl bg-brand hover:bg-brand/90 text-white font-black text-[11px] uppercase tracking-[0.12em] shadow-lg shadow-brand/20 transition-all active:scale-95 flex items-center gap-3",
                  selectedIds.length === 0 && "opacity-5 grayscale pointer-events-none"
                )}
                onClick={handleAdd}
              >
                Attach Selected Document(s)
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
