import Header from "./Header"
import Sidebar from "./Sidebar"
import ProjectCard from "./ProjectCard"
import ManagerCard from "./ManagerCard"

export default function Dashboard() {
  const projects = [
    {
      id: 1,
      title: "Billing Application",
      color: "bg-teal-500",
      user: {
        name: "Thomas Hope",
        avatar: "/placeholder.svg?height=40&width=40",
        timeAgo: "2 weeks ago",
      },
    },
    {
      id: 2,
      title: "Ecommerce project",
      color: "bg-gray-700",
      user: {
        name: "Tony Andrew",
        avatar: "/placeholder.svg?height=40&width=40",
        timeAgo: "2 weeks ago",
      },
    },
  ]

  const managers = [
    {
      id: 1,
      name: "Andy William",
      avatar: "/placeholder.svg?height=60&width=60",
      projectCount: "7/10",
      phone: "9072922178",
      location: "Kerala",
    },
    {
      id: 2,
      name: "Andy William",
      avatar: "/placeholder.svg?height=60&width=60",
      projectCount: "7/10",
      phone: "9072922178",
      location: "Mumbai",
    },
    {
      id: 3,
      name: "Andy William",
      avatar: "/placeholder.svg?height=60&width=60",
      projectCount: "7/10",
      phone: "9072922178",
      location: "Hyderabad",
      isHighlighted: true,
    },
    {
      id: 4,
      name: "Andy William",
      avatar: "/placeholder.svg?height=60&width=60",
      projectCount: "7/10",
      phone: "9072922178",
      location: "Kolkatha",
    },
  ]

  return (
      <div className="flex h-screen bg-[#1a1b2e] text-white">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-6">Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6">Managers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {managers.map((manager) => (
                  <ManagerCard key={manager.id} manager={manager} />
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
  )
}

