import { Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"

export default function Header() {
  return (
    <header className="h-16 border-b border-gray-800 flex items-center justify-end px-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-gray-400" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>

        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Thomas" />
            <AvatarFallback>TH</AvatarFallback>
          </Avatar>
          <div className="flex items-center">
            <span className="text-sm font-medium mr-1">Thomas</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
  )
}

