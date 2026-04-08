import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import {
  FileText,
  ChevronRight,
  Plus,
  Bell,
  ChevronDown,
  Bed,
  Bath,
  Maximize,
  Clock,
  CheckCircle2,
  Download,
  MoreVertical,
  ArrowRight
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import Sidebar from "./components/Sidebar"
import PdfEditor from "./components/PdfEditor"
import AddDocumentsModal from "./components/AddDocumentsModal"

export default function App() {
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [isAddDocOpen, setIsAddDocOpen] = useState(false)
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null)

  const [docStatuses] = useState<Record<string, string>>({
    'KL_A_Keysafe/Lockbox Addendum and Tenant Permission to Access Property_Buyer Representation': 'In Progress',
    'Lead-Based Paint Disclosure - Seller': 'Not Started',
    'Exclusive Right to Sell Listing Agreement': 'In Progress',
    'Property Condition Disclosure Statement': 'Completed'
  })

  const propertyData = {
    addr: 'Neighborhood 01, Neighborhood 02, Neighborhood 03',
    city: 'Dublin, CA 94568',
    type: 'Residential Single Family',
    price: '500,000'
  }
  
  const openEditor = (docName: string) => {
    setSelectedDoc(docName)
    setIsEditorOpen(true)
  }

  return (
    <div className="flex bg-[#F9FAFB] min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top bar */}
        <header className="h-16 bg-white border-b px-8 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2 text-xs font-medium text-brand">
            <span className="opacity-50 hover:opacity-100 cursor-pointer">Active Offers</span>
            <ChevronRight size={14} className="text-gray-300" />
            <span className="text-gray-900 font-bold">Offer for John Buyer</span>
          </div>

          <div className="flex items-center gap-6">
            <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:bg-gray-50">
              <Bell size={20} />
            </Button>
            <div className="flex items-center gap-3 pl-6 border-l">
              <div className="text-right">
                <div className="text-sm font-bold text-gray-900">Vanessa Brown</div>
                <div className="text-[10px] text-brand/80 font-bold uppercase tracking-wider flex items-center justify-end gap-1">
                  <CheckCircle2 size={10} className="fill-brand text-white" />
                  Radius Agent
                </div>
              </div>
              <Avatar className="h-10 w-10 border-2 border-brand/10">
                <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" />
                <AvatarFallback>VB</AvatarFallback>
              </Avatar>
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-8 space-y-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Page Header */}
            <div>
              <h1 className="text-3xl font-bold text-brand-dark mb-6">Offer for [buyer name]</h1>

              {/* Property Card */}
              <Card className="border-none shadow-premium bg-white p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-brand/10 transition-colors" />
                <div className="flex justify-between items-start">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold text-brand-dark">Neighborhood 01, Neighborhood 02 , Neighborhood 03...</h2>
                      <Badge className="bg-brand-dark text-white rounded-md h-6 px-2 uppercase text-[10px] font-bold">Active</Badge>
                    </div>
                    <div className="text-brand-muted font-medium">Dublin, CA 94568</div>
                    <div className="flex items-center gap-8 text-sm text-brand-muted font-bold">
                      <span className="flex items-center gap-2"><Bed size={16} /> 4 beds</span>
                      <span className="flex items-center gap-2"><Bath size={16} /> 4 baths</span>
                      <span className="flex items-center gap-2"><Maximize size={16} /> 2,208 sqft</span>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-4">
                    <div className="text-4xl font-bold text-brand-dark">$500K</div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 h-8 px-3 rounded-md uppercase text-[10px] font-black flex items-center gap-2 translate-y-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        In Progress
                        <ChevronDown size={14} />
                      </Badge>
                    </div>
                    <span className="text-[10px] text-brand-muted mt-4">Last updated xx/xx/xxxx</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Main Tabs */}
            <Tabs defaultValue="documents" className="w-full">
              <TabsList className="bg-transparent border-b w-full justify-start h-auto p-0 gap-8 mb-8">
                <TabsTrigger value="create" className="bg-transparent border-b-2 border-transparent rounded-none px-0 py-4 h-auto data-[state=active]:border-brand data-[state=active]:text-brand font-bold text-brand-muted transition-all">Create an offer</TabsTrigger>
                <TabsTrigger value="contract" className="bg-transparent border-b-2 border-transparent rounded-none px-0 py-4 h-auto data-[state=active]:border-brand data-[state=active]:text-brand font-bold text-brand-muted transition-all">Contract Details</TabsTrigger>
                <TabsTrigger value="documents" className="bg-transparent border-b-2 border-transparent rounded-none px-0 py-4 h-auto data-[state=active]:border-brand data-[state=active]:text-brand font-bold text-brand-muted transition-all">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="documents" className="mt-0">
                <div className="flex flex-col gap-6">
                  {/* Secondary Documents Tabs */}
                  <Tabs defaultValue="preparation">
                    <TabsList className="bg-transparent h-auto p-0 gap-8 mb-6">
                      <TabsTrigger value="preparation" className="bg-transparent rounded-full px-4 py-2 border h-auto data-[state=active]:bg-brand data-[state=active]:text-white font-bold text-xs gap-2 transition-all shadow-sm">
                        Document preparation
                        <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-[9px] min-w-[16px]">3</span>
                      </TabsTrigger>
                      <TabsTrigger value="sent" className="bg-transparent rounded-full px-4 py-2 hover:bg-white h-auto data-[state=active]:bg-brand data-[state=active]:text-white font-bold text-xs transition-all">
                        Sent envelopes
                      </TabsTrigger>
                      <TabsTrigger value="checklists" className="bg-transparent rounded-full px-4 py-2 hover:bg-white h-auto data-[state=active]:bg-brand data-[state=active]:text-white font-bold text-xs transition-all">
                        Checklists
                      </TabsTrigger>
                    </TabsList>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                      {/* Recommended Forms */}
                      <section className="lg:col-span-3">
                        <Card className="border shadow-sm bg-white overflow-hidden rounded-2xl">
                          <CardHeader className="px-6 py-5 border-b flex flex-row items-center justify-between">
                            <CardTitle className="text-base font-bold text-brand-dark">Recommended Forms</CardTitle>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-brand font-bold flex items-center gap-1 active:scale-95 transition-all"
                              onClick={() => setIsAddDocOpen(true)}
                            >
                              <Plus size={14} />
                              Add documents
                              <ChevronDown size={14} />
                            </Button>
                          </CardHeader>
                          <CardContent className="p-0">
                            {/* Actions Header */}
                            <div className="flex items-center justify-between px-6 py-3 border-b bg-gray-50/50">
                              <div className="flex items-center gap-3">
                                <Checkbox className="rounded-md border-gray-300 h-5 w-5" />
                                <span className="text-xs font-bold text-gray-400">Select all</span>
                              </div>
                              <div className="flex items-center gap-4">
                                <Button variant="ghost" size="sm" className="text-xs font-bold text-red-400 h-auto p-0 opacity-50 cursor-not-allowed">Delete</Button>
                                <Button variant="ghost" size="sm" className="text-xs font-bold text-brand h-auto p-0 flex items-center gap-2">
                                  <Download size={14} />
                                  Download
                                </Button>
                              </div>
                            </div>

                            {/* Document List */}
                            <div className="divide-y text-xs">
                              {[
                                'KL_A_Keysafe/Lockbox Addendum and Tenant Permission to Access Property_Buyer Representation',
                                'Lead-Based Paint Disclosure - Seller',
                                'Exclusive Right to Sell Listing Agreement',
                                'Property Condition Disclosure Statement'
                              ].map((doc, idx) => {
                                const status = docStatuses[doc] || 'Not Started'
                                return (
                                  <div key={idx} className="p-6 flex items-start gap-4 group hover:bg-gray-50/30 transition-colors">
                                    <Checkbox className="rounded-md border-gray-300 h-5 w-5 mt-1" />
                                    <div className="flex-1 space-y-3">
                                      <div className="flex items-center justify-between">
                                        <div className="font-bold text-sm text-brand-dark leading-tight max-w-[400px]">{doc}</div>
                                        <Badge variant="outline" className={cn(
                                          "px-2 h-5 text-[9px] font-black uppercase tracking-tighter border-none",
                                          status === 'Ready to Send' ? "bg-brand text-white" :
                                          status === 'Completed' ? "bg-emerald-50 text-emerald-600" :
                                          status === 'In Progress' ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-400"
                                        )}>
                                          {status}
                                        </Badge>
                                      </div>
                                      <div className="flex items-center gap-4">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => openEditor(doc)}
                                          className={cn(
                                            "h-auto p-0 font-bold text-xs flex items-center gap-2 hover:bg-transparent",
                                            status === 'Completed' || status === 'Ready to Send' ? "text-emerald-500" : "text-brand"
                                          )}
                                        >
                                          {status === 'Completed' || status === 'Ready to Send' ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                                          {status === 'Not Started' ? 'Start filling' : 'View or fill'}
                                        </Button>
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest pl-4 border-l">Modified x min ago</span>
                                      </div>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>

                            <div className="p-6 pt-2">
                              <Button 
                                disabled={Object.values(docStatuses).some(s => s !== 'Completed' && s !== 'Ready to Send')}
                                className={cn(
                                  "bg-brand hover:bg-brand/90 text-white rounded-full px-8 py-6 h-auto font-bold shadow-lg shadow-brand/20 w-auto active:scale-95 transition-all",
                                  Object.values(docStatuses).some(s => s !== 'Completed' && s !== 'Ready to Send') && "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                                )}
                              >
                                Create & send envelope
                                <ArrowRight size={18} className="ml-2" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </section>

                      {/* Envelopes Column */}
                      <section className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between px-2">
                          <h3 className="text-base font-bold text-brand-dark">Envelopes</h3>
                          <Button variant="ghost" size="sm" className="text-brand font-bold flex items-center gap-1">
                            <Plus size={14} />
                            Add pre-signed paperwork
                            <ChevronDown size={14} />
                          </Button>
                        </div>

                        <Accordion type="single" collapsible defaultValue="in-progress" className="w-full">
                          <AccordionItem value="in-progress" className="border rounded-2xl bg-white overflow-hidden shadow-sm px-0">
                            <AccordionTrigger className="px-6 py-4 hover:no-underline bg-amber-50/30">
                              <div className="flex items-center gap-4">
                                <div className="w-6 h-6 rounded-full bg-brand-warning flex items-center justify-center">
                                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                </div>
                                <span className="font-bold text-sm">In-progress envelopes</span>
                                <span className="w-5 h-5 bg-brand-dark text-white rounded-full flex items-center justify-center text-[10px] font-bold">5</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="p-6 space-y-6">
                              <Card className="border shadow-sm p-6 relative">
                                <div className="flex justify-between items-start mb-6">
                                  <div>
                                    <div className="flex items-center gap-2 group">
                                      <h4 className="font-bold text-brand-dark text-base">Envelope 1</h4>
                                      <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"><MoreVertical size={14} /></Button>
                                    </div>
                                    <p className="text-[10px] text-red-400 font-bold uppercase mt-1 tracking-wider">Your signature pending</p>
                                  </div>
                                  <div className="text-[10px] font-bold text-gray-400 uppercase">March 11, 2024</div>
                                </div>

                                <Accordion type="single" collapsible className="mb-6">
                                  <AccordionItem value="status" className="border-none px-0">
                                    <AccordionTrigger className="p-0 hover:no-underline text-[11px] font-bold text-gray-500 uppercase tracking-wide">
                                      Signature Status (2 of 3 complete):
                                    </AccordionTrigger>
                                    <AccordionContent className="pt-4 space-y-4">
                                      {[
                                        { name: 'You (Agent)', role: 'Agent', email: 'vanessa.brown@radius.com', status: 'Waiting' },
                                        { name: 'Sarah Johnson', role: 'Co-Buyer', email: 'sarah.johnson@gmail.com', status: 'Received' },
                                        { name: 'John Buyer', role: 'Buyer', email: 'john.buyer@example.com', status: 'Waiting' },
                                      ].map((signer, idx) => (
                                        <div key={idx} className="flex items-center justify-between">
                                          <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-brand-warning">
                                              {idx === 1 ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Clock size={16} />}
                                            </div>
                                            <div>
                                              <div className="flex items-center gap-2">
                                                <span className="font-bold text-xs">{signer.name}</span>
                                                <Badge className="bg-gray-100 text-gray-500 h-4 px-1 rounded text-[8px] border-none shadow-none uppercase font-black">{idx + 1}</Badge>
                                              </div>
                                              <div className="text-[10px] text-gray-400">{signer.email}</div>
                                            </div>
                                          </div>
                                          <span className={cn(
                                            "text-[10px] font-bold",
                                            signer.status === 'Waiting' ? "text-brand-warning" : "text-brand"
                                          )}>
                                            {signer.status === 'Waiting' ? 'Waiting for signature' : 'Recieves a copy'}
                                          </span>
                                        </div>
                                      ))}
                                    </AccordionContent>
                                  </AccordionItem>
                                </Accordion>

                                <div className="space-y-4 mb-8">
                                  <div className="flex items-start gap-3">
                                    <FileText size={16} className="text-gray-400 shrink-0 mt-0.5" />
                                    <p className="text-xs font-bold text-brand-neutral">KL_A_Keysafe/Lockbox Addendum and Tenant Permission to Access Property_Buyer Representation</p>
                                  </div>
                                  <div className="flex items-start gap-3">
                                    <FileText size={16} className="text-gray-400 shrink-0 mt-0.5" />
                                    <p className="text-xs font-bold text-brand-neutral">RCSD-S #1_Representative Capacity Signature Disclosure For Buyer Representation (ST)</p>
                                  </div>
                                </div>

                                <Button
                                  onClick={() => openEditor('Envelope 1')}
                                  className="w-full bg-brand hover:bg-brand/90 text-white rounded-full py-6 font-bold shadow-lg shadow-brand/20"
                                >
                                  Fill & Sign
                                </Button>
                              </Card>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </section>
                    </div>
                  </Tabs>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <AddDocumentsModal 
        open={isAddDocOpen} 
        onOpenChange={setIsAddDocOpen}
        onAdd={(docs) => console.log('Added documents:', docs)}
      />

      {/* Full-screen Editor Transition */}
      <AnimatePresence>
        {isEditorOpen && selectedDoc && (
          <PdfEditor
            documentName={selectedDoc}
            initialData={propertyData}
            onClose={() => setIsEditorOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
