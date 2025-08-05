import axiosInstance from "@/lib/axios"

interface IAuthUser {
  id: string
  username: string
  phone: string
  profileImage: string | null
  token: string | null
}

export const useUser = () => {
  const findUserById = async (userId: string) => {
    try {
      const result = await axiosInstance.get(`/user/${userId}`)
      const user: IAuthUser = result.data.data
      return user
    } catch (error) {
      console.error("findUserById Error: ", error)
      throw error
    }
  }

  return { findUserById }
}
