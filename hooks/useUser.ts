import axiosInstance from "@/lib/axios"

interface IAuthUser {
  id: string
  username: string
  phone: string
  profileImage: string | null
  token: string | null
}

interface IUseUser {
  findUserById: (userId: string) => Promise<IAuthUser>
}

export const useUser = (): IUseUser => {
  const findUserById = async (userId: string) => {
    try {
      const result = await axiosInstance.get(`/user/${userId}`)
      return result.data.data
    } catch (error) {
      console.error("findUserById Error: ", error)
      throw error
    }
  }

  return { findUserById }
}
