import React from "react";
import "./Paint.scss"

const Paint = ({ paint, autor, location }) => {
    return <div className={"wrapperPaint"}>
        <div className={"containerPaint"}>
            <img className={"paint"} src={`https://test-front.framework.team/${paint.imageUrl}`} />
            <div className={"containerPaintName"}>
                <div className={"paintName"}>{paint.name}</div>
                <div className={"containerHoverDescriptions"}>
                    <div className={"hoverDescription"}>
                        <span className={"hoverName"}>{`Author: `}</span>
                        <span className={"hoverValue"}>{autor[0].name}</span>
                    </div>
                    <div className={"hoverDescription"}>
                        <span className={"hoverName"}>{`Creared: `}</span>
                        <span className={"hoverValue"}>{paint.created}</span>
                    </div>
                    <div className={"hoverDescription"}>
                        <span className={"hoverName"}>{`Location: `}</span>
                        <span className={"hoverValue"}>{location[0].location}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Paint