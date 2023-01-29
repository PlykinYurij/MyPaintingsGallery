import React, { useEffect, useState } from "react"
import { launchesApi } from "../../API/api"
import Paint from "./Paint"
import Loader from "../Loader/Loader"
import Error from "../Error/Error"
import { useFetching } from "../../hooks/useFetching"
import "./Paint.scss"
import { getPagesArray, getPagesCount } from "../../utils/pages/pages"
import '../../App.scss';
import Header from "../Header/Header"
import Options from "../Options/Options"
import Pagination from "../Pagination/Pagination"

const PaintingContainer = () => {
    const [paintings, setPaintings] = useState([])
    const [autors, setAutors] = useState([])
    const [locations, setLocations] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(12)
    const [page, setPage] = useState(1)
    const [filteredPaintsArray, setfilteredPaintsArray] = useState([])

    const [fetchAutors, errorAutors, loadingAutors] = useFetching(async () => {
        const response = await launchesApi.getAuthors()
        setAutors(response.data)
    })

    const [fetchLocations, errorLocations, loadingLocations] = useFetching(async () => {
        const response = await launchesApi.getLocations()
        setLocations(response.data)
    })

    const [fetchPaintings, errorPaintings, loadingPaintings] = useFetching(async () => {
        const response = await launchesApi.getPaintings(limit, page)
        setPaintings(response.data)
        const totalCount = response.headers["x-total-count"]
        setTotalPages(getPagesCount(totalCount, limit))
    })

    useEffect(() => {
        fetchAutors()
        fetchLocations()
    }, [])

    useEffect(() => {
        fetchPaintings(limit, page)
    }, [page])

    const pagesArray = getPagesArray(totalPages)

    const filteredAndSearchQuerryArray = filteredPaintsArray.length > 0 ? filteredPaintsArray : paintings

    return (
        <div className={"wrapperPaintingContainer"}>
            <Header setfilteredPaintsArray={setfilteredPaintsArray} />
            <Options
                autors={autors}
                locations={locations}
                setTotalPages={setTotalPages}
                setfilteredPaintsArray={setfilteredPaintsArray}
            />

            <div className={"containerPaints"}>
                {loadingPaintings && <Loader />}
                {errorPaintings && <Error>{errorPaintings}</Error>}
                {filteredAndSearchQuerryArray && filteredAndSearchQuerryArray
                    .map(paint => <div className={"containerWrapperPaint"}
                        key={paint.id}>
                        <Paint paint={paint}
                            autor={autors.filter(autor => autor.id === paint.authorId)}
                            location={locations.filter(location => location.id === paint.locationId)}
                        />
                    </div>)}
            </div>
            <Pagination
                page={page}
                pagesArray={pagesArray}
                totalPages={totalPages}
                setPage={setPage}
            />
        </div>
    )
}

export default PaintingContainer