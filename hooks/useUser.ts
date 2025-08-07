/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from "@/lib/axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useAuth } from "@/context/AuthContext"

export const useUser = (userId: string | undefined) => {
  const { accessToken } = useAuth()
  const queryClient = useQueryClient()

  const findUserById = async (userId: string) => {
    try {
      const result = await axiosInstance.get(`/user/${userId}`)
      return result.data.data
    } catch (error) {
      console.error("Error find user by id: ", error)
    }
  }

  const { data, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: async ({ queryKey }) => {
      const [_key, userId] = queryKey

      const endpoint = userId ? `/user/${userId}` : "user/all"

      const result = await axiosInstance.get(endpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      const user = result.data.data
      return user
    },
    enabled: !!userId,
  })

  const updateProfileImage = useMutation({
    mutationKey: ["user", userId],
    mutationFn: async (fileImage: File | null) => {
      const formData = new FormData()
      if (fileImage) {
        formData.append("file", fileImage)
      }

      const result = await axiosInstance.patch(`/user/update-profile-image/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      return result.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", userId] })
    },
    onError: (error) => {
      console.error("update profile image error: ", error)
    },
  })

  return { findUserById, data, isLoading, updateProfileImage }
}
