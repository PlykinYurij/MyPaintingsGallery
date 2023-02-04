import React, { useContext } from "react"
import { IsDarkContext } from "../../context"
import cn from "classnames"
import Select from 'react-select'


const Options2 = ({ valueInput, onChangeSearchQuery, setSelectedAuthor, setSelectedLocation, autors, locations, setPage }) => {
    const { isDark } = useContext(IsDarkContext)

    const onChahgeSelected = (callback, event) => {
        setPage(1)
        callback(event)
    }

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
                onChange={event => onChahgeSelected(setSelectedAuthor, event.value)}
                options={autors.map(autor => ({ value: autor.id, label: autor.name }))}
                placeholder="Author"
            />
        </div>

        <div className={cn("selectContainer", {
            darkPN: isDark,
        })}>
            <Select
                classNamePrefix="select-castom"
                onChange={event => onChahgeSelected(setSelectedLocation, event.value)}
                options={locations.map(location => ({ value: location.id, label: location.location }))}
                placeholder="Location"
                isClearable={true}
            />
        </div>

    </div>
}

export default Options2