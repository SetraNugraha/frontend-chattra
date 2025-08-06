/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { Label } from "@/components/ui/label"
import { Button } from "../ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Image from "next/image"

export const UpdateProfileImage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [fileImage, setFileImage] = useState<string>("")
  const [hasError, setHasError] = useState<string>("")

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        setIsDialogOpen(open)
        if (open) {
          setFileImage("")
          setHasError("")
        }
      }}
    >
      {/* Button Dialog */}
      <DialogTrigger
        asChild
        className="cursor-pointer px-2 py-1 rounded-md hover:bg-gray-200 hover:text-gray-600 w-full text-start"
      >
        <button onClick={() => setIsDialogOpen(true)}>Update Profile</button>
      </DialogTrigger>

      {/* Content */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Profile Image</DialogTitle>
          <div className="w-full h-[300px] my-5 flex items-center justify-center">
            <Image src={"/snorlax-pixel.png"} width={300} height={300} alt="profile-image" className="rounded-2xl" />
          </div>
        </DialogHeader>
        <form className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="phone" className="font-semibold ml-1">
              Choose File : [ jpg, jpeg, png ]
            </Label>
            <Input id="profileImage" name="profileImage" type="file" />

            {hasError && <span className="text-sm font-semibold text-red-500 ml-2 -mt-1">{hasError}</span>}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer hover:brightness-70">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="cursor-pointer hover:outline-none hover:ring-2 hover:ring-black hover:text-black hover:bg-white transition-all duration-300 disabled:bg-gray-600 disabled:text-white disabled:font-semibold"
            >
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
