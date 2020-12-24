import { GetStaticProps } from "next"
import { API_BASE_URL } from "@config/api"
import { getImage } from "@helpers/image"
import { HomeAPI } from "@igem-types/home"
import axios from "axios"

import { Navigation } from "@components/navigation"
import { NavigationAPI } from "@igem-types/navigation"
import { useNavigation } from "@helpers/navigation"
import { useRouter } from "next/router"
import Link from "next/link"

interface props {
    home: HomeAPI
    navigation: NavigationAPI
}

const Home: React.FC<props> = ({ home, navigation }) => {
    const { locale } = useRouter()

    return (
        <div>
            <Navigation navigation={navigation} />
            <div className="container mx-auto px-4">
                <div className="flex flex-col">
                    <div className="flex flex-wrap gap-4 mt-4">
                        {home.pages.map(page => (
                            <Link key={page.id} href={`/page/${page.id}`}>
                                <div
                                    style={{
                                        backgroundImage: `url(${getImage(
                                            page.picture.url,
                                        )})`,
                                        minWidth: 400,
                                    }}
                                    className="bg-center bg-cover flex-grow rounded-lg overflow-hidden cursor-pointer"
                                >
                                    <div
                                        className="text-white h-56 flex items-end justify-start text-center font-bold p-4"
                                        style={{
                                            background:
                                                "linear-gradient(to top, rgba(0,0,0,0.5), transparent)",
                                        }}
                                    >
                                        <div className="">
                                            {locale === "fr"
                                                ? page.title_fr
                                                : page.title_en}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getStaticProps: GetStaticProps<props> = async () => {
    const homeResPromise = axios.get<HomeAPI>(`${API_BASE_URL}/home`)
    const navigationPromise = useNavigation()

    return {
        props: {
            home: (await homeResPromise).data,
            navigation: await navigationPromise,
        },
        revalidate: 10,
    }
}

export default Home
