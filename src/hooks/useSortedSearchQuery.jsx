import { useMemo } from "react"

export const useSorted = (products, selectedSort) => {
    const sortedProducts = useMemo(() => {
        if (selectedSort && ((typeof selectedSort) === "string")) {
            return [...products].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
        } else if (selectedSort && ((typeof selectedSort) === "number")) {
            return [...products].sort((a, b) => a - b)
        }
        return products
    }, [selectedSort, products])
    return sortedProducts
}

export const useSortedSearchQuery = (products, selectedSort, query) => {
    const sortedProducts = useSorted(products, selectedSort)
   const sortedAndSearchQueryPosts = useMemo(() => {
        return sortedProducts.filter(product => product.title.toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedProducts])
    return sortedAndSearchQueryPosts
}