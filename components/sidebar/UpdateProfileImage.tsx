"use client"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from "../ui/button"
import { Input } from "@/components/ui/input"
import { useRef, useState } from "react"
import Image from "next/image"
import { useAuth } from "@/context/AuthContext"
import { useUser } from "@/hooks/useUser"

export const UpdateProfileImage = () => {
  const { authUser } = useAuth()
  const { data: user, updateProfileImage, deleteProfileImage } = useUser(authUser?.id)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [hasError, setHasError] = useState<string>("")
  const [fileImage, setFileImage] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleInputImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileImage(file)
    }
  }

  const handleUpdateProfileImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    updateProfileImage.mutate(fileImage, {
      onSuccess: () => {
        setFileImage(null)
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
        alert("Update profile image success")
      },
      onError: (error) => {
        console.error("update profile error: ", error)
        alert("Error while updating profile image, Please try again later ...")
        setFileImage(null)
        setIsDialogOpen(false)
      },
    })
  }

  const handleDeleteProfileImage = () => {
    const isConfirm = confirm("Are you sure want to delete profile image ?")

    if (isConfirm) {
      deleteProfileImage.mutate(authUser?.id, {
        onSuccess: () => {
          alert("Success delete profile image")
        },
        onError: (error) => {
          console.error("update profile error: ", error)
          alert("Error while updating profile image, Please try again later ...")
          setIsDialogOpen(false)
        },
      })
    }
  }

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        setIsDialogOpen(open)
        if (open) {
          setFileImage(null)
          setHasError("")
          if (fileInputRef.current) {
            fileInputRef.current.value = ""
          }
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

          <div className="h-[320px] my-5 flex flex-col items-center justify-center gap-y-2">
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={user?.profileImage || "/snorlax-pixel.png"}
                fill
                alt="profile-image"
                className="object-contain"
              />
            </div>
            {/* Delete Image Button */}
            <Button
              disabled={!user?.profileImage || updateProfileImage.isPending || deleteProfileImage.isPending}
              onClick={handleDeleteProfileImage}
              className="bg-red-500 font-semibold text-sm tracking-wide cursor-pointer disabled:bg-gray-600"
            >
              Delete Image
            </Button>
          </div>
        </DialogHeader>
        <form className="grid gap-4" onSubmit={handleUpdateProfileImage}>
          <div className="grid gap-3">
            <Label htmlFor="phone" className="font-semibold ml-1">
              Choose File : [ jpg, jpeg, png ]
            </Label>
            <Input
              id="profileImage"
              name="profileImage"
              type="file"
              ref={fileInputRef}
              disabled={updateProfileImage.isPending || deleteProfileImage.isPending}
              onChange={handleInputImage}
            />

            {fileImage && <p className="text-sm font-semibold text-blue-500 ml-3 -mt-2 italic">File uploaded</p>}
            {hasError && <span className="text-sm font-semibold text-red-500 ml-2 -mt-1">{hasError}</span>}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                disabled={updateProfileImage.isPending || deleteProfileImage.isPending}
                variant="outline"
                className="cursor-pointer hover:brightness-70 disabled:text-white disabled:bg-gray-600"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={updateProfileImage.isPending || deleteProfileImage.isPending}
              type="submit"
              className="cursor-pointer hover:outline-none hover:ring-2 hover:ring-black hover:text-black hover:bg-white transition-all duration-300 disabled:bg-gray-600 disabled:text-white disabled:font-semibold"
            >
              {updateProfileImage.isPending ? "Process Updating ..." : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
