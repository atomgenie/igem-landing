import { GetStaticProps } from "next"
import { API_BASE_URL } from "@config/api"
import { getImage } from "@helpers/image"
import { HomeAPI } from "@igem-types/home"
import axios from "axios"

import { Navigation } from "@components/navigation"
import { NavigationAPI } from "@igem-types/navigation"
import { useNavigation } from "@helpers/navigation"
import { useRouter } from "next/router"

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
                    <div className="flex flex-col gap-4 mt-4">
                        {home.pages.map(page => (
                            <div
                                key={page.id}
                                style={{
                                    backgroundImage: `url(${getImage(page.picture.url)})`,
                                }}
                                className="bg-center bg-cover"
                            >
                                <div
                                    className="text-white h-56 flex items-center justify-center text-center font-bold p-4"
                                    style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
                                >
                                    <div className="py-1 border-2 border-white px-4">
                                        {locale === "fr" ? page.title_fr : page.title_en}
                                    </div>
                                </div>
                            </div>
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
