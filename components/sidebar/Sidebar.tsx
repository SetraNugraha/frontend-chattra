"use client"

import { SidebarFooter } from "./SidebarFooter"
import { SidebarListContacts } from "./SidebarListContacts"
import { AddNewContact } from "./AddNewContact"

interface ISavedContact {
  id: string
  username: string
  phone: string
  profileImage: string | null
}

interface ISidebar {
  savedContacts: ISavedContact[]
  contactsLoading: boolean
  onSelectedContact: (contact: ISavedContact) => void
}

export const Sidebar = ({ savedContacts, contactsLoading, onSelectedContact }: ISidebar) => {
  return (
    <div className="relative h-full lg:w-[30%] w-[55%] bg-gray-200 rounded-tl-xl rounded-bl-xl">
      <div className="px-5 pt-4">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl font-bold tracking-wide">Contacts</h1>
          <AddNewContact />
        </div>

        {/* List Contacts */}
        <SidebarListContacts
          savedContacts={savedContacts}
          contactsLoading={contactsLoading}
          onSelectedContact={onSelectedContact}
        />
      </div>

      {/* Footer */}
      <SidebarFooter />
    </div>
  )
}
