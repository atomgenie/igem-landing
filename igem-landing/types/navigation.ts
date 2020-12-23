import { PageAPI } from "./page"

export interface NavigationAPI {
    navigations: {
        pages: PageAPI[]
        title_en: string
        title_fr: string
        published_at: string
        createdAt: string
        updatedAt: string
        id: string
    }[]
    published_at: string
    createdAt: string
    updatedAt: string
    id: string
}
