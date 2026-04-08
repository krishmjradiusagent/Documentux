import React from 'react'
import { motion } from 'framer-motion'
import { 
  Pencil, 
  MessageSquare, 
  Info, 
  ChevronDown,
  Wifi
} from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

interface TransactionBannerProps {
  className?: string
}

const TransactionBanner: React.FC<TransactionBannerProps> = ({ className }) => {
  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Main Top Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        className="w-full bg-white rounded-[10px] border-[1.818px] border-[#AD46FF] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)] overflow-hidden"
      >
        {/* Header Section */}
        <div className="bg-[#FAF5FF] p-6 pb-4 flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-[12px] font-medium text-[#6A7282] uppercase tracking-[0.05em]">Transaction name</p>
            <div className="flex items-center gap-2">
              <h2 className="text-[24px] font-bold text-[#101828]">1123 Folsom St</h2>
              <button className="text-[#AD46FF] hover:scale-110 transition-transform active:scale-95">
                <Pencil size={20} />
              </button>
            </div>
            <p className="text-[12px] font-medium text-[#6A7282]">Buyer name</p>
          </div>

          <div className="flex flex-col items-end gap-4">
            <Badge variant="outline" className="h-[34px] px-4 rounded-full border-gray-200 bg-white flex items-center gap-2 text-[14px] font-bold text-[#101828] cursor-pointer hover:bg-gray-50 transition-colors">
              <Wifi size={14} className="text-gray-400 rotate-90" />
              Pending
              <ChevronDown size={14} className="text-gray-400" />
            </Badge>
            
            <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
              <span className="text-[12px] font-bold text-[#101828]">Accepted Date Control</span>
              <Switch className="data-[state=checked]:bg-[#AD46FF]" />
            </div>
          </div>
        </div>

        {/* Metadata Grid Section */}
        <div className="p-6 pt-2 pb-6">
          <div className="grid grid-cols-6 gap-y-8 gap-x-4">
            {/* Row 1 */}
            <div className="space-y-1">
              <p className="text-[12px] font-medium text-[#6A7282]">Agent</p>
              <p className="text-[14px] font-bold text-[#101828]">Sarah Mitchell</p>
            </div>
            <div className="space-y-1">
              <p className="text-[12px] font-medium text-[#6A7282]">Co-agent</p>
              <p className="text-[14px] font-bold text-[#101828]">John Peterson</p>
            </div>
            <div className="space-y-1">
              <p className="text-[12px] font-medium text-[#6A7282]">Buyer</p>
              <p className="text-[14px] font-bold text-[#101828]">Michael Thompson</p>
            </div>
            <div className="space-y-1">
              <p className="text-[12px] font-medium text-[#6A7282]">Seller</p>
              <p className="text-[14px] font-bold text-[#101828]">David Wilson</p>
            </div>
            <div className="space-y-1">
              <p className="text-[12px] font-medium text-[#6A7282]">Acceptance Date</p>
              <p className="text-[14px] font-bold text-[#101828]">01/15/2025</p>
            </div>
            <div className="space-y-1">
              <p className="text-[12px] font-medium text-[#6A7282]">Closing Date</p>
              <p className="text-[14px] font-bold text-[#101828]">02/28/2025</p>
            </div>

            {/* Row 2 */}
            <div className="space-y-1">
              <p className="text-[12px] font-medium text-[#6A7282]">Gross Commission</p>
              <p className="text-[14px] font-bold text-[#008236]">$26,250</p>
            </div>
            <div className="space-y-1">
              <p className="text-[12px] font-medium text-[#6A7282]">Representation</p>
              <Badge className="bg-[#EFF6FF] text-[#1D4ED8] border-none shadow-none rounded-sm px-2 h-6 text-[11px] font-bold uppercase">Buyer</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-[12px] font-medium text-[#6A7282]">Checklist Type</p>
              <Badge className="bg-[#F3F4F6] text-[#374151] border-none shadow-none rounded-sm px-2 h-6 text-[11px] font-bold uppercase">Residential Purchase</Badge>
            </div>
            
            {/* Action Buttons Spacer */}
            <div className="col-span-3 flex items-end justify-end gap-3">
              <Button variant="ghost" className="rounded-full border border-gray-100 hover:bg-brand/5 text-[#AD46FF] font-bold gap-2 px-6 h-[38px] transition-all hover:scale-105 active:scale-95">
                <MessageSquare size={18} />
                Comments
              </Button>
              <Button className="rounded-full bg-[#AD46FF] hover:bg-[#9333EA] text-white font-bold gap-2 px-6 h-[38px] shadow-lg shadow-brand/20 transition-all hover:scale-105 active:scale-95">
                <Pencil size={18} />
                Edit
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Info Banner Section */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
        className="w-full bg-[#EFF6FF] border border-[#BFDBFE] rounded-[8px] p-4 flex items-start gap-3"
      >
        <div className="mt-0.5 text-[#1E40AF]">
          <Info size={18} />
        </div>
        <div className="space-y-0.5">
          <h4 className="text-[14px] font-bold text-[#1E40AF]">Auditing Status Information</h4>
          <p className="text-[12px] font-medium text-[#1E40AF]">Auditing will begin only after the transaction is in contract</p>
        </div>
      </motion.div>
    </div>
  )
}

export default TransactionBanner
