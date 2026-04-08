import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  UserPlus, 
  Search, 
  Check, 
  Building2, 
  User, 
  ShieldCheck,
  Plus
} from 'lucide-react'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  RadioGroup, 
  RadioGroupItem 
} from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

type EntityType = 'Individual' | 'Corporation' | 'LLC' | 'Trust'

interface Contact {
  id: string
  name: string
  email: string
  role: string
}

const mockContacts: Contact[] = [
  { id: 'c1', name: 'Michael Scott', email: 'michael@dundermifflin.com', role: 'Seller Agent' },
  { id: 'c2', name: 'Jim Halpert', email: 'jim@dundermifflin.com', role: 'Buyer' },
  { id: 'c3', name: 'Pam Beesly', email: 'pam@dundermifflin.com', role: 'Co-Buyer' },
]

export default function AddPartyModal({ onAdd }: { onAdd: (party: any) => void }) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [entityType, setEntityType] = useState<EntityType>('Individual')
  
  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    role: 'Buyer'
  })

  const filteredContacts = mockContacts.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleFinalAdd = () => {
    // If user has typed in new contact fields, prioritize that
    if (newContact.name && newContact.email) {
      onAdd({ ...newContact, entityType })
    }
    setOpen(false)
    setNewContact({ name: '', email: '', role: 'Buyer' })
    setSearchQuery('')
  }

  const handleSelect = (contact: Contact) => {
    onAdd({ ...contact, entityType })
    setOpen(false)
    setSearchQuery('')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-brand/10 text-brand transition-all active:scale-90">
          <Plus size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] p-0 overflow-hidden rounded-[40px] border-none shadow-2xl flex flex-col bg-white">
        <DialogHeader className="p-8 pb-6 bg-brand/5 border-b border-brand/10 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-brand shadow-sm border border-brand/10">
              <UserPlus size={20} />
            </div>
            <div>
              <DialogTitle className="text-lg font-black text-gray-900 tracking-tight">Party Management</DialogTitle>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Inside Radius System Audit</p>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <div className="p-8 space-y-10">
            {/* Search Section */}
            <div className="space-y-6">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand transition-colors" size={18} />
                <Input 
                  placeholder="Search existing contacts..." 
                  className="pl-12 h-14 bg-gray-50 border-none rounded-2xl font-bold text-sm focus-visible:ring-8 focus-visible:ring-brand/5 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {searchQuery && (
                <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Found Documents</h4>
                  {filteredContacts.length > 0 ? (
                    filteredContacts.map(contact => (
                      <motion.div 
                        key={contact.id}
                        onClick={() => handleSelect(contact)}
                        className="flex items-center justify-between p-4 rounded-2xl border-2 border-transparent hover:border-brand/20 hover:bg-brand/5 cursor-pointer transition-all group bg-gray-50/50"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-4 text-left">
                          <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center text-gray-900 border font-black text-[11px] group-hover:bg-brand group-hover:text-white transition-colors">
                            {contact.name.split(' ').map(n=>n[0]).join('')}
                          </div>
                          <div className="text-left">
                            <div className="font-black text-sm text-gray-900 leading-none">{contact.name}</div>
                            <div className="text-[9px] text-gray-400 font-bold uppercase tracking-tight mt-1.5">{contact.email}</div>
                          </div>
                        </div>
                        <Check size={16} className="text-brand opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-gray-400 font-bold text-xs bg-gray-50 rounded-2xl">No contacts found</div>
                  )}
                </div>
              )}
            </div>

            <Separator className="bg-gray-100" />

            {/* Manual Entry Section */}
            <div className="space-y-6">
              <h3 className="text-[11px] font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                <Plus size={14} className="text-brand" />
                Manual Entry
              </h3>
              <div className="grid grid-cols-1 gap-5">
                <div className="space-y-2 text-left">
                  <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Full Name</Label>
                  <Input 
                    placeholder="e.g. Michael Scott" 
                    className="h-12 bg-gray-50 border-none rounded-xl font-bold text-sm focus-visible:ring-8 focus-visible:ring-brand/5 transition-all"
                    value={newContact.name}
                    onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2 text-left">
                  <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Email Address</Label>
                  <Input 
                    placeholder="michael@radius.com" 
                    className="h-12 bg-gray-50 border-none rounded-xl font-bold text-sm focus-visible:ring-8 focus-visible:ring-brand/5 transition-all"
                    value={newContact.email}
                    onChange={(e) => setNewContact(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {/* Entity Selection */}
            <div className="space-y-4 pt-4 text-left">
              <h3 className="text-[11px] font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                 <ShieldCheck size={14} className="text-brand" />
                 Designation
              </h3>
              <RadioGroup 
                defaultValue="Individual" 
                className="grid grid-cols-2 gap-3"
                onValueChange={(v) => setEntityType(v as any)}
              >
                {[
                  { id: 'Individual', icon: User },
                  { id: 'Corporation', icon: Building2 },
                  { id: 'LLC', icon: Building2 },
                  { id: 'Trust', icon: ShieldCheck }
                ].map((type) => (
                  <div key={type.id}>
                    <RadioGroupItem value={type.id} id={type.id} className="peer sr-only" />
                    <Label
                      htmlFor={type.id}
                      className="flex items-center gap-3 p-4 rounded-2xl border-2 border-gray-100 bg-gray-50/50 cursor-pointer transition-all peer-data-[state=checked]:border-brand peer-data-[state=checked]:bg-brand/5 hover:bg-white hover:shadow-sm"
                    >
                      <type.icon size={14} className={cn(
                        "transition-colors",
                        entityType === type.id ? "text-brand" : "text-gray-400"
                      )} />
                      <span className="font-extrabold text-[11px] uppercase tracking-wider">{type.id}</span>
                      {entityType === type.id && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand" />
                      )}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </ScrollArea>

        <div className="p-8 bg-gray-50/50 flex gap-4 border-t shrink-0">
          <Button variant="ghost" onClick={() => setOpen(false)} className="flex-1 h-12 rounded-[18px] font-black text-[11px] uppercase tracking-widest text-gray-400 hover:text-gray-900">Cancel</Button>
          <Button 
            onClick={handleFinalAdd}
            disabled={!newContact.name && searchQuery === ''}
            className="flex-1 h-12 rounded-[18px] bg-brand hover:bg-brand/90 text-white font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-brand/20 transition-all active:scale-95 disabled:opacity-50"
          >
            Confirm Party
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
