import { GetStaticProps } from "next"
import { API_BASE_URL } from "@config/api"
import { getImage } from "@helpers/image"
import { HomeAPI } from "@igem-types/home"
import axios from "axios"

import { Navigation } from "@components/navigation"
import { NavigationAPI } from "@igem-types/navigation"
import { useNavigation } from "@helpers/navigation"
import { Footer } from "@components/footer"
import { useRouter } from "next/router"
import Link from "next/link"
import { PageAPI } from "@igem-types/page"
import moment from "moment"
import { TwitterTimelineEmbed } from "react-twitter-embed"
import Head from "next/head"

interface props {
    home: HomeAPI
    navigation: NavigationAPI
    articles: PageAPI[]
}

const Home: React.FC<props> = ({ home, navigation, articles }) => {
    const { locale } = useRouter()

    return (
        <div className="flex flex-col min-h-screen">
            <Head>
                <title>iGEM IONIS Paris</title>
            </Head>
            <Navigation navigation={navigation} />
            <div className="container mx-auto px-4">
                <div className="flex flex-col">
                    <div className="flex flex-wrap gap-4 mt-8 overflow-hidden">
                        {home.pages.map(page => (
                            <Link key={page.id} href={`/page/${page.id}`}>
                                <div
                                    style={{
                                        minWidth: 300,
                                    }}
                                    className="rounded-lg overflow-hidden cursor-pointer flex-1 relative h-56 viewArticles"
                                >
                                    <div
                                        style={{
                                            backgroundImage: `url(${getImage(
                                                page.picture,
                                                "small",
                                            )})`,
                                        }}
                                        className="bg-center bg-cover absolute top-0 left-0 h-full w-full viewArticlesImage"
                                    ></div>
                                    <div
                                        className="text-white flex items-end justify-start text-center p-4 absolute top-0 left-0 z-10 w-full h-full"
                                        style={{
                                            background:
                                                "linear-gradient(to top, rgba(0,0,0,0.5), transparent)",
                                        }}
                                    >
                                        <div className="flex flex-col items-start">
                                            <div className="uppercase text-xs border border-white border-opacity-20 text-white text-opacity-70 mb-1 bg-black bg-opacity-50 px-2 py-1 rounded font-bold">
                                                {locale === "fr"
                                                    ? page.category_fr
                                                    : page.category_en}
                                            </div>
                                            <div className="text-xl font-bold">
                                                {locale === "fr"
                                                    ? page.title_fr
                                                    : page.title_en}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 mt-8 flex-grow">
                <div className="container mx-auto px-4 my-8">
                    <h2 className="text-2xl font-bold mb-2">
                        {locale === "fr" ? "Derniers articles" : "Latest articles"}
                    </h2>
                    <div className="flex flex-wrap gap-4 items-stretch">
                        {articles.map(article => (
                            <Link href={`/page/${article.id}`} key={article.id}>
                                <a className="sm:flex-grow-0 flex-grow latestArticle">
                                    <div
                                        style={{ minWidth: 278 }}
                                        className="bg-white rounded-lg shadow-sm border border-gray-100 flex-1 flex flex-col overflow-hidden h-full"
                                    >
                                        <div className="h-36 relative overflow-hidden">
                                            <div
                                                className="absolute top-0 left-0 h-full w-full bg-center bg-cover latestArticleImage"
                                                style={{
                                                    backgroundImage: `url(${getImage(
                                                        article.picture,
                                                        "small",
                                                    )})`,
                                                }}
                                            ></div>
                                        </div>
                                        <div className="flex-grow flex flex-col items-start my-4">
                                            <div className="mx-4 uppercase text-xs font-bold bg-black bg-opacity-10 px-2 py-1 rounded">
                                                {locale === "fr"
                                                    ? article.category_fr
                                                    : article.category_en}
                                            </div>
                                            <div className="font-bold mt-2 mx-4">
                                                {locale === "fr"
                                                    ? article.title_fr
                                                    : article.title_en}
                                            </div>
                                            <div className="text-xs text-black text-opacity-30 px-4">
                                                {moment(article.createdAt).format(
                                                    "DD/MM/YYYY",
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold">
                    {locale === "fr" ? "Réseaux" : "Socials"}
                </h2>
                <div className="flex mt-2 flex-wrap gap-4">
                    <div className="">
                        <iframe
                            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fionisigem&tabs=timeline&width=340&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=249643311490"
                            width="340"
                            height="500"
                            // style="border:none;overflow:hidden"
                            scrolling="no"
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        ></iframe>
                    </div>
                    <div
                        style={{ height: 500, width: 340 }}
                        className="overflow-y-auto border rounded-lg"
                    >
                        <TwitterTimelineEmbed
                            sourceType="profile"
                            screenName="iGEM_IONIS"
                            options={{ height: 500 }}
                        />
                    </div>
                </div>
            </div>
            <Footer />
            <style jsx>{`
                .viewArticlesImage,
                .latestArticleImage {
                    transform: scale(1);
                    transition: transform 0.3s;
                }

                .viewArticles:hover .viewArticlesImage,
                .latestArticle:hover .latestArticleImage {
                    transform: scale(1.2);
                }
            `}</style>
        </div>
    )
}

export const getStaticProps: GetStaticProps<props> = async () => {
    const homeResPromise = axios.get<HomeAPI>(`${API_BASE_URL}/home`)
    const articlesPromise = axios.get<PageAPI[]>(
        `${API_BASE_URL}/pages?public_eq=true&_sort=createdAt:desc&_limit=9`,
    )
    const navigationPromise = useNavigation()

    return {
        props: {
            home: (await homeResPromise).data,
            navigation: await navigationPromise,
            articles: (await articlesPromise).data,
        },
        revalidate: 10,
    }
}

export default Home
