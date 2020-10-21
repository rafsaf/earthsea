import React from 'react'
import Row from 'react-bootstrap/Row'

export default function RowContent(props) {
    const background = props.background ? props.background : '#04272e'
    const width = props.width ? props.width : '100%'
    return (
        <div style={{
            backgroundColor: background,
            width: width,
        }} >

        </div>
    )
}