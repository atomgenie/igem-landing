import { Navigation } from "@components/navigation"
import { useNavigation } from "@helpers/navigation"
import { NavigationAPI } from "@igem-types/navigation"
import { PageAPI } from "@igem-types/page"
import { GetStaticProps, GetStaticPaths } from "next"
import { useRouter } from "next/router"
import axios from "axios"
import { API_BASE_URL } from "@config/api"
import Markdown from "react-markdown"
import { HomeAPI } from "@igem-types/home"

interface props {
    navigation: NavigationAPI
    page: PageAPI
}

const Page: React.FC<props> = ({ navigation, page }) => {
    const { isFallback } = useRouter()

    if (isFallback) {
        return <div>Loading</div>
    }

    return (
        <div>
            <Navigation navigation={navigation} />
            <div className="container px-4 mx-auto">
                <div>{page.title_fr}</div>
                <div>
                    <Markdown allowDangerousHtml>{page.text_fr}</Markdown>
                </div>
            </div>
        </div>
    )
}

export const getStaticProps: GetStaticProps<props> = async ctx => {
    const navigationPromise = useNavigation()
    const page = axios.get<PageAPI>(`${API_BASE_URL}/pages/${ctx.params.id}`)

    return {
        props: {
            navigation: await navigationPromise,
            page: (await page).data,
        },
        revalidate: 10,
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const navsPromise = axios.get<NavigationAPI>(`${API_BASE_URL}/menu`)
    const homePromise = axios.get<HomeAPI>(`${API_BASE_URL}/home`)

    const navs = (await navsPromise).data
    const home = (await homePromise).data

    const navsIds = navs.navigations
        .map(nav => {
            return nav.pages.map(page => page.id)
        })
        .reduce((prev, curr) => [...prev, ...curr], [])

    const homeIds = home.pages.map(page => page.id)

    const allIds = [...navsIds, ...homeIds]

    return {
        fallback: true,
        paths: allIds.map(id => ({
            params: {
                id: id,
            },
        })),
    }
}

export default Page
