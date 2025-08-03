"use client"

import { LuMessageSquarePlus } from "react-icons/lu"
import { SidebarFooter } from "./SidebarFooter"

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
import { Button } from "../ui/button"
import { useContact } from "@/hooks/useContact"
import { SidebarListContacts } from "./SidebarListContacts"

export const Sidebar = () => {
  const { savedContacts } = useContact()

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
                <DialogDescription>Find new contact from number phone, start chatting to each other</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="number" className="font-semibold">
                    Phone Number
                  </Label>
                  <Input id="number" name="number" type="number" placeholder="8 Digit, ex: 87628176" />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" className="cursor-pointer hover:brightness-70">
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
        <SidebarListContacts savedContacts={savedContacts} />
      </div>

      {/* Footer */}
      <SidebarFooter />
    </div>
  )
}
