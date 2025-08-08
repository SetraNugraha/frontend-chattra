"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { IoMdSettings } from "react-icons/io"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { UpdateProfileImage } from "./UpdateProfileImage"
import { useUser } from "@/hooks/useUser"

export const SidebarFooter = () => {
  const { logout, authUser } = useAuth()
  const { data: user } = useUser(authUser?.id)
  const router = useRouter()
  const [isSettingCLick, setIsSettingClick] = useState<boolean>(false)

  const handleLogout = async () => {
    const isConfirm = confirm("Are you sure want to logout ?")
    try {
      if (isConfirm) {
        const result = await logout()
        if (result.success) {
          router.push("/auth/login")
        }
        router.push("/auth/login")
      }
    } catch (error) {
      console.error("logout error: ", error)
    }
  }

  return (
    <div className="absolute w-full bottom-0 rounded-bl-xl px-3 py-2 z-50 bg-gray-300/80">
      <div className="flex items-center justify-between pr-5">
        <Link
          href={"#"}
          className="flex items-center gap-x-3 px-2 py-1 w-[80%] hover:bg-white hover:rounded-md hover:rounded-bl-xl"
        >
          <div className="relative h-[40px] w-[40px]">
            <Image
              src={user?.profileImage || "/no-image.png"}
              alt="profile-image"
              fill
              className="rounded-md object-contain"
            />
          </div>

          <div>
            <h4 className="font-semibold">{authUser?.phone ?? "-"}</h4>
            <p className="text-sm text-slate-500">{authUser?.username ?? "Unknown User"}</p>
          </div>
        </Link>

        {/* Setting Dropdown */}
        <div className="relative">
          <button className="cursor-pointer hover:text-gray-500" onClick={() => setIsSettingClick(!isSettingCLick)}>
            <IoMdSettings size={28} />
          </button>

          {isSettingCLick && (
            <div className="bg-gray-600  absolute -left-30 -top-21 w-[170px] text-white py-2 px-3 rounded-md flex flex-col gap-y-1 text-sm tracking-wider">
              <UpdateProfileImage />
              <span className="h-0.5 w-full bg-white"></span>
              <button
                className="cursor-pointer px-2 py-1 rounded-md hover:bg-red-600 w-full text-start"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
