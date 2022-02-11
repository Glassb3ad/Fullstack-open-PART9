import React from 'react'
import {CoursePart} from './../App'
const Parts = ({coursePart}: {coursePart: CoursePart}) => {
    switch (coursePart.type) {
        case 'normal':
            return (
              <p><i>{coursePart.description}</i></p>
            )
        case 'groupProject':
            return (
                <p><i>Project groups: {coursePart.groupProjectCount}</i></p>
            )
        case 'submission':
            return(
                <>
                  <p><i>{coursePart.description}</i></p>
                  <p><i>Link to submission: {coursePart.exerciseSubmissionLink}</i></p>
                </>
            )
        case 'special':
            return (
                <>
                  <p><i>{coursePart.description}</i></p>
                  <p><i>required skills: {coursePart.requirements.reduce((a, b) => (a + ', ' + b))}</i></p>
                </>
            )
        default: 
            return (<></>) 
    }
}
export default Parts