import React from "react"
import { CoursePart } from "../App"
import Parts from "./Part"
const Content = ({courseParts}: {courseParts: CoursePart[]}) => {
    return (
        <>
            {courseParts.map(a => 
                (
                  <div key={a.name}>
                    <p><b>{a.name} {a.exerciseCount}</b></p>
                    <Parts coursePart={a}/>
                  </div>
                )
            )}
        </>
    )
}
export default Content
