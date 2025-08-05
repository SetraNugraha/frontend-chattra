import { useAuth } from "@/context/AuthContext"
import axiosInstance from "@/lib/axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

interface Message {
  id: string
  senderId: string
  receiverId: string
  body: string
  createdAt: string | Date
  updatedAt: string | Date
}

export const useMessage = (receiverId: string | null | undefined) => {
  const { accessToken } = useAuth()
  const queryClient = useQueryClient()

  // GET - get message
  const { data, isLoading } = useQuery({
    queryKey: ["message", receiverId],
    queryFn: async ({ queryKey }) => {
      const [, receiverId] = queryKey as [string, string]
      const result = await axiosInstance.get(`/message/${receiverId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      const messages: Message[] = result.data.data

      return messages ?? []
    },
  })

  // POST - Send message
  const sendMessage = useMutation({
    mutationKey: ["message", "send", receiverId],
    mutationFn: async ({ receiverId, body }: { receiverId: string | undefined; body: string }) => {
      const result = await axiosInstance.post(
        `/message/send/${receiverId}`,
        { body: body },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      const chatBody: string = result.data.data

      return chatBody
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["message", receiverId] })
    },
    onError: (error) => {
      console.error("Send message error: ", error)
    },
  })

  return { data, isLoading, sendMessage }
}
