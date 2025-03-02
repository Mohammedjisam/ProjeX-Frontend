import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface ProjectCardProps {
  project: {
    id: number
    title: string
    color: string
    user: {
      name: string
      avatar: string
      timeAgo: string
    }
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className={`${project.color} rounded-xl p-6 h-64 flex flex-col justify-between`}>
      <h3 className="text-2xl font-bold">{project.title}</h3>

      <div className="flex items-center space-x-3">
        <Avatar className="border-2 border-white">
          <AvatarImage src={project.user.avatar} alt={project.user.name} />
          <AvatarFallback>{project.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">{project.user.name}</p>
          <p className="text-xs opacity-80">{project.user.timeAgo}</p>
        </div>
      </div>
    </div>
  )
}

