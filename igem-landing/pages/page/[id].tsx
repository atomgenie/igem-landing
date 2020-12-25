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
import { renderers } from "@components/markdown/render"
import { getImage } from "@helpers/image"
import { FiLoader } from "react-icons/fi"

interface props {
    navigation: NavigationAPI
    page: PageAPI
}

const Page: React.FC<props> = ({ navigation, page }) => {
    const { isFallback, locale } = useRouter()

    if (isFallback) {
        return (
            <div className="h-screen flex items-center justify-center">
                <FiLoader />
                <div className="ml-2">
                    {locale === "fr" ? "Chargement..." : "Loading..."}
                </div>
            </div>
        )
    }

    return (
        <div>
            <Navigation navigation={navigation} />
            <div className="container px-4 mx-auto">
                <div>
                    <h1 className="mt-8 text-4xl font-bold text-center">
                        {locale === "fr" ? page.title_fr : page.title_en}
                    </h1>
                </div>
                <img
                    className="w-full rounded-lg mt-4 object-cover"
                    src={getImage(page.picture, "large")}
                    style={{
                        maxHeight: "50vh",
                    }}
                />
                <div className="mt-8">
                    <Markdown allowDangerousHtml renderers={renderers}>
                        {locale === "fr" ? page.text_fr : page.text_en}
                    </Markdown>
                </div>
            </div>
        </div>
    )
}

export const getStaticProps: GetStaticProps<props> = async ctx => {
    const navigationPromise = useNavigation()

    let page

    try {
        page = (await axios.get<PageAPI>(`${API_BASE_URL}/pages/${ctx.params.id}`)).data
    } catch {
        return {
            notFound: true,
            revalidate: 10,
        }
    }

    return {
        props: {
            navigation: await navigationPromise,
            page: page,
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
