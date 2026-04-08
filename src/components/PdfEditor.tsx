import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ZoomIn,
  ZoomOut,
  Download,
  Printer,
  Tag,
  Loader2,
  Lock,
  UserCheck,
  Building2,
  ShieldCheck,
  AlertCircle,
  MoreVertical,
  CheckCircle2,
  Users as UsersIcon
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle 
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import AddPartyModal from "./AddPartyModal"

const airbnbTransition: any = {
  ease: [0.32, 0.72, 0, 1],
  duration: 0.5
}

interface PdfEditorProps {
  documentName: string
  onClose: () => void
  initialData?: Record<string, string>
}

interface FormField {
  id: string
  label: string
  value: string
  owner: 'Buyer' | 'Seller' | 'Agent'
  status: 'empty' | 'filled'
}

interface Party {
  id: string
  name: string
  role: string
  color: string
  entityType?: string
  active?: boolean
}

export default function PdfEditor({ documentName, onClose, initialData }: PdfEditorProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<string>('Just now')
  const [isReady, setIsReady] = useState(false)
  const [showAllParties, setShowAllParties] = useState(false)

  const [parties, setParties] = useState<Party[]>([
    { id: 'p1', name: 'Vanessa Brown', role: 'Agent (You)', color: 'bg-brand', active: true },
    { id: 'p2', name: 'John Buyer', role: 'Buyer', color: 'bg-blue-500' },
    { id: 'p3', name: 'Sarah Jenkins', role: 'Seller', color: 'bg-amber-500' },
  ])

  const [fields, setFields] = useState<FormField[]>(() => [
    { id: 'addr', label: 'Street Address', value: initialData?.addr || 'Neighborhood 01, Neighborhood 02', owner: 'Agent', status: initialData?.addr ? 'filled' : 'filled' },
    { id: 'city', label: 'City/State', value: initialData?.city || 'Dublin, CA', owner: 'Agent', status: 'filled' },
    { id: 'type', label: 'Property Type', value: initialData?.type || 'Residential Single Family', owner: 'Agent', status: 'filled' },
    { id: 'year', label: 'Year Built', value: initialData?.year || '', owner: 'Seller', status: initialData?.year ? 'filled' : 'empty' },
    { id: 'price', label: 'Proposed Price', value: initialData?.price || '500,000', owner: 'Buyer', status: 'filled' },
    { id: 'closing', label: 'Closing Date', value: initialData?.closing || '', owner: 'Buyer', status: 'empty' },
  ])

  const handleFieldChange = (id: string, newValue: string) => {
    setFields(prev => prev.map(f => f.id === id ? { ...f, value: newValue, status: newValue ? 'filled' : 'empty' } : f))
    setIsSaving(true)
  }

  const handleAddParty = (newParty: any) => {
    const party: Party = {
      id: Math.random().toString(36).substr(2, 9),
      name: newParty.name,
      role: newParty.role,
      color: 'bg-indigo-500',
      entityType: newParty.entityType
    }
    setParties(prev => [...prev, party])
  }

  const [isConfirmingSend, setIsConfirmingSend] = useState(false)

  const handleSend = () => {
    if (docStatus !== 'Completed') return
    setIsConfirmingSend(true)
  }

  const triggerActualSend = () => {
    setIsConfirmingSend(false)
    setIsReady(true)
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      onClose()
    }, 2500)
  }

  // Simulate auto-save
  useEffect(() => {
    if (isSaving) {
      const timer = setTimeout(() => {
        setIsSaving(false)
        setLastSaved(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [isSaving])

  // Document Status Engine
  const docStatus = useMemo(() => {
    const filledCount = fields.filter(f => f.status === 'filled').length
    if (filledCount === 0) return 'Not Started'
    if (isReady) return 'Ready to Send'
    if (filledCount === fields.length) return 'Completed'
    return 'In Progress'
  }, [fields, isReady])

  const progress = Math.round((fields.filter(f => f.status === 'filled').length / fields.length) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: 30 }}
      transition={airbnbTransition}
      className="fixed inset-0 z-50 bg-[#F5F7F9] flex flex-col"
    >
      {/* Premium Multi-Layer Header */}
      <nav className="z-30 bg-white border-b shadow-sm">
        {/* Layer 1: System Info & Context */}
        <div className="h-10 px-6 border-b bg-gray-50/50 flex items-center justify-between overflow-hidden">
           <div className="flex items-center gap-6">
              <Badge variant="outline" className="bg-white text-brand border-brand/10 flex items-center gap-2 h-6 px-2.5 rounded-md font-black text-[8px] uppercase tracking-widest shadow-sm">
                <div className="w-1 h-1 rounded-full bg-brand animate-pulse" />
                📝 Radius Editing Mode
              </Badge>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isSaving ? 'saving' : 'saved'}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex items-center gap-1.5 text-[9px] text-gray-400 font-bold uppercase tracking-tight"
                  >
                    {isSaving ? <Loader2 size={10} className="animate-spin text-brand" /> : <div className="w-1 h-1 rounded-full bg-emerald-500" />}
                    {isSaving ? 'Syncing...' : `All changes saved ${lastSaved}`}
                  </motion.div>
                </AnimatePresence>
              </div>
           </div>
           
           {/* Minimalist Progress Stepper - Integrated */}
           <div className="hidden lg:flex items-center gap-4">
              {['Docs', 'Parties', 'Fields', 'Review', 'Transmit'].map((step, i) => (
                <div key={step} className="flex items-center gap-4">
                   <div className={cn(
                     "flex items-center gap-2 transition-all",
                     i <= 2 ? "text-gray-900" : "text-gray-300"
                   )}>
                      <div className={cn(
                        "w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black border",
                        i <= 2 ? "bg-brand border-brand text-white" : "bg-white border-gray-200 text-gray-300"
                      )}>
                        {i < 2 ? <CheckCircle2 size={10} /> : i + 1}
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-widest">{step}</span>
                   </div>
                   {i < 4 && <div className="w-4 h-[1px] bg-gray-200" />}
                </div>
              ))}
           </div>

           <div className="flex items-center gap-4">
              <div className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Draft ID: #RAD-{Math.floor(Math.random()*10000)}</div>
           </div>
        </div>

        {/* Layer 2: Navigation & Primary Actions */}
        <div className="h-16 px-6 flex items-center justify-between">
          <div className="flex items-center gap-6 overflow-hidden flex-1 mr-8">
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-xl hover:bg-gray-100 transition-all active:scale-90 flex-shrink-0">
              <X size={20} />
            </Button>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-3">
                <h2 className="text-sm font-black text-gray-900 truncate tracking-tight">{documentName}</h2>
                <Badge className={cn(
                  "px-2 h-5 text-[9px] font-black uppercase tracking-widest border-none shrink-0",
                  docStatus === 'Ready to Send' ? "bg-brand text-white shadow-lg shadow-brand/10" :
                  docStatus === 'Completed' ? "bg-emerald-50 text-emerald-600" :
                  docStatus === 'In Progress' ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-400"
                )}>
                  {docStatus}
                </Badge>
              </div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">California Association of Realtors (CAR) • pg {currentPage} of 4</p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="flex items-center bg-gray-100/50 rounded-xl p-1 border group hover:border-brand/20 transition-all">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-gray-400 hover:text-brand hover:bg-white transition-all"><ZoomOut size={16} /></Button>
              <div className="px-3">
                 <span className="text-[11px] font-black text-gray-900">100%</span>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-gray-400 hover:text-brand hover:bg-white transition-all"><ZoomIn size={16} /></Button>
            </div>
            
            <Separator orientation="vertical" className="h-8 mx-1" />
            
            <Button variant="ghost" size="icon" className="rounded-xl text-gray-400 hover:text-brand hover:bg-gray-50 transition-all"><Printer size={18} /></Button>
            <Button variant="ghost" size="icon" className="rounded-xl text-gray-400 hover:text-brand hover:bg-gray-50 transition-all"><Download size={18} /></Button>
            <Button variant="ghost" size="icon" className="rounded-xl text-gray-400 hover:text-brand hover:bg-gray-50 transition-all"><MoreVertical size={18} /></Button>
            
            <Button
              onClick={handleSend}
              disabled={docStatus !== 'Completed' || isReady}
              className={cn(
                "rounded-full px-8 h-11 font-black text-[11px] uppercase tracking-[0.2em] shadow-xl transition-all active:scale-95 ml-2",
                docStatus === 'Completed' ? "bg-brand hover:bg-brand/90 text-white shadow-brand/20" : "bg-gray-100 text-gray-400 shadow-none cursor-not-allowed"
              )}
            >
              {isReady ? "Initiating Send..." : "Finalize Document"}
            </Button>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        {/* Pages Sidebar */}
        <aside className="w-64 bg-white border-r flex flex-col z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
          <div className="p-8 pb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Page Audit</h3>
              <Badge variant="outline" className="text-[9px] bg-gray-50 border-none font-black px-2 py-0.5">{currentPage} / 4</Badge>
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="px-8 pt-12 pb-32 space-y-12">
              {[1, 2, 3, 4].map((page) => (
                <div
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    "aspect-[1/1.41] w-full rounded-[24px] transition-all duration-500 cursor-pointer relative bg-white",
                    currentPage === page 
                      ? "ring-2 ring-brand ring-offset-4 shadow-[0_20px_40px_-12px_rgba(90,95,242,0.25)] scale-[1.04]" 
                      : "border-2 border-gray-100 hover:border-brand/20 hover:shadow-xl hover:shadow-black/5"
                  )}
                >
                  {/* High-Fidelity Skeleton Preview with Internal Clipping */}
                  <div className="absolute inset-0 p-5 space-y-4 opacity-[0.4] group-hover:opacity-[0.6] transition-opacity overflow-hidden rounded-[24px]">
                    <div className="h-2 w-2/3 bg-gray-200 rounded-full" />
                    <div className="space-y-2">
                      <div className="h-1.5 w-full bg-gray-100 rounded-full" />
                      <div className="h-1.5 w-full bg-gray-100 rounded-full" />
                      <div className="h-1.5 w-5/6 bg-gray-100 rounded-full" />
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-2">
                       <div className="h-4 bg-gray-50 rounded-lg" />
                       <div className="h-4 bg-gray-50 rounded-lg" />
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full" />
                    <div className="space-y-2 pt-2">
                      <div className="h-1.5 w-full bg-gray-100 rounded-full" />
                      <div className="h-1.5 w-3/4 bg-gray-100 rounded-full" />
                    </div>
                  </div>

                  {/* Floating Page Label */}
                  <div className={cn(
                    "absolute bottom-4 right-4 w-8 h-8 rounded-2xl flex items-center justify-center text-[11px] font-black z-10 shadow-lg transition-all",
                    currentPage === page ? "bg-brand text-white scale-110" : "bg-white text-gray-400 border border-gray-100"
                  )}>{page}</div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </aside>

        {/* Main Document Canvas */}
        <main className="flex-1 overflow-auto p-12 lg:p-20 flex flex-col items-center bg-[#F8FAFC] z-0 scroll-smooth">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, scale: 0.99, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="max-w-4xl w-full bg-white shadow-[0_32px_96px_-12px_rgba(0,0,0,0.1)] relative min-h-[1400px] p-24 rounded-lg mb-20 border border-gray-100"
          >
            {/* Watermark/Grid Overlay */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#5A5FF2_1px,transparent_1px)] [background-size:32px_32px]" />

            {/* Document Header */}
            <div className="flex justify-between items-start mb-20 border-b-8 border-gray-900 pb-12 relative z-10 transition-all">
              <div>
                <h1 className="text-5xl font-serif font-black text-gray-900 tracking-tighter uppercase leading-none">RPA Form-CA</h1>
                <p className="text-sm text-gray-500 mt-4 font-black uppercase tracking-widest opacity-60">Residential Purchase Agreement • Page {currentPage}</p>
              </div>
              <div className="text-[11px] text-right text-gray-400 font-black leading-tight border-l-4 border-brand/20 pl-6">
                RADIUS SYSTEM<br />AUDIT VER 2.1<br />REF: #9942-B
              </div>
            </div>

            {currentPage === 1 ? (
              <div className="space-y-16 relative z-10">
                <section>
                  <div className="flex items-center justify-between mb-8">
                    <h4 className="text-[13px] font-black text-gray-900 uppercase tracking-widest flex items-center gap-3">
                      <div className="w-2 h-8 bg-brand rounded-full shadow-lg shadow-brand/20" />
                      I. Property & Transaction Details
                    </h4>
                    <Badge variant="outline" className="text-[10px] font-black border-2 border-brand/20 text-brand px-3 py-1 rounded-lg">6 FIELDS MAPPED</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-x-16 gap-y-12">
                    {fields.slice(0, 4).map(field => (
                      <EditableField
                        key={field.id}
                        label={field.label}
                        value={field.value}
                        owner={field.owner}
                        onChange={(val) => handleFieldChange(field.id, val)}
                      />
                    ))}
                  </div>
                </section>

                <Separator className="bg-gray-100 h-1" />

                <section>
                  <div className="flex items-center justify-between mb-8">
                    <h4 className="text-[13px] font-black text-gray-900 uppercase tracking-widest flex items-center gap-3">
                      <Tag size={18} className="text-brand" />
                      II. Financial Proposals
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 gap-x-16 gap-y-12">
                    {fields.slice(4).map(field => (
                      <EditableField
                        key={field.id}
                        label={field.label}
                        value={field.value}
                        owner={field.owner}
                        onChange={(val) => handleFieldChange(field.id, val)}
                      />
                    ))}
                  </div>
                </section>

                <section className="border-4 border-dashed border-gray-100 rounded-[32px] p-16 flex flex-col items-center justify-center gap-8 bg-gray-50/30 group hover:bg-blue-50/30 transition-all duration-500">
                  <div className="w-20 h-20 rounded-[28px] bg-white shadow-2xl flex items-center justify-center text-brand group-hover:scale-110 transition-all duration-500">
                    <Lock size={40} />
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">Signatures Audited</h3>
                    <p className="text-sm text-gray-400 mt-2 font-medium max-w-[340px]">Complete all document logic to unlock legal signature blocks in the transmission stage.</p>
                  </div>
                  <Button
                    variant="outline"
                    className="rounded-full border-2 font-black text-[11px] uppercase tracking-widest px-10 mt-2 h-14 border-brand/20 text-brand hover:bg-brand hover:text-white transition-all active:scale-95 shadow-xl shadow-brand/5"
                  >
                    Run Full Validation
                  </Button>
                </section>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[900px] border-4 border-dashed border-gray-100 rounded-[32px] relative z-10 bg-gray-50/50 font-black text-gray-300 uppercase tracking-widest text-lg">
                <div className="w-32 h-32 rounded-full border-8 border-gray-100 flex items-center justify-center mb-6">
                    {currentPage}
                </div>
                Page Content {currentPage}
              </div>
            )}
          </motion.div>
        </main>

        {/* Tools Palette (Right) */}
        <aside className="w-80 bg-white border-l flex flex-col z-10 shadow-[-4px_0_24px_rgba(0,0,0,0.02)]">
          <ScrollArea className="flex-1">
            <div className="p-10 space-y-12">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <UsersIcon size={14} />
                    Parties
                  </h3>
                  <AddPartyModal onAdd={handleAddParty} />
                </div>
                 <div className="space-y-2">
                  <AnimatePresence>
                    {parties.slice(0, showAllParties ? undefined : 5).map(party => (
                      <motion.div
                        key={party.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={airbnbTransition}
                      >
                        <PartyItem
                          name={party.name}
                          role={party.role}
                          color={party.color}
                          active={party.active}
                          entityType={party.entityType}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {!showAllParties && parties.length > 5 && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowAllParties(true)}
                      className="w-full py-4 rounded-xl border-2 border-dashed border-gray-100 font-black text-[10px] text-gray-400 uppercase tracking-widest hover:border-brand/20 hover:text-brand hover:bg-brand/[0.02] transition-all bg-white/50"
                    >
                      + {parties.length - 5} More Parties
                    </motion.button>
                  )}

                  {showAllParties && parties.length > 5 && (
                    <button 
                      onClick={() => setShowAllParties(false)}
                      className="w-full py-3 text-[10px] font-black text-brand uppercase tracking-widest hover:underline"
                    >
                      Show Less
                    </button>
                   )}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                  <Tag size={14} />
                  Completion
                </h3>
                <div className="space-y-8">
                  <div className="flex justify-between items-end bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-inner">
                    <div>
                      <span className="text-4xl font-black text-gray-900 tracking-tighter">{progress}%</span>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1.5">Audit Ready</p>
                    </div>
                    {progress === 100 && <div className="text-emerald-500 animate-bounce"><CheckCircle2 size={24} /></div>}
                  </div>
                  <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden border p-1 shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={airbnbTransition}
                      className="bg-brand h-full rounded-full shadow-lg"
                    />
                  </div>

                  <ul className="space-y-4">
                    {fields.map(f => (
                      <li key={f.id} className="flex items-center justify-between text-[11px] p-3 rounded-xl hover:bg-gray-50 transition-colors">
                        <span className="text-gray-500 font-bold">{f.label}</span>
                        {f.status === 'filled' ? (
                          <div className="flex items-center gap-1.5 text-emerald-500 font-black uppercase tracking-widest text-[9px]">
                            <UserCheck size={12} />
                            Vetted
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-red-400 font-black uppercase tracking-widest text-[9px]">
                            <AlertCircle size={12} />
                            Missing
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </ScrollArea>

          <div className="p-8 border-t bg-gray-50/30">
            <Button
              onClick={handleSend}
              disabled={docStatus !== 'Completed' || isReady}
              className={cn(
                "w-full h-14 rounded-2xl font-black text-xs uppercase tracking-[0.25em] transition-all active:scale-95 shadow-2xl",
                docStatus === 'Completed' ? "bg-brand hover:bg-brand/90 text-white shadow-brand/20" : "bg-gray-100 text-gray-400 shadow-none cursor-not-allowed"
              )}
            >
              {isReady ? "Auditing Package..." : "Finalize Document"}
            </Button>
          </div>
        </aside>
      </div>

      {/* Pre-flight Confirmation Modal */}
      <Dialog open={isConfirmingSend} onOpenChange={setIsConfirmingSend}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-[40px] border-none shadow-2xl">
          <DialogHeader className="p-12 text-center bg-gray-50/50 border-b">
             <div className="w-20 h-20 bg-white rounded-[28px] flex items-center justify-center text-brand mx-auto mb-8 shadow-xl border border-brand/5">
                <Loader2 size={32} className={isReady ? "animate-spin" : ""} />
             </div>
             <DialogTitle className="text-3xl font-black text-gray-900 tracking-tight mb-4 leading-tight">Final Transmission<br />Audit</DialogTitle>
             <p className="text-[13px] text-gray-500 font-bold px-8 leading-relaxed">Ready to initiate the Envoy to DocuSign. All recipients and field mappings have been validated.</p>
          </DialogHeader>

          <div className="px-12 pb-12 pt-10 space-y-8">
             <div className="bg-white rounded-[24px] p-8 border-2 border-gray-50 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand/5 rounded-full -mr-12 -mt-12 group-hover:bg-brand/10 transition-all" />
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6 relative z-10">Signing Order Audit</h4>
                <div className="space-y-6 relative z-10">
                   {parties.map((p, i) => (
                     <div key={p.id} className="flex items-center justify-between group/item">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center font-black text-[11px] text-gray-900 border border-gray-100 group-hover/item:border-brand/20 group-hover/item:bg-white transition-all">{i+1}</div>
                           <div>
                              <div className="text-[13px] font-black text-gray-900 leading-none">{p.name}</div>
                              <div className="text-[10px] text-gray-400 mt-2 uppercase font-black tracking-widest">{p.role}</div>
                           </div>
                        </div>
                        <Badge variant="outline" className="h-5 px-2 text-[9px] bg-emerald-50 text-emerald-600 border-none uppercase font-black">Mapped</Badge>
                     </div>
                   ))}
                </div>
             </div>

             <div className="flex flex-col gap-4 pt-4">
                <Button 
                   onClick={triggerActualSend}
                   className="h-16 bg-brand hover:bg-brand/90 text-white rounded-[22px] font-black text-[12px] uppercase tracking-[0.25em] shadow-2xl shadow-brand/30 active:scale-95 transition-all"
                >
                   Finalize & Transmit
                </Button>
                <Button 
                   variant="ghost" 
                   onClick={() => setIsConfirmingSend(false)} 
                   className="h-14 rounded-2xl font-black text-[11px] uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-all"
                >
                   Back to Editor
                </Button>
             </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}

function EditableField({ label, value, owner, onChange }: { label: string, value: string, owner: string, onChange: (val: string) => void }) {
  return (
    <div className="group relative transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <label className="text-[11px] text-gray-400 font-black block uppercase tracking-[0.1em] opacity-80">{label}</label>
        <Badge variant="outline" className={cn(
          "text-[9px] font-black px-2 h-5 border-none uppercase tracking-widest",
          owner === 'Agent' ? "bg-brand/10 text-brand" :
            owner === 'Buyer' ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"
        )}>
          {owner}
        </Badge>
      </div>

      <div className={cn(
        "relative rounded-[20px] border-2 transition-all duration-500 z-10",
        owner === 'Agent' ? "bg-brand/[0.03] border-brand/10 group-hover:border-brand/40 ring-brand/[0.03] group-focus-within:ring-[12px] group-focus-within:border-brand" :
          "bg-gray-50/50 border-gray-100 group-hover:border-brand/40",
        !value && "border-red-100 bg-red-50/[0.3]"
      )}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Required ${label}...`}
          className="w-full bg-transparent px-6 py-4 text-[13px] font-black text-gray-900 placeholder:text-gray-400 focus:outline-none relative z-20 transition-all"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-10 scale-90 group-hover:scale-100">
          {!value ? <AlertCircle size={18} className="text-red-400" /> : <UserCheck size={18} className="text-emerald-500" />}
        </div>
      </div>
    </div>
  )
}

function PartyItem({ name, role, active = false, color, entityType }: { name: string, role: string, active?: boolean, color: string, entityType?: string }) {
  return (
    <div className={cn(
      "flex items-center gap-4 p-3 rounded-2xl transition-all cursor-pointer border-2 group",
      active ? "bg-white border-brand shadow-xl shadow-brand/10" : "border-transparent bg-gray-50/30 hover:bg-white hover:border-gray-100"
    )}>
      <div className={cn(
        "w-8 h-8 rounded-lg flex items-center justify-center font-black text-[11px] text-white shadow-md relative transition-all group-hover:rotate-3",
        color
      )}>
        {name.split(' ').map(n => n[0]).join('')}
        {entityType && entityType !== 'Individual' && (
          <div className="absolute -top-1 -right-1 bg-white rounded-md p-0.5 shadow-sm border border-gray-100 flex items-center justify-center text-gray-900 scale-75">
            {entityType === 'Trust' ? <ShieldCheck size={10} /> : <Building2 size={10} />}
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[12px] font-black text-gray-900 flex items-center gap-2">
          <span className="truncate">{name}</span>
          {entityType && entityType !== 'Individual' && (
            <Badge variant="outline" className="h-3.5 px-1.5 text-[7px] bg-gray-100 text-gray-500 uppercase font-black border-none tracking-tighter shrink-0">{entityType}</Badge>
          )}
        </div>
        <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{role}</div>
      </div>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-2 h-2 rounded-full bg-emerald-500 border-2 border-white shadow-lg shrink-0"
          />
        )}
      </AnimatePresence>
    </div>
  )
}
