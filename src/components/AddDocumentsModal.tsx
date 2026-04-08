import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FilePlus, 
  Search, 
  Upload, 
  ArrowRight,
  Eye,
  Download,
  Trash2,
  Plus,
  MoreVertical
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface FormTemplate {
  id: string
  name: string
  category: string
  isPopular?: boolean
  isPackage?: boolean
  children?: { id: string, name: string }[]
}

interface UploadedFile {
  id: string
  name: string
  use: string
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
  
  // High-Fidelity Upload Management
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const globalUploadType = 'Documents for my own use'
  
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const newFiles = files.map(f => ({
      id: `${f.name}-${Date.now()}-${Math.random()}`,
      name: f.name,
      use: globalUploadType
    }))
    setUploadedFiles(prev => [...prev, ...newFiles])
    if (e.target) e.target.value = ''
  }

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id))
  }

  const updateFileUse = (id: string, use: string) => {
    setUploadedFiles(prev => prev.map(f => f.id === id ? { ...f, use } : f))
  }

  const handleAdd = () => {
    const selected: any[] = []
    
    // Process systematic library forms
    formLibrary.forEach(f => {
      if (f.isPackage && f.children) {
        f.children.forEach(c => {
          if (selectedIds.includes(c.id)) selected.push({ ...c, type: 'form' })
        })
      } else if (selectedIds.includes(f.id)) {
        selected.push({ ...f, type: 'form' })
      }
    })

    // Process manual audit uploads
    const finalPayload = [
      ...selected,
      ...uploadedFiles.map(f => ({ ...f, type: 'upload' }))
    ]

    onAdd(finalPayload)
    onOpenChange(false)
    setSelectedIds([])
    setUploadedFiles([])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1140px] h-[82vh] max-h-[82vh] p-0 overflow-hidden rounded-[32px] border-none shadow-2xl flex flex-col bg-white">
        {/* Compact Header */}
        <DialogHeader className="px-6 py-4 bg-brand/5 border-b border-brand/10 shrink-0 h-16">
          <div className="flex items-center justify-between w-full h-full">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-brand shadow-sm border border-brand/10">
                <FilePlus size={20} />
              </div>
              <div>
                <DialogTitle className="text-sm font-black text-gray-900 tracking-[0.2em] uppercase">Radius Document Library</DialogTitle>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Active System Library</p>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-1 overflow-hidden min-h-0">
          {/* Navigation Sidebar */}
          <aside className="w-52 border-r border-gray-100 bg-gray-50/20 p-4 flex flex-col gap-1.5 shrink-0">
            <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-2">Library</h4>
            {['Offers', 'Listings', 'Templates', 'Uploads'].map((cat) => (
              <Button
                key={cat}
                variant="ghost"
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "justify-start h-9 rounded-lg font-bold text-[11px] transition-all relative px-3",
                  cat === selectedCategory 
                    ? "bg-white text-brand shadow-sm border border-brand/10" 
                    : "text-gray-500 hover:bg-white/50"
                )}
              >
                {cat}
                {cat === selectedCategory && (
                  <motion.div layoutId="navBlade" className="absolute left-0 w-1 h-5 bg-brand rounded-r-full" />
                )}
                {cat === 'Uploads' && uploadedFiles.length > 0 && (
                  <Badge className="ml-auto bg-brand text-white text-[8px] px-1 h-3.5 min-w-[14px] flex justify-center">{uploadedFiles.length}</Badge>
                )}
              </Button>
            ))}
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden min-h-0 bg-white relative">
            <AnimatePresence mode="wait">
              {selectedCategory === 'Uploads' ? (
                <motion.div 
                  key="upload-view"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="flex-1 flex flex-col h-full overflow-hidden"
                >
                  <TooltipProvider delayDuration={100}>
                    {uploadedFiles.length === 0 ? (
                      <div className="flex-1 flex flex-col items-center justify-center p-8 h-full">
                        <div 
                          className="w-full max-w-xl h-full max-h-[380px] border-2 border-dashed border-brand/20 rounded-[32px] bg-brand/[0.02] flex flex-col items-center justify-center px-12 py-6 text-center group hover:border-brand/40 transition-all cursor-pointer overflow-hidden relative"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <input type="file" ref={fileInputRef} className="hidden" multiple accept=".pdf" onChange={handleFileUpload} />
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand shadow-xl shadow-brand/10 border border-brand/10 mb-6 group-hover:scale-110 transition-transform">
                            <Upload size={24} />
                          </div>
                          <h3 className="text-lg font-black text-gray-900 mb-1 font-outfit uppercase tracking-tight">Drag and drop file(s) to upload</h3>
                          <p className="text-[10px] text-gray-300 font-bold mb-6 uppercase tracking-widest leading-loose">Automated Transaction Audit Ingestion (PDF Only)</p>
                          
                          <div className="flex items-center gap-4 w-full max-w-[240px] justify-center mb-6">
                            <div className="h-px bg-gray-100 flex-1" />
                            <span className="text-[9px] font-black text-gray-200 uppercase tracking-widest">OR</span>
                            <div className="h-px bg-gray-100 flex-1" />
                          </div>
                          
                          <Button className="h-10 px-10 rounded-full bg-brand hover:bg-brand/90 text-white font-black text-[10px] shadow-xl shadow-brand/20 mb-8 transition-all active:scale-95 uppercase tracking-[0.2em]">
                            Browse files
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1 flex flex-col min-h-0 p-5 w-full">
                        <div className="flex items-center justify-between mb-4 shrink-0 px-2 uppercase text-left">
                          <div className="flex flex-col">
                            <h3 className="text-sm font-black text-gray-900 tracking-widest font-outfit">Uploaded Documents</h3>
                            <p className="text-[9px] text-gray-400 font-bold tracking-widest mt-0.5">Manual audit ingestion queue ({uploadedFiles.length} files)</p>
                          </div>
                          <Button 
                            onClick={() => fileInputRef.current?.click()}
                            variant="outline" 
                            className="h-8 px-5 rounded-xl border-brand/30 text-brand font-black text-[9px] uppercase tracking-widest hover:bg-brand/5 shadow-sm"
                          >
                            <Plus size={12} className="mr-2" />
                            Upload More PDF
                          </Button>
                          <input type="file" ref={fileInputRef} className="hidden" multiple accept=".pdf" onChange={handleFileUpload} />
                        </div>
                        
                        {/* High-Density Audit Table */}
                        <div className="flex-1 overflow-hidden border border-gray-50 rounded-2xl bg-white shadow-sm shadow-black/[0.02]">
                          <ScrollArea className="h-full">
                            <table className="w-full border-collapse table-fixed">
                              <thead>
                                <tr className="bg-gray-50/50">
                                  <th className="text-left py-3 pl-8 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] w-[72%]">Document Name</th>
                                  <th className="text-left py-3 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] w-[210px]">Usage Mapping</th>
                                  <th className="text-right py-3 pr-8 w-12" />
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-50/80">
                                {uploadedFiles.map((file) => (
                                  <tr key={file.id} className="group hover:bg-brand/[0.01] transition-all text-left">
                                    <td className="py-2.5 pl-8">
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <div className="flex items-center">
                                            <span className="text-[12px] font-bold text-gray-700 truncate block cursor-default max-w-[98%]">
                                              {file.name}
                                            </span>
                                          </div>
                                        </TooltipTrigger>
                                        <TooltipContent side="top" align="start" className="bg-gray-900/90 backdrop-blur-md text-white rounded-lg py-2 px-4 shadow-2xl border-none max-w-sm">
                                          <p className="text-[10px] font-bold leading-relaxed">{file.name}</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </td>
                                    <td className="py-2.5">
                                      <div className="w-[180px] focus-within:ring-4 focus-within:ring-brand/5 rounded-lg transition-all">
                                        <Select value={file.use} onValueChange={(val) => updateFileUse(file.id, val)}>
                                          <SelectTrigger className="h-8 w-full rounded-md bg-gray-50/50 border-gray-200 font-bold text-[9px] text-gray-500 uppercase tracking-tight hover:bg-white transition-all shadow-none">
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent className="rounded-xl border-none shadow-2xl">
                                            <SelectItem value="Documents for the team" className="text-[9px] font-black py-2 uppercase tracking-tight">Documents for the team</SelectItem>
                                            <SelectItem value="Documents for my own use" className="text-[9px] font-black py-2 uppercase tracking-tight">Documents for my own use</SelectItem>
                                            <SelectItem value="Documents for this transaction" className="text-[9px] font-black py-2 uppercase tracking-tight">Documents for this transaction</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </td>
                                    <td className="py-2.5 pr-8 text-right">
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-gray-400 hover:text-brand hover:bg-brand/5 transition-all outline-none">
                                            <MoreVertical size={16} />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48 rounded-xl border-none shadow-2xl p-1 bg-white">
                                          <DropdownMenuItem className="flex items-center gap-2 rounded-lg py-2 px-3 text-[10px] font-bold uppercase tracking-widest text-gray-600 focus:bg-brand/5 focus:text-brand cursor-pointer">
                                            <Eye size={14} />
                                            View PDF
                                          </DropdownMenuItem>
                                          <DropdownMenuItem className="flex items-center gap-2 rounded-lg py-2 px-3 text-[10px] font-bold uppercase tracking-widest text-gray-600 focus:bg-brand/5 focus:text-brand cursor-pointer">
                                            <Download size={14} />
                                            Download
                                          </DropdownMenuItem>
                                          <DropdownMenuSeparator className="bg-gray-50" />
                                          <DropdownMenuItem 
                                            onClick={() => removeFile(file.id)}
                                            className="flex items-center gap-2 rounded-lg py-2 px-3 text-[10px] font-bold uppercase tracking-widest text-red-500 focus:bg-red-50 focus:text-red-600 cursor-pointer"
                                          >
                                            <Trash2 size={14} />
                                            Delete Ingestion
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </ScrollArea>
                        </div>
                      </div>
                    )}
                  </TooltipProvider>
                </motion.div>
              ) : (
                <motion.div 
                  key="list-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 flex flex-col overflow-hidden min-h-0 text-left"
                >
                  <TooltipProvider delayDuration={100}>
                    <div className="p-5 pb-3 shrink-0 flex gap-3 items-center">
                      <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand transition-colors" size={18} />
                        <Input 
                          placeholder="Search library" 
                          className="pl-11 h-10 bg-gray-50 border-none rounded-xl font-bold text-xs focus-visible:ring-4 focus-visible:ring-brand/5 transition-all shadow-sm"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <Select value={selectedState} onValueChange={setSelectedState}>
                        <SelectTrigger className="w-44 h-10 rounded-xl bg-white border border-gray-100 font-black text-[10px] text-gray-900 shadow-sm uppercase tracking-widest">
                          <SelectValue placeholder="State" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-none shadow-2xl">
                          <SelectItem value="California" className="text-[10px] font-black uppercase tracking-widest py-2.5">California</SelectItem>
                          <SelectItem value="Texas" className="text-[10px] font-black uppercase tracking-widest py-2.5">Texas</SelectItem>
                          <SelectItem value="Florida" className="text-[10px] font-black uppercase tracking-widest py-2.5">Florida</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <ScrollArea className="flex-1 px-6">
                      <div className="divide-y divide-gray-50 min-h-[400px] pt-2 pb-8">
                        {filteredForms.map((form) => (
                          <div key={form.id} className="py-0.5">
                            {form.isPackage ? (
                              <Accordion type="single" collapsible className="border-none">
                                <AccordionItem value={form.id} className="border-none">
                                  <div className="flex items-center h-10 group px-2 hover:bg-gray-50/40 transition-all rounded-lg">
                                    <div className="w-8 flex items-center justify-center mr-3">
                                      <Checkbox 
                                        checked={form.children?.every(c => selectedIds.includes(c.id))}
                                        onCheckedChange={() => toggleSelect(form.id, true, form.children)}
                                        className="w-5 h-5 rounded border-2 border-gray-300 data-[state=checked]:bg-brand data-[state=checked]:border-brand transition-all cursor-pointer bg-white"
                                      />
                                    </div>
                                    <AccordionTrigger className="flex-1 hover:no-underline py-0 h-full">
                                      <div className="flex items-center gap-3">
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <span className="font-bold text-[13px] text-gray-800 tracking-tight truncate max-w-[600px]">{form.name}</span>
                                          </TooltipTrigger>
                                          <TooltipContent side="top" align="start" className="bg-gray-900/90 text-white rounded-lg py-2 px-4 shadow-2xl border-none">
                                            <p className="text-[10px] font-bold">{form.name}</p>
                                          </TooltipContent>
                                        </Tooltip>
                                        <Badge variant="outline" className="text-[8px] font-black uppercase text-gray-400 border-gray-200 h-4.5 px-2 bg-white">Package</Badge>
                                      </div>
                                    </AccordionTrigger>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity pr-4">
                                       <Button variant="ghost" size="icon" className="h-7 w-7 text-brand hover:bg-brand/5 rounded-full"><Eye size={15} /></Button>
                                       <Button variant="ghost" size="icon" className="h-7 w-7 text-brand hover:bg-brand/5 rounded-full"><Download size={15} /></Button>
                                    </div>
                                  </div>
                                  <AccordionContent className="pb-1 pt-0.5 ml-4">
                                    {form.children?.map(child => (
                                      <div key={child.id} className="flex items-center h-9 pl-9 pr-6 group hover:bg-gray-50/20 transition-all rounded-md">
                                        <div className="w-8 flex items-center justify-center mr-2">
                                          <Checkbox 
                                            checked={selectedIds.includes(child.id)}
                                            onCheckedChange={() => toggleSelect(child.id)}
                                            className="w-4.5 h-4.5 rounded border-2 border-gray-300 data-[state=checked]:bg-brand data-[state=checked]:border-brand transition-all cursor-pointer bg-white"
                                          />
                                        </div>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <span className="flex-1 text-[12px] font-bold text-gray-500 truncate max-w-[550px]">{child.name}</span>
                                          </TooltipTrigger>
                                          <TooltipContent side="top" align="start" className="bg-gray-900/90 text-white rounded-lg py-2 px-3 shadow-2xl border-none">
                                            <p className="text-[10px] font-bold">{child.name}</p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </div>
                                    ))}
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            ) : (
                              <div className="flex items-center h-10 group px-2 hover:bg-gray-50/50 transition-all rounded-lg">
                                <div className="w-8 flex items-center justify-center mr-3">
                                  <Checkbox 
                                    checked={selectedIds.includes(form.id)}
                                    onCheckedChange={() => toggleSelect(form.id)}
                                    className="w-5 h-5 rounded border-2 border-gray-300 data-[state=checked]:bg-brand data-[state=checked]:border-brand transition-all cursor-pointer bg-white"
                                  />
                                </div>
                                <div className="flex-1 truncate pl-4">
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <span className={cn(
                                        "text-[13px] font-bold transition-colors block truncate max-w-[750px] cursor-default",
                                        selectedIds.includes(form.id) ? "text-brand" : "text-gray-700"
                                      )}>{form.name}</span>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" align="start" className="bg-gray-900/90 text-white rounded-lg py-2 px-4 shadow-2xl border-none max-w-md">
                                      <p className="text-[10px] font-bold leading-relaxed">{form.name}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity pr-4">
                                   <Button variant="ghost" size="icon" className="h-8 w-8 text-brand hover:bg-brand/5 rounded-full transition-all"><Eye size={16} /></Button>
                                   <Button variant="ghost" size="icon" className="h-8 w-8 text-brand hover:bg-brand/5 rounded-full transition-all"><Download size={16} /></Button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </TooltipProvider>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Dense Action Footer */}
        <div className="p-5 bg-gray-50/40 border-t flex flex-col gap-3 shrink-0">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => onOpenChange(false)} className="px-6 h-9 rounded-xl font-black text-[9px] text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-all">
              Exit Document Hub
            </Button>
            <div className="flex items-center gap-6">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] mr-2">
                {uploadedFiles.length + selectedIds.length} Selections Queued
              </span>
              <Button 
                className={cn(
                  "px-10 h-10 rounded-xl bg-brand hover:bg-brand/90 text-white font-black text-[10px] uppercase tracking-[0.3em] shadow-xl shadow-brand/20 transition-all active:scale-95 flex items-center gap-3",
                  (selectedIds.length === 0 && uploadedFiles.length === 0) && "opacity-10 grayscale pointer-events-none"
                )}
                onClick={handleAdd}
              >
                Incorporate {selectedIds.length + uploadedFiles.length > 0 ? `${selectedIds.length + uploadedFiles.length} Documents` : ''}
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
