import React, { useContext, useEffect, useState } from "react"
import { launchesApi } from "../../API/api"
import Paint from "./Paint"
import Loader from "../Loader/Loader"
import Error from "../Error/Error"
import { useFetching } from "../../hooks/useFetching"
import "./Paint.scss"
import { getPagesArray, getPagesCount } from "../../utils/pages/pages"
import Select from 'react-select'
import '../../App.scss';
import { IsDarkContext } from "../../context"
import cn from "classnames"
import iconSun from "../../images/sun.png"


const PaintingContainer = () => {
    const [paintings, setPaintings] = useState([])
    const [autors, setAutors] = useState([])
    const [locations, setLocations] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(12)
    const [page, setPage] = useState(1)
    const [selectedFilteredPaints, setSelectedFilterPaints] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const [query, setQuery] = useState("q")
    const [fromCreated, setFromCreated] = useState(null)
    const [beforeCreated, setBeforeCreated] = useState(null)
    const [createdFormActive, setCreatedFormActive] = useState(false)
    const [filteredPaintsArray, setfilteredPaintsArray] = useState([])
    const { isDark, setIsDark } = useContext(IsDarkContext)

    const [fetchPaintings, errorPaintings, loadingPaintings] = useFetching(async () => {
        const response = await launchesApi.getPaintings(limit, page)
        setSelectedFilterPaints(null)
        setPaintings(response.data)
        const totalCount = response.headers["x-total-count"]
        setTotalPages(getPagesCount(totalCount, limit))
    })

    const [fetchPeriod, errorPeriod, loadingPeriod] = useFetching(async () => {
        const response = await launchesApi.getCreated(fromCreated, beforeCreated)
        setfilteredPaintsArray(response.data)
    })

    const [fetchAutors, errorAutors, loadingAutors] = useFetching(async () => {
        const response = await launchesApi.getAuthors()
        setAutors(response.data)
    })

    const [fetchLocations, errorLocations, loadingLocations] = useFetching(async () => {
        const response = await launchesApi.getLocations()
        setLocations(response.data)
    })

    const [fetchFilteredPaintsArray, errorFilteredPaintsArray, loadingFilteredPaintsArray] = useFetching(async () => {
        const response = await launchesApi.getFilteredOrSearchQuerryPaints(query, selectedFilteredPaints)
        setfilteredPaintsArray(response.data)
    })

    useEffect(() => {
        fetchAutors()
        fetchLocations()
        fetchPaintings(limit, page)
    }, [page])

    useEffect(() => {
        fetchFilteredPaintsArray()
    }, [selectedFilteredPaints])

    useEffect(() => {
        fetchPeriod()
    }, [fromCreated, beforeCreated])

    const pagesArray = getPagesArray(totalPages)

    const changeSelectedAndQuery = (query, event) => {
        setQuery(query)
        setSelectedFilterPaints(event.value)
        setTotalPages(1)
    }

    const changeSearchQuery = (query, event) => {
        setQuery(query)
        setSearchQuery(event.target.value)
        setSelectedFilterPaints(event.target.value)
        setTotalPages(1)
    }

    const changeFromCreated = (event) => {
        setFromCreated(event.target.value)
        setTotalPages(1)
        if (beforeCreated === null) {
            return beforeCreated
        } else if (beforeCreated.trim() === "") {
            return setBeforeCreated(null)
        } else {
            return beforeCreated
        }
    }

    const changeBeforeCreated = (event) => {
        setBeforeCreated(event.target.value)
        setTotalPages(1)
        if (fromCreated === null) {
            return fromCreated
        } else if (fromCreated.trim() === "") {
            return setFromCreated(null)
        } else {
            return fromCreated
        }
    }

    const classActiveCreatedForm = createdFormActive ? "createdFormActive" : " "
    const classesCreatedFormArray = ["containerCreatedForm", classActiveCreatedForm]

    const filteredAndSearchQuerryArray = filteredPaintsArray.length > 0 ? filteredPaintsArray : paintings

    return (
        <div className={"wrapperPaintingContainer"}>
            <div className="wrapperIconSun" onClick={() => setIsDark(!isDark)}><img src={iconSun} /></div>
            <div className={"optionsContainer"}>
                <div className={"selectContainer"}>
                    <input value={searchQuery}
                        placeholder={"name"}
                        onChange={event => changeSearchQuery("q", event)}
                        className={cn("inputSearchQuery", {
                            darkPN: isDark === true,
                        })}
                    />
                </div>
                <div className={"selectContainer"}>
                    <Select
                        classNamePrefix="select-castom"
                        onChange={event => changeSelectedAndQuery("authorId", event)}
                        options={autors.map(autor => ({ value: autor.id, label: autor.name }))}
                        isClearable={true}
                        placeholder="Author"
                    />
                </div>
                <div className={"selectContainer"}>
                    <Select
                        classNamePrefix="select-castom"
                        onChange={event => changeSelectedAndQuery("locationId", event)}
                        options={locations.map(location => ({ value: location.id, label: location.location }))}
                        isClearable={true}
                        placeholder="Location"
                    />
                </div>
                <div className={"selectContainer"}>
                    <div className={cn("containerCreated", {
                        darkPN: isDark === true,
                    })}>
                        <div className={cn("containerCreatedDescription", {
                            darkPN: isDark === true,
                        })}>
                            <div>
                                Created

                            </div>
                            <button className={"btnCreatedForm"} onClick={() => setCreatedFormActive(!createdFormActive)}>
                                {createdFormActive ? "∨" : "∧"}
                            </button>

                        </div>
                        <div className={cn(classesCreatedFormArray.join(" "), {
                            darkPN: isDark === true,
                        })}>
                            <div className={"inputContainerForm"}>
                                <input value={fromCreated}
                                    placeholder={"from"}
                                    onChange={event => changeFromCreated(event)}
                                />
                            </div>
                            <div>
                                {" - "}
                            </div>

                            <div className={"inputContainerForm"}>
                                <input value={beforeCreated}
                                    placeholder="before"
                                    onChange={event => changeBeforeCreated(event)}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
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
            <div className={"pagesWrapper"}>
                <div className={cn("containerPages", {
                    darkPN: isDark === true
                })}>
                    <button className={cn("page", {
                        darkPN: isDark === true
                    })} onClick={() => setPage(1)} disabled={page === 1}>
                        <div className={"textPage"}>
                            {"«"}
                        </div>
                    </button>
                    <button className={cn("page", {
                        darkPN: isDark === true
                    })} onClick={() => setPage(page - 1)} disabled={page === 1}>
                        <div className={"textPage"}>
                            {"‹"}
                        </div>
                    </button>
                    {pagesArray.map(p => <button
                        onClick={() => setPage(p)}
                        className={page === p ? cn("pageActive", {
                            darkPageActive: isDark === true
                        }) : cn("page", {
                            darkPN: isDark === true
                        })}
                        key={p}>
                        <div className={"textPage"}>{p}</div>
                    </button>)}
                    <button className={cn("page", {
                        darkPN: isDark === true
                    })} onClick={() => setPage(page + 1)} disabled={page === totalPages}>
                        <div className={"textPage"}>
                            {"›"}
                        </div>
                    </button>
                    <button className={cn("lastChildPage", {
                        darkPN: isDark === true
                    })} onClick={() => setPage(totalPages)} disabled={page === totalPages}>
                        <div className={"textPage"}>
                            {"»"}
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PaintingContainer