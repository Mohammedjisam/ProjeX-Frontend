import { Bell, Search, User } from "lucide-react"

export default function Header() {
  return (
    <header className="h-16 border-b border-gray-800 bg-gray-900 flex items-center justify-between px-6 z-10">
      <div className="flex-1">
        
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-800 rounded-full transition-colors relative">
          <Bell className="h-5 w-5 text-gray-400" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-blue-500 rounded-full"></span>
        </button>

        <div className="flex items-center space-x-3 pl-4 border-l border-gray-800">
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium">Jisam</span>
            <span className="text-xs text-gray-400">jisam@gmail.com</span>
          </div>
          <div className="h-9 w-9 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
            <User className="h-5 w-5 text-gray-300" />
          </div>
        </div>
      </div>
    </header>
  )
}

