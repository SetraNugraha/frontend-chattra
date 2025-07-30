interface BubbleChatProps {
  children: React.ReactNode
  isSenderId: boolean
}

export const BubbleChat = ({ children, isSenderId }: BubbleChatProps) => {
  return (
    <div
      className={`h-full flex flex-col ${
        isSenderId ? "items-end" : "items-start"
      } justify-end gap-y-2 p-2`}
    >
      <p
        className={`px-5 py-1.5 ${
          isSenderId ? "bg-blue-600 text-white" : "bg-white"
        }  rounded-lg inline `}
      >
        {children}
      </p>
    </div>
  )
}
