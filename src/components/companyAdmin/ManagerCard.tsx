import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { cn } from "../../lib/utils"

interface ManagerCardProps {
  manager: {
    id: number
    name: string
    avatar: string
    projectCount: string
    phone: string
    location: string
    isHighlighted?: boolean
  }
}

export default function ManagerCard({ manager }: ManagerCardProps) {
  return (
    <div
      className={cn(
        "bg-[#22233d] rounded-xl p-6 flex flex-col items-center",
        manager.isHighlighted && "ring-2 ring-blue-500",
      )}
    >
      <div className="relative mb-2">
        <Avatar className="h-16 w-16">
          <AvatarImage src={manager.avatar} alt={manager.name} />
          <AvatarFallback>{manager.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#22233d]"></span>
      </div>

      <h3 className="text-sm font-medium">{manager.name}</h3>
      <p className="text-sm text-gray-400 mt-4">Projects : {manager.projectCount}</p>
      <p className="text-sm text-gray-400">phone: {manager.phone}</p>

      <div className="mt-4 text-xs text-gray-500">{manager.location}</div>
    </div>
  )
}

