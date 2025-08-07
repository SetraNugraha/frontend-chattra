"use client"

import { PrivateRoute } from "@/components/auth/PrivateRoute"
import { Sidebar } from "@/components/sidebar/Sidebar"
import ChatSection from "@/components/message/ChatSection"
import { useContact } from "@/hooks/useContact"
import { useState } from "react"

interface IContact {
  id: string
  username: string
  phone: string
  profileImage: string | null
}

export default function Home() {
  const { data: savedContacts, isLoading: contactsLoading } = useContact()
  const [selectedContact, setSelectedContact] = useState<IContact | null>(null)

  return (
    <main className="flex items-center justify-center h-[85%] w-[90%] shadow-xl shadow-gray-300 rounded-xl ring-2 ring-gray-400">
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
