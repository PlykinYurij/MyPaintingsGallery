import axios from "axios"

const baseUrl = "https://test-front.framework.team/paintings"

export const paintingsApi = {
    getPaintings(
        limit = 12, 
        page = 1, 
        searchQuery = "", 
        authorId = "", 
        locationId = "", 
        fromCreated = "", 
        beforeCreated = "") {
            const response = axios.get(baseUrl, {
                params: {
                    _limit: limit,
                    _page: page,
                    q: searchQuery || null,
                    authorId: authorId || null,
                    locationId: locationId || null,
                    created_gte: fromCreated || null,
                    created_lte: beforeCreated || null,
                }
            })

            return response
    },

    getAuthors() {
        const response = axios.get("https://test-front.framework.team/authors")

        return response
    },

    getLocations() {
        const response = axios.get("https://test-front.framework.team/locations")
        
        return response
    },
}