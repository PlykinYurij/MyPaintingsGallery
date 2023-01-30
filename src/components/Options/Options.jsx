import React, { useContext, useEffect, useState } from "react"
import { IsDarkContext } from "../../context"
import Select from 'react-select'
import cn from "classnames"
import { useFetching } from "../../hooks/useFetching"
import { launchesApi } from "../../API/api"


const Options = ({autors, locations, setTotalPages, setfilteredPaintsArray}) => {
    const { isDark } = useContext(IsDarkContext)
    const [searchQuery, setSearchQuery] = useState("")
    const [fromCreated, setFromCreated] = useState("")
    const [beforeCreated, setBeforeCreated] = useState("")
    const [createdFormActive, setCreatedFormActive] = useState(false)
    const [selectedFilteredPaints, setSelectedFilterPaints] = useState("")
    const [query, setQuery] = useState("q")

    const [fetchPeriod, errorPeriod, loadingPeriod] = useFetching(async () => {
        const response = await launchesApi.getCreated(fromCreated, beforeCreated)
        setfilteredPaintsArray(response.data)
    })

    const [fetchFilteredPaintsArray, errorFilteredPaintsArray, loadingFilteredPaintsArray] = useFetching(async () => {
        const response = await launchesApi.getFilteredOrSearchQuerryPaints(query, selectedFilteredPaints)
        setfilteredPaintsArray(response.data)
    })

    useEffect(() => {
        fetchFilteredPaintsArray()
    }, [selectedFilteredPaints])

    useEffect(() => {
        fetchPeriod()
    }, [fromCreated, beforeCreated])

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
        if (beforeCreated === "") {
            return setBeforeCreated(2023)
        } else {
            return beforeCreated
        }
    }

    const changeBeforeCreated = (event) => {
        setBeforeCreated(event.target.value)
        setTotalPages(1)
    }

    const handleClickForm = (event) => {
        event.stopPropagation()
        setCreatedFormActive(true)
    }

    const handleClickWindow = () => {
        setCreatedFormActive(false)
    }

    const classActiveCreatedForm = createdFormActive ? "createdFormActive" : " "
    const classesCreatedFormArray = ["containerCreatedForm", classActiveCreatedForm]
    window.addEventListener("click", handleClickWindow)

        return <div className={"optionsContainer"}>
        <div className={cn("selectContainer", {
            darkPN: isDark === true,
        })}>
            <input value={searchQuery}
                placeholder={"name"}
                onChange={event => changeSearchQuery("q", event)}
                className={cn("inputSearchQuery", {
                    darkPN: isDark === true,
                })}
            />
        </div>
        <div className={cn("selectContainer", {
            darkPN: isDark === true,
        })}>
            <Select
                classNamePrefix={"select-castom"}
                onChange={event => changeSelectedAndQuery("authorId", event)}
                options={autors.map(autor => ({ value: autor.id, label: autor.name }))}
                placeholder="Author"
            />
        </div>
        <div className={cn("selectContainer", {
            darkPN: isDark === true,
        })}>
            <Select
                classNamePrefix="select-castom"
                onChange={event => changeSelectedAndQuery("locationId", event)}
                options={locations.map(location => ({ value: location.id, label: location.location }))}
                placeholder="Location"
            />
        </div>
        <div className={"selectContainer"}>
            <div className={cn("containerCreated", {
                darkPN: isDark === true,
            })} onClick={event => handleClickForm(event)}>
                <div className={cn("containerCreatedDescription", {
                    darkPN: isDark === true,
                })}>
                    <div className="createdFormText">
                        Created
                    </div>
                    <button className={"btnCreatedForm"}>
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
}

export default Options