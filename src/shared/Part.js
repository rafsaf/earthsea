import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Part(props) {
    const height = props.height ? props.height : 400
    const color = props.color ? props.color : 'white'
    const background = props.background ? props.background : '#1C7C73'
    const background2 = props.Image ? 'linear-gradient(90deg, rgba(0,42,50,1) 0%, rgba(9,100,121,1) 66%, rgba(26,151,161,1) 100%)' : 'none'
    const font = props.font ? props.font : 'Oswald, sans-serif'
    const left = props.left
    const right = props.right
    const size = props.size ? props.size : 'normal'
    
    return (
        <table style={{
            width: '100%',
            fontSize: size,
            minHeight: height, 
            color: color,
            backgroundColor: background,
            backgroundImage: background2,
            fontFamily: font,
        }} className='text-center'>
            <tbody>
                <tr className="align-middle">
                    <td>
            {left}
            {right}
            </td>
            </tr>
            </tbody>
        </table>
    )
}