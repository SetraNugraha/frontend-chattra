/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { ReactNode, useState, useEffect } from "react"

interface IPrivateRoute {
  children: ReactNode
}

export const PrivateRoute = ({ children }: IPrivateRoute) => {
  const { authUser, accessToken, refreshToken } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const checkToken = async () => {
      try {
        await refreshToken()
      } catch (error) {
        console.error("PrivateRoute - checkAuth: ", error)
        alert("Need login first")
        router.replace("/auth/login")
      } finally {
        setIsLoading(false)
      }
    }

    checkToken()
  }, [])

  if (isLoading) {
    return <div className="text-xl font-bold mt-10 text-center w-full">Loading ...</div>
  }

  if (!accessToken || !authUser) {
    return null
  }

  return children
}
