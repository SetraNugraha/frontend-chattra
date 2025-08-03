/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState, useEffect, useContext, createContext, ReactNode } from "react"
import axiosInstance from "@/lib/axios"
import { jwtDecode } from "jwt-decode"
import { useUser } from "@/hooks/useUser"
import { useRouter } from "next/navigation"

interface IRegister {
  phone: string
  username: string
}

interface IAuthUser {
  id: string
  username: string
  phone: string
  profileImage: string | null
  token: string | null
}

interface IAuthContext {
  login: (phone: string) => Promise<{ success: boolean; message: string; data: any }>
  register: (payload: IRegister) => Promise<{ success: boolean; message: string; data: any }>
  logout: () => Promise<{ success: string; message: string }>
  refreshToken: () => Promise<{ success: string; message: string; data: { accessToken: string } }>
  authUser: IAuthUser | null | undefined
  accessToken: string | null | undefined
}

const AuthContext = createContext<IAuthContext | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { findUserById } = useUser()
  const router = useRouter()
  const [authUser, setAuthUser] = useState<IAuthUser | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)

  const login = async (phone: string) => {
    try {
      const result = await axiosInstance.post("/auth/login", { phone })
      const { accessToken } = result.data.data
      setAccessToken(accessToken)
      const decode = jwtDecode<{ sub: string; phone: string }>(accessToken)
      const userData = await findUserById(decode.sub)
      setAuthUser(userData)
      return result.data
    } catch (error) {
      console.error("context login error: ", error)
      setAccessToken(null)
      setAuthUser(null)
      throw error
    }
  }

  const register = async (payload: IRegister) => {
    try {
      const result = await axiosInstance.post("/auth/register", payload)
      return result.data
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    try {
      const result = await axiosInstance.delete("/auth/logout")
      return result.data
    } catch (error) {
      throw error
    }
  }

  const refreshToken = async () => {
    try {
      const result = await axiosInstance.post("/auth/refresh-token", {})
      const { accessToken } = result.data.data
      setAccessToken(accessToken)
      const decode = jwtDecode<{ sub: string; phone: string }>(accessToken)
      const userData = await findUserById(decode.sub)
      setAuthUser(userData)
      return result.data
    } catch (error) {
      console.error("refreshToken Error: ", error)
      setAccessToken(null)
      setAuthUser(null)
      throw new Error("Unauthorized or expired token")
    }
  }

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true
          try {
            const result = await axiosInstance.get("/auth/refresh-token")
            const newAccessToken = result.data.data.accessToken
            setAccessToken(newAccessToken)
            originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`

            return axiosInstance(originalRequest)
          } catch (err) {
            setAuthUser(null)
            setAccessToken(null)
            router.replace("auth/login")
            return Promise.reject(err)
          }
        }

        return Promise.reject(error)
      }
    )

    return () => {
      axiosInstance.interceptors.response.eject(interceptor)
    }
  }, [setAccessToken, setAuthUser, router])

  return (
    <AuthContext.Provider value={{ login, register, logout, refreshToken, authUser, accessToken }}>
      {children}
    </AuthContext.Provider>
  )
}
