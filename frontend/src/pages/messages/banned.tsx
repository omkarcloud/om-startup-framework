import Error from "next/error"
import Messages from "../../utils/messages"

export default function Banned() {
  return (
    <Error statusCode={0} title={Messages.BANNED} />
  )
}
