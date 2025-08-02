/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useState, useEffect, useContext, createContext, ReactNode } from "react"
import axiosInstance from "@/lib/axios"

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
  const [authUser, setAuthUser] = useState<IAuthUser | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const login = async (phone: string) => {
    try {
      const result = await axiosInstance.post("/auth/login", { phone })
      return result.data
    } catch (error) {
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

  return <AuthContext.Provider value={{ login, register, logout }}>{children}</AuthContext.Provider>
}
