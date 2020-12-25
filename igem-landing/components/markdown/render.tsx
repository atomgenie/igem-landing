import { API_BASE_URL } from "@config/api"

export const renderers = {
    heading: props => {
        switch (props.level) {
            case 1:
                return <h1 className="text-3xl font-bold mt-4">{props.children}</h1>
            case 2:
                return <h2 className="text-2xl font-bold mt-2">{props.children}</h2>
            case 3:
                return <h3 className="text-xl font-bold mt-1">{props.children}</h3>
            case 4:
                return <h4 className="text-lg font-bold">{props.children}</h4>
            case 5:
                return <h5>{props.children}</h5>
            default:
                return <div>{props.children}</div>
        }
    },
    paragraph: props => {
        return <p className="mt-2">{props.children}</p>
    },
    list: props => {
        switch (props.depth) {
            case 0:
                return <ul className="my-4">{props.children}</ul>
            case 1:
                return <ul className="my-2">{props.children}</ul>
            case 2:
                return <ul className="my-1">{props.children}</ul>
            default:
                return <ul>{props.children}</ul>
        }
    },
    listItem: props => {
        return (
            <li className="flex items-start">
                {props.ordered ? (
                    <div className="mr-4">{props.index + 1}.</div>
                ) : (
                    <div className="bg-black h-1 mt-2 w-1 rounded-full mr-4 flex-shrink-0"></div>
                )}
                <div>{props.children}</div>
            </li>
        )
    },
    image: props => {
        return (
            <img
                src={
                    process.env.NODE_ENV === "development"
                        ? `${API_BASE_URL}${props.src}`
                        : props.src
                }
                className="mx-auto mt-8 mb-6"
            />
        )
    },
}
