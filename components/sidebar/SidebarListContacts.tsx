"use client"
import Image from "next/image"

interface ISavedContact {
  id: string
  username: string
  phone: string
  profileImage: string | null
}

interface ISidebarListContacts {
  savedContacts: ISavedContact[]
  contactsLoading: boolean
  onSelectedContact: (contact: ISavedContact) => void
}

export const SidebarListContacts = ({ savedContacts, contactsLoading, onSelectedContact }: ISidebarListContacts) => {
  return (
    <div className="flex flex-col max-h-[650px] overflow-y-auto hide-scrollbar gap-y-3 mt-5">
      {contactsLoading ? (
        <div>
          <p className="text-sm font-semibold italic mt-5 text-gray-500">Loading contacts ...</p>
        </div>
      ) : savedContacts === null || savedContacts.length === 0 ? (
        <div>
          <p className="text-sm font-semibold italic mt-5 text-gray-500">you dont have a contact yet.</p>
        </div>
      ) : (
        savedContacts.map((contact) => (
          <button
            key={contact.id}
            onClick={() => onSelectedContact(contact)}
            className="flex items-center justify-start gap-x-3 px-2 py-1 hover:bg-slate-300 hover:rounded-md cursor-pointer"
          >
            <Image src={"/snorlax-pixel.png"} alt="profile-image" width={40} height={40} className="rounded-md" />

            <div className="text-start">
              <h4 className="font-semibold ">{contact.phone}</h4>
              <p className="text-sm  text-slate-500">{contact.username}</p>
            </div>
          </button>
        ))
      )}
    </div>
  )
}
