import { NavigationAPI } from "@igem-types/navigation"
import { useRouter } from "next/router"
import Link from "next/link"

interface props {
    navigation: NavigationAPI
}

export const Navigation: React.FC<props> = ({ navigation }) => {
    const { locale } = useRouter()

    return (
        <div>
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-2 mt-2 text-gray-400">
                    <Link locale="fr" href=".">
                        FR
                    </Link>
                    <Link locale="en" href=".">
                        EN
                    </Link>
                    <div className="flex-grow"></div>
                    <div>F</div>
                    <div>I</div>
                    <div>T</div>
                </div>
                <div className="flex flex-col items-center">
                    <div>
                        <img
                            src="/images/Logo.png"
                            alt="iGEM IONIS Paris"
                            className="max-h-14 mt-4"
                        />
                    </div>
                    <div className="text-center text-gray-600 mt-2">
                        {locale === "fr"
                            ? "EQUIPE IGEM IONIS 2021"
                            : "2021 IGEM IONIS TEAM"}
                    </div>
                </div>
            </div>
            <div className="border-t border-b mt-4">
                <div className="container mx-auto px-4 flex gap-2 py-3 text-gray-500">
                    {navigation.navigations.map(item => (
                        <div key={item.id}>
                            {locale === "fr" ? item.title_fr : item.title_en}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
