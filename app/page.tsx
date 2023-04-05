import { Inter } from "next/font/google"
import MessageList from "./MessageList"
import ChatInput from "./ChatInput"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  return (
    <main>
      <MessageList />
      <ChatInput />
    </main>
  )
}
