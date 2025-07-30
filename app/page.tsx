import Message from "@/components/Message"
import { Sidebar } from "@/components/Sidebar"

export default function Home() {
  return (
    <main className="flex items-center justify-center h-[85%] w-[90%] shadow-xl shadow-gray-300 rounded-xl ring-2 ring-gray-400">
      <Sidebar />
      <Message />
    </main>
  )
}
