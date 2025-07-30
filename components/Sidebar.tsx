import { contacts } from "@/dummy-data/contacts"
import Image from "next/image"
import Link from "next/link"
import { LuMessageSquarePlus } from "react-icons/lu"
import { IoMdSettings } from "react-icons/io"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "./ui/button"

export const Sidebar = () => {
  return (
    <div className="relative h-full w-[30%] bg-gray-200 rounded-tl-xl rounded-bl-xl">
      <div className="px-5 pt-4">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl font-bold tracking-wide">Contacts</h1>
          <Dialog>
            {/* Button Dialog */}
            <DialogTrigger className="p-1.5 bg-blue-500 rounded-sm cursor-pointer hover:brightness-70">
              <LuMessageSquarePlus size={20} color="white" />
            </DialogTrigger>

            {/* Content */}
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add new contact</DialogTitle>
                <DialogDescription>
                  Find new contact from number phone, start chatting to each
                  other
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="number" className="font-semibold">
                    Phone Number
                  </Label>
                  <Input
                    id="number"
                    name="number"
                    type="number"
                    placeholder="8 Digit, ex: 87628176"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="cursor-pointer hover:brightness-70"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  className="cursor-pointer hover:outline-none hover:ring-2 hover:ring-black hover:text-black hover:bg-white transition-all duration-300"
                >
                  Add Contact
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* List Contacts */}
        <div className="flex flex-col max-h-[650px] overflow-y-auto hide-scrollbar gap-y-3 mt-5">
          {contacts.map((contact) => (
            <Link
              href={`/contact/${contact.number}`}
              key={contact.id}
              className="flex items-center gap-x-3 px-2 py-1 hover:bg-slate-300 hover:rounded-md"
            >
              <Image
                src={"/snorlax-pixel.png"}
                alt="profile-image"
                width={40}
                height={40}
                className="rounded-md"
              />

              <div>
                <h4 className="font-semibold">{contact.number}</h4>
                <p className="text-sm text-slate-500">{contact.username}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="absolute w-full bottom-0 rounded-bl-xl px-3 py-2 z-50 bg-gray-300/80">
        <div className="flex items-center justify-between pr-5">
          <Link
            href={`/contact/871561234`}
            className="flex items-center gap-x-3 px-2 py-1 w-[80%] hover:bg-white hover:rounded-md hover:rounded-bl-xl"
          >
            <Image
              src={"/snorlax-pixel.png"}
              alt="profile-image"
              width={40}
              height={40}
              className="rounded-md"
            />

            <div>
              <h4 className="font-semibold">08182142</h4>
              <p className="text-sm text-slate-500">Setra Nugraha</p>
            </div>
          </Link>

          <button className="cursor-pointer hover:text-gray-500 ">
            <IoMdSettings size={28} />
          </button>
        </div>
      </div>
    </div>
  )
}
