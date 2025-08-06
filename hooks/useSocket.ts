/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect } from "react"
import { io } from "socket.io-client"

let socket: ReturnType<typeof io> | null = null

export const useSocket = (userId: string | undefined, onNewMessage: (message: any) => void) => {
  useEffect(() => {
    if (!userId) return

    socket = io("http://localhost:8000", { transports: ["websocket"] })
    socket.emit("joinRoom", userId)
    socket.on("newMessage", onNewMessage)

    return () => {
      socket?.off("newMessage", onNewMessage)
      socket?.disconnect()
    }
  }, [userId])
}
