import Error from "next/error"
import Messages from "../../utils/messages"

export default function Deleted() {
  return (
    <Error statusCode={0} title={Messages.DELETED} />
  )
}
