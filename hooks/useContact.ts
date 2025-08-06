"use client"

import { useAuth } from "@/context/AuthContext"
import axiosInstance from "@/lib/axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

interface IContact {
  id: string
  username: string
  phone: string
  profileImage: string | null
}

export const useContact = () => {
  const { authUser, accessToken } = useAuth()
  const queryClient = useQueryClient()

  // GET Contact
  const { data, isLoading } = useQuery({
    queryKey: ["contact"],
    queryFn: async () => {
      const result = await axiosInstance.get(`/contact/${authUser!.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      const contacts: IContact[] = result.data.data

      return contacts
    },
  })

  // POST Add new contact
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
      console.log("Add new contact Error: ", error)
    },
  })

  return { data, isLoading, addNewContact }
}
