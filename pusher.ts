import Pusher from "pusher"
import ClientPusher from "pusher-js"

export const serverPusher = new Pusher({
  appId: "1581287",
  key: "8d0d25ad7838d1137035",
  secret: "384e2038baf6e3969c90",
  cluster: "ap3",
  useTLS: true,
})

export const clientPusher = new ClientPusher("8d0d25ad7838d1137035", {
  cluster: "ap3",
  forceTLS: true,
})
