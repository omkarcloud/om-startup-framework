import BackendAxios from "./backend"
import FrontendAxios from "./frontend"

const AxiosInstance =
  typeof window === "undefined" ? BackendAxios : FrontendAxios

export default AxiosInstance