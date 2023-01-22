import axios from "axios"

const baseUrl = "https://test-front.framework.team/paintings"

export const launchesApi = {
    getPaintings (limit = 12, page = 1) {
        const response = axios.get(baseUrl, {
            params: {
                _limit: limit,
                _page: page,
            }
        })
        return response
    },
    getAuthors () {
        const response = axios.get("https://test-front.framework.team/authors")
        return response
    },
    getLocations() {
        const response = axios.get("https://test-front.framework.team/locations")
        return response
    },
    getFilteredOrSearchQuerryPaints(query = null, value = null, limit = 12, page = 1 ) {
        const response = axios.get(`${baseUrl}?${query}=${value}`)
        return response
    },
    getCreated (from = 0, before = 2023) {
        const response = axios.get(baseUrl, {
            params: {
                created_gte: from,
                created_lte: before,
            }
        })
        return response
    }

}