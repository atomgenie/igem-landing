import { API_BASE_URL } from "@config/api"

export const getImage = (url: string): string => {
    return process.env.NODE_ENV === "development" ? `${API_BASE_URL}${url}` : url
}
