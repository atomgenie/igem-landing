import { NavigationAPI } from "@igem-types/navigation"
import { useRouter } from "next/router"
import { FiMenu, FiX } from "react-icons/fi"
import Link from "next/link"
import { useState } from "react"
import React from "react"
import { NavigationItem } from "./NavigationItem"

interface props {
    navigation: NavigationAPI
}

export const Navigation: React.FC<props> = ({ navigation }) => {
    const { locale } = useRouter()

    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <div>
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-2 mt-2 text-gray-400">
                    <Link locale="fr" href="/fr">
                        <a>FR</a>
                    </Link>
                    <Link locale="en" href="/en">
                        <a>EN</a>
                    </Link>
                    <div className="flex-grow"></div>
                    <div>F</div>
                    <div>I</div>
                    <div>T</div>
                </div>
                <Link href="/">
                    <div className="flex flex-col items-center cursor-pointer">
                        <div>
                            <img
                                src="/images/Logo.png"
                                alt="iGEM IONIS Paris"
                                className="max-h-14 mt-4 object-contain"
                            />
                        </div>
                        <div className="text-center text-gray-600 mt-2">
                            {locale === "fr"
                                ? "EQUIPE IGEM IONIS 2021"
                                : "2021 IGEM IONIS TEAM"}
                        </div>
                    </div>
                </Link>
                <div className="hidden md:flex gap-4 py-3 mt-4 text-gray-500 bg-gray-100 rounded px-4">
                    <Link href="/">
                        <a>{locale === "fr" ? "Accueil" : "Home"}</a>
                    </Link>
                    {navigation.navigations.map(item => (
                        <NavigationItem item={item} key={item.id} />
                    ))}
                </div>
            </div>
            <div
                className="fixed md:hidden bottom-4 right-4 bg-black text-white shadow h-14 w-14 flex items-center justify-center rounded-full z-20"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? <FiX /> : <FiMenu />}
            </div>
            {menuOpen && (
                <div className="fixed flex items-stretch md:hidden h-full w-full z-40 top-0 left-0">
                    <div className="max-h-full overflow-y-auto w-3/4 bg-white h-full py-6 px-4 flex flex-col gap-1 font-bold text-gray-600">
                        <Link href="/">
                            <a>
                                <img
                                    src="/images/Logo.png"
                                    alt="iGEM IONIS Paris"
                                    className="max-h-10 object-contain self-start mb-4"
                                />
                                <div>{locale === "fr" ? "Accueil" : "Home"}</div>
                            </a>
                        </Link>
                        {navigation.navigations.map(nav => (
                            <React.Fragment key={nav.id}>
                                {nav.pages.length === 1 ? (
                                    <Link href={`/page/${nav.pages[0].id}`}>
                                        <a className="cursor-pointer">
                                            {locale === "fr"
                                                ? nav.title_fr
                                                : nav.title_en}
                                        </a>
                                    </Link>
                                ) : (
                                    <>
                                        <div className="mb-2">
                                            {locale === "fr"
                                                ? nav.title_fr
                                                : nav.title_en}
                                        </div>
                                        {nav.pages.map(page => (
                                            <Link key={page.id} href={`/page/${page.id}`}>
                                                <div className="mx-1 text-sm cursor-pointer">
                                                    {locale === "fr"
                                                        ? page.title_fr
                                                        : page.title_en}
                                                </div>
                                            </Link>
                                        ))}
                                        <div className="mb-2"></div>
                                    </>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                    <div
                        className="flex-grow"
                        style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
                        onClick={() => setMenuOpen(false)}
                    ></div>
                </div>
            )}
        </div>
    )
}
