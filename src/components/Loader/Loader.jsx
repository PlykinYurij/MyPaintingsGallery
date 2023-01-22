import React from "react" 
import loader from "../../images/loader.gif"
import classes from "./Loader.module.css"

const Loader = () => {
    return (
        <img className={classes.loader} src={loader} alt="loader" />
    )
}

export default Loader