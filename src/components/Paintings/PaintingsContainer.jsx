import React, { useContext, useEffect, useState } from "react"
import { paintingsApi } from "../../API/api"
import Paint from "./Paint"
import Loader from "../Loader/Loader"
import Error from "../Error/Error"
import { useFetching } from "../../hooks/useFetching"
import "./Paint.scss"
import { getPagesArray, getPagesCount } from "../../utils/pages/pages"
import '../../App.scss';
import Header from "../Header/Header"
import Pagination from "../Pagination/Pagination"
import Options2 from "../Options/Options2"
import useDebounce from "../../hooks/useDebounce"
import { IsDarkContext } from "../../context"
import cn from "classnames"

const PaintingContainer = () => {
    const [paintings, setPaintings] = useState([])
    const [autors, setAutors] = useState([])
    const [locations, setLocations] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(12)
    const [page, setPage] = useState(1)
    const [valueInput, setValueInput] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedAuthor, setSelectedAuthor] = useState("")
    const [selectedLocation, setSelectedLocation] = useState("")

    const { isDark } = useContext(IsDarkContext)

    const [fetchAutors, errorAutors, loadingAutors] = useFetching(async () => {
        const response = await paintingsApi.getAuthors()
        setAutors(response.data)
    })

    const [fetchLocations, errorLocations, loadingLocations] = useFetching(async () => {
        const response = await paintingsApi.getLocations()
        setLocations(response.data)
    })

    const [fetchPaintings, errorPaintings, loadingPaintings] = useFetching(async () => {
        const response = await paintingsApi.getPaintings(limit, page, searchQuery, selectedAuthor, selectedLocation)
        setPaintings(response.data)
        const totalCount = response.headers["x-total-count"]
        setTotalPages(getPagesCount(totalCount, limit))
    })

    const debouncedSearch = useDebounce(setSearchQuery, 500)

    const onChangeSearchQuery = (event) => {
        setPage(1)
        setValueInput(event.target.value)
        debouncedSearch(event.target.value)
    }

    useEffect(() => {
        fetchAutors()
        fetchLocations()
    }, [])

    useEffect(() => {
        fetchPaintings()
    }, [page, searchQuery, selectedAuthor, selectedLocation])

    const pagesArray = getPagesArray(totalPages)

    const removeFilters = () => {
        setValueInput("")
        setSearchQuery("")
        setSelectedAuthor("")
        setSelectedLocation("")
    }

    return (
        <div className="wrapperPaintingContainer">
            <Header removeFilters={removeFilters} />

            <Options2
                valueInput={valueInput}
                setValueInput={setValueInput}
                onChangeSearchQuery={onChangeSearchQuery}
                selectedAuthor={selectedAuthor}
                setSelectedAuthor={setSelectedAuthor}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                autors={autors}
                locations={locations}
                setPage={setPage}
            />

            {loadingPaintings && <Loader />}

            {errorPaintings && <Error>{errorPaintings}</Error>}

            <div className="containerPaints">
                {paintings.length === 0 && !loadingPaintings && !errorPaintings
                    && <div className={cn("textNoPainting", {
                        darkNo: isDark,
                    })}>No paintings found</div>}

                {paintings && paintings
                    .map(paint => <div className="containerWrapperPaint"
                        key={paint.id}>
                        <Paint paint={paint}
                            autor={autors.filter(autor => autor.id === paint.authorId)}
                            location={locations.filter(location => location.id === paint.locationId)}
                        />
                    </div>)}
            </div>

            {paintings.length > 0 && <Pagination
                page={page}
                pagesArray={pagesArray}
                totalPages={totalPages}
                setPage={setPage}
            />}

        </div>
    )
}

export default PaintingContainer