import { Navbar } from "./Navbar"
import { Textarea } from "./ui/textarea"
import { GrSend } from "react-icons/gr"
import { BubbleChat } from "./BubbleChat"
import { messages } from "@/dummy-data/messages"

export default function Message() {
  const senderId: number = 1
  return (
    <div className="relative h-full w-screen bg-gray-600 rounded-tr-xl rounded-br-xl">
      <Navbar />

      {/* Bubble Chat */}
      <div className="max-h-[630px] overflow-y-auto hide-scrollbar p-3">
        {messages.map((message, index) => (
          <BubbleChat key={index} isSenderId={message.senderId === senderId}>
            {message.body}
          </BubbleChat>
        ))}
      </div>

      <div className="absolute  w-[95%] bottom-5 left-1/2 -translate-x-1/2">
        {/* Input Type Message */}
        <div className="relative">
          <Textarea
            placeholder="Type your message here ..."
            className="bg-white resize-none overflow-y-auto max-h-50 pr-22"
          />
          <button className="absolute right-7 top-1/2 -translate-y-1/2 p-2 cursor-pointer rounded-full bg-gray-600 hover:outline-none hover:ring-2 hover:ring-gray-600 hover:bg-white transition-all duration-300 group">
            <GrSend
              size={20}
              className="text-white group-hover:text-gray-600"
            />
          </button>
        </div>
      </div>
    </div>
  )
}
