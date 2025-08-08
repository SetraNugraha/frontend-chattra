"use client"

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
import { LuMessageSquarePlus } from "react-icons/lu"
import { Label } from "@/components/ui/label"
import { Button } from "../ui/button"
import { Input } from "@/components/ui/input"
import { useContact } from "@/hooks/useContact"
import { FormEvent, useState } from "react"
import { AxiosError } from "axios"

export const AddNewContact = () => {
  const { addNewContact, isLoading } = useContact()
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [phone, setPhone] = useState<string>("")
  const [hasError, setHasError] = useState<string>("")

  const handleAddNewContact = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    addNewContact.mutate(phone, {
      onSuccess: () => {
        setPhone("")
        alert("new contact saved")
        setHasError("")
        setIsDialogOpen(false)
      },
      onError: (error) => {
        console.log("add new contact mutate error: ", error)
        if (error instanceof AxiosError) {
          setHasError(error.response?.data.fieldErrors.phone[0] || "Unknown error")
        }
      },
    })
  }

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        setIsDialogOpen(open)
        if (open) {
          setPhone("")
          setHasError("")
        }
      }}
    >
      {/* Button Dialog */}
      <DialogTrigger asChild className="p-1.5 bg-blue-500 rounded-sm cursor-pointer hover:brightness-70">
        <button onClick={() => setIsDialogOpen(true)}>
          <LuMessageSquarePlus size={20} color="white" />
        </button>
      </DialogTrigger>

      {/* Content */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new contact</DialogTitle>
          <DialogDescription>Find new contact from number phone, start chatting to each other</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAddNewContact} className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="phone" className="font-semibold">
              Phone Number
            </Label>
            <Input
              id="phone"
              name="phone"
              type="number"
              placeholder="8 Digit, ex: 87628176"
              className={`${hasError && "ring-1 ring-red-500"} `}
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            {hasError && <span className="text-sm font-semibold text-red-500 ml-2 -mt-1">{hasError}</span>}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isLoading} className="cursor-pointer hover:brightness-70">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="cursor-pointer hover:outline-none hover:ring-2 hover:ring-black hover:text-black hover:bg-white transition-all duration-300 disabled:bg-gray-600 disabled:text-white disabled:font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Process saving ..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
