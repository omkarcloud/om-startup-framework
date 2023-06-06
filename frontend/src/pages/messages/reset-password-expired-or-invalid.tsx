import Error from "next/error"
import Messages from "../../utils/messages"

export default function Page() {
  return (
    <Error
      statusCode={0}
      title={Messages.AUTH.RESET_PASSWORD_EXPIRED_OR_INVALID}
    />
  )
}
