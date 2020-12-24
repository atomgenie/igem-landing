import { Navigation } from "@components/navigation"
import { useNavigation } from "@helpers/navigation"
import { NavigationAPI } from "@igem-types/navigation"
import { PageAPI } from "@igem-types/page"
import { GetStaticProps, GetStaticPaths } from "next"
import { useRouter } from "next/router"
import axios from "axios"
import { API_BASE_URL } from "@config/api"

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
            <div>{page.title_fr}</div>
            <div>{page.text_fr}</div>
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
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        fallback: true,
        paths: [],
    }
}

export default Page
