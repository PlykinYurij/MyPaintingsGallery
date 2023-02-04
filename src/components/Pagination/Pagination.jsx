import React, { useContext } from "react"
import { IsDarkContext } from "../../context"
import cn from "classnames"

const Pagination = ({page, pagesArray, totalPages, setPage}) => {
    const { isDark } = useContext(IsDarkContext)
    return <div className={"pagesWrapper"}>
        <div className={cn("containerPages", {
            darkPN: isDark
        })}>
            <button className={cn("page", {
                darkPN: isDark
            })} onClick={() => setPage(1)} disabled={page === 1}>
                <div className={"textPage"}>
                    {"«"}
                </div>
            </button>
            <button className={cn("page", {
                darkPN: isDark
            })} onClick={() => setPage(page - 1)} disabled={page === 1}>
                <div className={"textPage"}>
                    {"‹"}
                </div>
            </button>
            {pagesArray.map(p => <button
                onClick={() => setPage(p)}
                className={page === p ? cn("pageActive", {
                    darkPageActive: isDark
                }) : cn("page", {
                    darkPN: isDark
                })}
                key={p}>
                <div className="textPage">{p}</div>
            </button>)}
            <button className={cn("page", {
                darkPN: isDark
            })} onClick={() => setPage(page + 1)} disabled={page === totalPages}>
                <div className="textPage">
                    {"›"}
                </div>
            </button>
            <button className={cn("lastChildPage", {
                darkPN: isDark
            })} onClick={() => setPage(totalPages)} disabled={page === totalPages}>
                <div className="textPage">
                    {"»"}
                </div>
            </button>
        </div>
    </div>
}


export default Pagination