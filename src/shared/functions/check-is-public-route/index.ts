import { APP_ROUTES } from "@/shared/constants/app-routes"

export const checkIsPublicRoute = (asPath: string) => {
    const publicRoutes = Object.values(APP_ROUTES.public)
    return publicRoutes.includes(asPath)
}