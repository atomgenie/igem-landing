import { PageAPI } from "./page"

export interface HomeAPI {
    pages: PageAPI[]
    published_at: string
    createdAt: string
    updatedAt: string
    id: string
}
