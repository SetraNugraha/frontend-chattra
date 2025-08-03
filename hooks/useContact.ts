/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useAuth } from "@/context/AuthContext"
import axiosInstance from "@/lib/axios"
import { useEffect, useState } from "react"

interface ISavedContacts {
  id: string
  username: string
  phone: string
  profileImage: string | null
}

export const useContact = () => {
  const { authUser, accessToken } = useAuth()
  const [savedContacts, setSavedContacts] = useState<ISavedContacts[]>([])

  const getContacts = async () => {
    try {
      const result = await axiosInstance.get(`/contact/${authUser!.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      setSavedContacts(result.data.data)
    } catch (error) {
      console.error("getContact Error: ", error)
      throw error
    }
  }

  useEffect(() => {
    if (accessToken && authUser) {
      getContacts()
    }
  }, [accessToken, authUser])

  return { savedContacts }
}
