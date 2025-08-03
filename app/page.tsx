import { PrivateRoute } from "@/components/auth/PrivateRoute"
import Message from "@/components/Message"
import { Sidebar } from "@/components/sidebar/Sidebar"

export default function Home() {
  return (
    <main className="flex items-center justify-center h-[85%] w-[90%] shadow-xl shadow-gray-300 rounded-xl ring-2 ring-gray-400">
      <PrivateRoute>
        <Sidebar />
        <Message />
      </PrivateRoute>
    </main>
  )
}
