import React, { useContext, useState } from "react"
import { IsDarkContext } from "../../context/IsDarkContext"
import cn from "classnames"
import Select from 'react-select'


const Options2 = ({ 
    valueInput, 
    onChangeSearchQuery, 
    setSelectedAuthor, 
    setSelectedLocation, 
    autors, 
    locations, 
    setPage,
    fromCreated,
    beforeCreated,
    setFromCreated,
    setBeforeCreated
 }) => {
    const { isDark } = useContext(IsDarkContext)
    const [createdFormActive, setCreatedFormActive] = useState(false)

    const onChahgeSelected = (callback, event) => {
        setPage(1)
        callback(event)
    }

    const changeFromCreated = (event) => {
        setFromCreated(event.target.value)
        setPage(1)
    }

    const changeBeforeCreated = (event) => {
        setBeforeCreated(event.target.value)
        setPage(1)
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

    return <div className="optionsContainer">
        <div className={cn("selectContainer", {
            darkPN: isDark,
        })}>
            <input value={valueInput}
                placeholder={"name"}
                onChange={event => onChangeSearchQuery(event)}
                className={cn("inputSearchQuery", {
                    darkPN: isDark,
                })}
            />
        </div>
        <div className={cn("selectContainer", {
            darkPN: isDark,
        })}>
            <Select
                classNamePrefix="select-castom"
                onChange={event => onChahgeSelected(setSelectedAuthor, event?.value)}
                options={autors.map(autor => ({ value: autor.id, label: autor.name }))}
                placeholder="Author"
                isClearable={true}
            />
        </div>

        <div className={cn("selectContainer", {
            darkPN: isDark,
        })}>
            <Select
                classNamePrefix="select-castom"
                onChange={event => onChahgeSelected(setSelectedLocation, event?.value)}
                options={locations.map(location => ({ value: location.id, label: location.location }))}
                placeholder="Location"
                isClearable={true}
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

export default Options2