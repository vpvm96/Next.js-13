"use client"

import { Message } from "@/type"
import { FormEvent, useState } from "react"
import { v4 as uuid } from "uuid"
import useSWR from "swr"
import fetcher from "@/utils/fetchMessages"

export default function ChatInput() {
  const [input, setInput] = useState("")
  const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher)

  const handleMessageSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!input) return

    const messageToSend = input

    setInput("")

    const id = uuid()

    const message: Message = {
      id,
      message: messageToSend,
      createdAt: Date.now(),
      username: "leo",
      profilePic: "https://avatars.githubusercontent.com/u/11247099?v=4",
      email: "vpvm96@naver.com",
    }

    const handleUplodatMessage = async () => {
      const data = await fetch("/api/addMessage", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ message }),
      }).then((res) => res.json())

      return [data.message, ...messages!]
    }

    await mutate(handleUplodatMessage, {
      optimisticData: [message, ...messages!],
      rollbackOnError: true,
    })
  }

  return (
    <form
      onSubmit={handleMessageSubmit}
      className="fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-t bg-white border-gray-100"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter Message Here..."
        className="
        flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 
        focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed
        "
      />
      <button
        type="submit"
        disabled={!input}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Send
      </button>
    </form>
  )
}
