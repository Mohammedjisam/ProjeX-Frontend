import { Bell, Search, User } from "lucide-react"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/Store"
import { useNavigate } from "react-router-dom"

export default function Header() {
  const navigate = useNavigate()
  // Get manager data from Redux store
  const managerData = useSelector((state: RootState) => state.manager.managerData)
  
  // Display name could be a specific property or fallback to a default
  const displayName = managerData?.name || managerData?.username || "Guest"
  const email = managerData?.email || ""
  
  // Handle profile click
  const handleProfileClick = () => {
    navigate("/manager/profile")
  }
  
  return (
    <header className="h-16 border-b border-gray-800 bg-gray-900 flex items-center justify-between px-6 z-10">
      <div className="flex-1">
        
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-800 rounded-full transition-colors relative">
          <Bell className="h-5 w-5 text-gray-400" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-blue-500 rounded-full"></span>
        </button>

        <div 
          className="flex items-center space-x-3 pl-4 border-l border-gray-800 cursor-pointer hover:bg-gray-800 p-2 rounded-md transition-colors"
          onClick={handleProfileClick}
        >
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium">{displayName}</span>
            <span className="text-xs text-gray-400">{email}</span>
          </div>
          <div className="h-9 w-9 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
            {managerData?.profileImage ? (
              <img 
                src={managerData.profileImage} 
                alt={`${displayName}'s profile`}
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-5 w-5 text-gray-300" />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}