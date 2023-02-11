import React, { useContext, useEffect, useState } from "react"
import { paintingsApi } from "../../api/api"
import Paint from "./Paint"
import Loader from "../Loader/Loader"
import Error from "../Error/Error"
import { useFetching } from "../../hooks/useFetching"
import "./Paint.scss"
import { getPagesArray, getPagesCount } from "../../utils/pages/pages"
import '../../App.scss';
import Header from "../Header/Header"
import Pagination from "../Pagination/Pagination"
import Options from "../Options/Options"
import useDebounce from "../../hooks/useDebounce"
import { IsDarkContext } from "../../context/IsDarkContext"
import cn from "classnames"

const PaintingContainer = () => {
    const limit = 12
    const [paintings, setPaintings] = useState([])
    const [autors, setAutors] = useState([])
    const [locations, setLocations] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1)
    const [valueInput, setValueInput] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedAuthor, setSelectedAuthor] = useState("")
    const [selectedLocation, setSelectedLocation] = useState("")
    const [fromCreated, setFromCreated] = useState("")
    const [beforeCreated, setBeforeCreated] = useState("")

    const { isDark } = useContext(IsDarkContext)

    const [fetchAutors] = useFetching(async () => {
        const response = await paintingsApi.getAuthors()
        setAutors(response.data)
    })

    const [fetchLocations] = useFetching(async () => {
        const response = await paintingsApi.getLocations()
        setLocations(response.data)
    })

    const [fetchPaintings, errorPaintings, loadingPaintings] = useFetching(async () => {
        const response = await paintingsApi.getPaintings(
            limit, 
            page, 
            searchQuery, 
            selectedAuthor, 
            selectedLocation, 
            fromCreated, 
            beforeCreated)
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
    }, [page, searchQuery, selectedAuthor, selectedLocation, fromCreated, beforeCreated])

    const pagesArray = getPagesArray(totalPages)

    const removeFilters = () => {
        setValueInput("")
        setSearchQuery("")
        setBeforeCreated("")
        setFromCreated("")
    }

    return (
        <div className="wrapperPaintingContainer">
            <Header removeFilters={removeFilters} />

            <Options
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
                fromCreated ={fromCreated}
                beforeCreated = {beforeCreated}
                setFromCreated = {setFromCreated}
                setBeforeCreated = {setBeforeCreated}
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
                            autor={autors.find(autor => autor.id === paint.authorId)}
                            location={locations.find(location => location.id === paint.locationId)}
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