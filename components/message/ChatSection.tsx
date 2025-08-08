"use client"

import { GrSend } from "react-icons/gr"
// import { messages } from "@/dummy-data/messages"
import { Header } from "./Header"
import { BubbleChat } from "./BubbleChat"
import { Textarea } from "../ui/textarea"
import { FormEvent, useEffect, useRef, useState } from "react"
import { useMessage } from "@/hooks/useMessage"
import { useAuth } from "@/context/AuthContext"
import { useSocket } from "@/hooks/useSocket"

interface ISelectedContact {
  id: string
  phone: string
  username: string
}

interface IChatSection {
  selectedContact: ISelectedContact | null
}

interface Message {
  id: string
  senderId: string
  receiverId: string
  body: string
  createdAt: string | Date
  updatedAt: string | Date
}

export default function ChatSection({ selectedContact }: IChatSection) {
  const { authUser } = useAuth()
  const senderId: string = authUser!.id
  const { data: messages, isLoading: messagesLoading, sendMessage } = useMessage(selectedContact?.id)
  const [bodyChat, setBodyChat] = useState<string>("")
  const bottomMessageRef = useRef<HTMLDivElement>(null)
  const [localMessages, setLocalMessages] = useState(messages || [])

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const payload = {
      receiverId: selectedContact?.id,
      body: bodyChat,
    }

    sendMessage.mutate(payload, {
      onSuccess: () => {
        setBodyChat("")
      },
      onError: (error) => {
        console.error("handle send message error: ", error)
      },
    })
  }

  useSocket(authUser?.id, (data: Message) => {
    try {
      setLocalMessages((prev) => [...prev, data])
    } catch (error) {
      console.error("Invalid socket message format: ", error)
    }
  })

  useEffect(() => {
    if (messages) {
      setLocalMessages(messages)
    }
  }, [messages])

  useEffect(() => {
    bottomMessageRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [localMessages])

  return (
    <div className="relative h-full w-1/2 bg-gray-600 rounded-tr-xl rounded-br-xl">
      <Header hidden={!selectedContact} username={selectedContact?.username || " "} />

      {/* Bubble Chat */}
      <div className="max-h-[610px]  overflow-y-auto hide-scrollbar p-3">
        {selectedContact === null ? (
          <h1 className="text-white font-semibold text-center text-2xl mt-10">Lets message to each other !</h1>
        ) : messagesLoading ? (
          <h1 className="text-white font-semibold text-center text-2xl mt-10">Loading Messages ...</h1>
        ) : messages === null || messages?.length === 0 ? (
          <h1 className="text-white font-semibold text-center text-2xl mt-10">Lets message to each other !</h1>
        ) : (
          <>
            {localMessages?.map((message, index) => (
              <BubbleChat key={index} isSenderId={message.senderId === senderId}>
                {message.body}
              </BubbleChat>
            ))}
            <div ref={bottomMessageRef} />
          </>
        )}
      </div>

      {/* Input Message */}
      <div hidden={!selectedContact} className="absolute w-[95%] bottom-5 left-1/2 -translate-x-1/2">
        <form className="relative" onSubmit={handleSendMessage}>
          <Textarea
            placeholder="Type your message here ..."
            className="bg-white resize-none overflow-y-auto max-h-50 pr-22"
            value={bodyChat}
            maxLength={500}
            onChange={(e) => setBodyChat(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-7 top-1/2 -translate-y-1/2 p-2 cursor-pointer rounded-full bg-gray-600 hover:outline-none hover:ring-2 hover:ring-gray-600 hover:bg-white transition-all duration-300 group"
          >
            <GrSend size={20} className="text-white group-hover:text-gray-600" />
          </button>
        </form>
      </div>
    </div>
  )
}
