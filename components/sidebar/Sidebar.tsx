"use client"

import { SidebarFooter } from "./SidebarFooter"
import { useContact } from "@/hooks/useContact"
import { SidebarListContacts } from "./SidebarListContacts"
import { AddNewContact } from "./AddNewContact"

export const Sidebar = () => {
  const { data: savedContacts } = useContact()

  return (
    <div className="relative h-full w-[30%] bg-gray-200 rounded-tl-xl rounded-bl-xl">
      <div className="px-5 pt-4">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl font-bold tracking-wide">Contacts</h1>
          <AddNewContact />
        </div>

        {/* List Contacts */}
        <SidebarListContacts savedContacts={savedContacts ?? []} />
      </div>

      {/* Footer */}
      <SidebarFooter />
    </div>
  )
}
