import { ImageAPI } from "./image"

export interface PageAPI {
    title_en: string
    title_fr: string
    text_en: string
    text_fr: string
    category_en: string
    category_fr: string
    published_at: string
    createdAt: string
    updatedAt: string
    picture: ImageAPI
    id: string
    author: string
}
