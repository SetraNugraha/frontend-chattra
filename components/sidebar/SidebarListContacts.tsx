"use client"
import Link from "next/link"
import Image from "next/image"

interface ISavedContact {
  id: string
  username: string
  phone: string
  profileImage: string | null
}

interface ISidebarListContacts {
  savedContacts: ISavedContact[]
}

export const SidebarListContacts = ({ savedContacts }: ISidebarListContacts) => {
  return (
    <div className="flex flex-col max-h-[650px] overflow-y-auto hide-scrollbar gap-y-3 mt-5">
      {savedContacts === null || savedContacts.length < 1 ? (
        <div>
          <p className="text-sm font-semibold italic mt-5 text-gray-500">you dont have a contact yet.</p>
        </div>
      ) : (
        savedContacts.map((contact) => (
          <Link
            href={`/contact/${contact.phone}`}
            key={contact.id}
            className="flex items-center gap-x-3 px-2 py-1 hover:bg-slate-300 hover:rounded-md"
          >
            <Image src={"/snorlax-pixel.png"} alt="profile-image" width={40} height={40} className="rounded-md" />

            <div>
              <h4 className="font-semibold">{contact.phone}</h4>
              <p className="text-sm text-slate-500">{contact.username}</p>
            </div>
          </Link>
        ))
      )}
    </div>
  )
}
