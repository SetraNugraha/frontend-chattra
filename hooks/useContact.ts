/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useAuth } from "@/context/AuthContext"
import axiosInstance from "@/lib/axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"

interface IContact {
  id: string
  username: string
  phone: string
  profileImage: string | null
}

export const useContact = () => {
  const { authUser, accessToken } = useAuth()
  const queryClient = useQueryClient()

  const getContacts = async () => {
    try {
      const result = await axiosInstance.get(`/contact/${authUser!.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      const contacts: IContact[] = result.data.data

      return contacts
    } catch (error) {
      console.error("getContact Error: ", error)
      throw error
    }
  }

  const { data, isLoading } = useQuery({
    queryKey: ["contact"],
    queryFn: getContacts,
  })

  const addNewContact = useMutation({
    mutationFn: async (phone: string) => {
      const result = await axiosInstance.post(
        "contact/save",
        { phone: phone },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      return result.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact"] })
    },
    onError: (error) => {
      console.error("Add new contact Error: ", error)
      throw error
    },
  })

  useEffect(() => {
    if (accessToken && authUser) {
      getContacts()
    }
  }, [accessToken, authUser])

  return { data, isLoading, getContacts, addNewContact }
}
