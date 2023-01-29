import React, { useContext } from "react"
import { IsDarkContext } from "../../context"
import iconSunWhite from "../../images/VectorWhite.png"
import iconSunBlack from "../../images/VectorBlack.png"
import iconFtw from "../../images/IconFwtWhiteTheme.png"


const Header = ({setfilteredPaintsArray}) => {
    const { isDark, setIsDark } = useContext(IsDarkContext)

    return <div className="containerHeader">
        <div className="wrapperIconFwt" onClick={() => setfilteredPaintsArray([])}>
            <img src={iconFtw} alt="icon" />
        </div>
        <div className="wrapperIconSun" onClick={() => setIsDark(!isDark)}>
            <img src={isDark ? iconSunWhite : iconSunBlack} />
        </div>
    </div>
}

export default Header