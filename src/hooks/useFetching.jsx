import { useState } from "react";

export const useFetching = (callback) => {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function fetching() {
        try {
            setError("")
            setLoading(true)
            await callback()
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return [fetching, error, loading]
}