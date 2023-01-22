import React from "react" 
import classes from "./Error.module.css"

const Error = ({children}) => {
    return <div className={classes.errorContainer}>{children}</div>
}

export default Error