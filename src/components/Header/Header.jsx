import React, { useContext } from "react"
import { IsDarkContext } from "../../context/IsDarkContext"
import iconSunWhite from "../../images/VectorWhite.png"
import iconSunBlack from "../../images/VectorBlack.png"
import iconFtw from "../../images/IconFwtWhiteTheme.png"


const Header = ({removeFilters}) => {
    const { isDark, setIsDark } = useContext(IsDarkContext)

    return <div className="containerHeader">
        <div className="wrapperIconFwt" onClick={() => removeFilters()}>
            <img src={iconFtw} alt="icon" />
        </div>
        <div className="wrapperIconSun" onClick={() => setIsDark(!isDark)}>
            <img src={isDark ? iconSunWhite : iconSunBlack} alt="sun"/>
        </div>
    </div>
}

export default Header