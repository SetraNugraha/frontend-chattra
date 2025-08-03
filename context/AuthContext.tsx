/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useState, useEffect, useContext, createContext, ReactNode } from "react"
import axiosInstance from "@/lib/axios"
import { jwtDecode } from "jwt-decode"
import { useUser } from "@/hooks/useUser"

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
  authUser: IAuthUser | null
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
  const [authUser, setAuthUser] = useState<IAuthUser | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

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
      console.log("context login error: ", error)
      throw error
    } finally {
      setIsLoading(false)
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

  return <AuthContext.Provider value={{ login, register, logout, authUser }}>{children}</AuthContext.Provider>
}
