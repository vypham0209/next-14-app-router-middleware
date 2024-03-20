//RELATIVE MODULES
import { loginUrlRedirectObjMap } from './constants'

export const getLoginRedirectUrl = (pathname: string): string => {
  const replaceUrl = loginUrlRedirectObjMap[pathname]
  return `/auth${pathname !== '/' ? `?redirect=${replaceUrl || pathname}` : ''}`
}
