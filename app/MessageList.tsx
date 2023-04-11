"use client"

import useSWR from "swr"
import fetcher from "@/utils/fetchMessages"
import { Message } from "@/typings"
import MessageComponent from "./MessageComponent"
import { useEffect } from "react"
import { clientPusher } from "@/pusher"

type Props = {
  intialMessages: Message[]
}

export default function MessageList({ intialMessages }: Props) {
  const {
    data: messages,
    error,
    mutate,
  } = useSWR<Message[]>("/api/getMessages", fetcher)

  useEffect(() => {
    const channel = clientPusher.subscribe("messages")

    channel.bind("new-message", async (data: Message) => {
      if (messages?.find((message) => message.id === data.id)) return

      if (!messages) {
        mutate(fetcher)
      } else {
        mutate(fetcher, {
          optimisticData: [data, ...messages!],
          rollbackOnError: true,
        })
      }
    })

    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [mutate, messages])

  return (
    <div className="space-y-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
      {(messages || intialMessages).map((message) => (
        <MessageComponent key={message.id} message={message} />
      ))}
    </div>
  )
}
