import { API_BASE_URL } from "@config/api"
import { ImageAPI } from "@igem-types/image"

const prefs = ["thumbnail", "small", "medium", "large", "original"] as const
type prefsEnum = typeof prefs[number]

export const getImage = (image: ImageAPI, pref: prefsEnum = "original"): string => {
    let isAfter = false
    let rawUrl: string | undefined

    for (let prefItem of prefs) {
        if (prefItem === pref || isAfter) {
            isAfter = true

            if (prefItem === "original") {
                rawUrl = image.url
                break
            }

            if (image.formats[prefItem]) {
                rawUrl = image.formats[prefItem].url
                break
            }
        }
    }

    if (!rawUrl) {
        rawUrl = image.url
    }

    return process.env.NODE_ENV === "development" ? `${API_BASE_URL}${rawUrl}` : rawUrl
}
