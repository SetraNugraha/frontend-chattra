"use client"

import { PrivateRoute } from "@/components/auth/PrivateRoute"
import { Sidebar } from "@/components/sidebar/Sidebar"
import ChatSection from "@/components/message/ChatSection"
import { useContact } from "@/hooks/useContact"
import { useState } from "react"
import { useAuth } from "@/context/AuthContext"

interface IContact {
  id: string
  username: string
  phone: string
  profileImage: string | null
}

export default function Home() {
  const { authUser } = useAuth()
  const { data: savedContacts, isLoading: contactsLoading } = useContact(authUser?.id)
  const [selectedContact, setSelectedContact] = useState<IContact | null>(null)

  return (
    <main className="flex items-center justify-center h-[85%] w-[90%] rounded-xl ">
      <PrivateRoute>
        {/* Leftbar */}
        <Sidebar
          contactsLoading={contactsLoading}
          savedContacts={savedContacts ?? []}
          onSelectedContact={(contact) => setSelectedContact(contact)}
        />

        {/* Rightbar */}
        <ChatSection selectedContact={selectedContact} />
      </PrivateRoute>
    </main>
  )
}
