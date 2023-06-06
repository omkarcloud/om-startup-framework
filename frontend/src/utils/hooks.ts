import FrontendAxios from "./axios/frontend"
import useAxios from "./axios/use-axios"
import { Project } from "./backend/types"

export function useProject(id: string, isSimple: boolean) {
  const res = useAxios<Project>(() =>
    FrontendAxios.get(`/projects/${id}/${isSimple ? "?simple" : ""}`, {
      silent: true,
      redirectToSignInOn404: true,
    } as  any)
  )
  return { project: res.data }
}
