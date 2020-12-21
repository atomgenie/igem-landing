import { GetStaticProps } from "next"
import axios from "axios"

interface props {
    toto: any
}

export default function Home() {
    return <div>Toto</div>
}

export const getStaticProps: GetStaticProps<props> = async context => {
    const toto = await axios.get("http://localhost:1337/pages")
    console.log(toto.data)
    return {
        props: {
            toto: toto.data,
        },
        revalidate: 10,
    }
}
