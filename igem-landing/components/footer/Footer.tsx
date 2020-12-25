import { useRouter } from "next/router"

interface props {}

export const Footer: React.FC<props> = () => {
    const { locale } = useRouter()

    return (
        <div className="bg-gray-100">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-wrap gap-4">
                    <div className="flex flex-col flex-1" style={{ minWidth: 250 }}>
                        <div className="uppercase font-bold text-md">
                            {locale === "fr" ? "Qui sommes nous ?" : "Who are we?"}
                        </div>
                        <div className="text-sm text-gray-400 mt-1">
                            {locale === "fr" ? (
                                <>
                                    Nous sommes une équipe d’étudiants motivés des écoles
                                    Sup’Biotech et ESME Sudria participant à l’édition
                                    2020 du concours iGEM.
                                </>
                            ) : (
                                <>
                                    We are a motivated team of students from Sup’Biotech,
                                    IPSA, EPITA et ESME Sudria, french engineering schools
                                    part of the IONIS group, running for iGEM 2019
                                    edition.
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col flex-1" style={{ minWidth: 250 }}>
                        <div className="uppercase font-bold text-md">
                            {locale === "fr" ? "Liens utiles" : "Usefull links"}
                        </div>
                        <div className="text-sm text-gray-400 mt-1 flex flex-col">
                            <a>iGEM</a>
                            <a>Sup’Biotech</a>
                            <a>IPSA</a>
                            <a>EPITA</a>
                            <a>ESME Sudria</a>
                        </div>
                    </div>
                    <div className="flex flex-col flex-1" style={{ minWidth: 250 }}>
                        <div className="uppercase font-bold text-md">
                            {locale === "fr"
                                ? "Equipes IONIS aux éditions précédentes"
                                : "IONIS teams on previous editions"}
                        </div>
                        <div className="text-sm text-gray-400 mt-1 flex flex-col">
                            <a>iGEM IONIS 2020</a>
                            <a>iGEM IONIS 2019</a>
                            <a>iGEM IONIS 2017</a>
                            <a>iGEM IONIS 2016</a>
                            <a>iGEM IONIS 2015</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-200 py-4">
                <div className="container mx-auto px-4 text-xs text-gray-500">
                    Copyright © 2020 iGEM IONIS. All rights reserved.
                </div>
            </div>
        </div>
    )
}
