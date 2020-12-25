import { useEffect, useRef, useState } from "react"

import { NavigationAPI } from "@igem-types/navigation"
import Link from "next/link"
import { useRouter } from "next/router"
import { FiChevronDown } from "react-icons/fi"

interface props {
    item: NavigationAPI["navigations"][number]
}

export const NavigationItem: React.FC<props> = ({ item }) => {
    const [open, setOpen] = useState(false)
    const { locale } = useRouter()
    const refTarget = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!open || !refTarget.current) {
            return
        }

        const handleClickOutside = (e: MouseEvent) => {
            if (
                refTarget.current &&
                !refTarget.current.contains(e.target as any) &&
                document.contains(e.target as any)
            ) {
                setOpen(false)
            }
        }

        document.addEventListener("click", handleClickOutside)

        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [refTarget, open])

    if (item.pages.length === 1) {
        return (
            <Link href={`/page/${item.pages[0].id}`}>
                <a>{locale === "fr" ? item.title_fr : item.title_en}</a>
            </Link>
        )
    }

    return (
        <div className="relative">
            <div
                onClick={() => setOpen(!open)}
                className="cursor-pointer flex items-center"
            >
                <div>{locale === "fr" ? item.title_fr : item.title_en}</div>
                <FiChevronDown className="ml-1" />
            </div>
            <div
                className={`${
                    !open ? "hidden" : ""
                } absolute z-10 mt-2 bg-white px-4 py-2 roudned shadow whitespace-nowrap`}
                ref={refTarget}
            >
                {item.pages.map(page => (
                    <Link key={page.id} href={`/page/${page.id}`}>
                        <div className="cursor-pointer">
                            {locale === "fr" ? page.title_fr : page.title_en}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
