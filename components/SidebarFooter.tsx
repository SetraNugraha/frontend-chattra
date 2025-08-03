"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { IoMdSettings } from "react-icons/io"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

export const SidebarFooter = () => {
  const { logout, authUser } = useAuth()
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
          href={`/contact/871561234`}
          className="flex items-center gap-x-3 px-2 py-1 w-[80%] hover:bg-white hover:rounded-md hover:rounded-bl-xl"
        >
          <Image src={"/snorlax-pixel.png"} alt="profile-image" width={40} height={40} className="rounded-md" />

          <div>
            <h4 className="font-semibold">{authUser?.phone}</h4>
            <p className="text-sm text-slate-500">{authUser?.username}</p>
          </div>
        </Link>

        {/* Setting Dropdown */}
        <div className="relative">
          <button className="cursor-pointer hover:text-gray-500" onClick={() => setIsSettingClick(!isSettingCLick)}>
            <IoMdSettings size={28} />
          </button>

          {isSettingCLick && (
            <div className="bg-gray-600  absolute -left-20 -top-21 w-[120px] text-white py-2 px-3 rounded-md flex flex-col gap-y-1 items-start text-sm tracking-wider">
              <button className="cursor-pointer px-2 py-1 rounded-md hover:bg-gray-200 hover:text-gray-600 w-full text-start">
                Edit Profile
              </button>
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
