import axios from "axios"

import { API_BASE_URL } from "@config/api"

import { NavigationAPI } from "@igem-types/navigation"

export const useNavigation = async (): Promise<NavigationAPI> => {
    const data = await axios.get<NavigationAPI>(`${API_BASE_URL}/menu`)

    return data.data
}
