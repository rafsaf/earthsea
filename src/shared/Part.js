import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Part(props) {
    const height = props.height ? props.height : 400
    const color = props.color ? props.color : 'white'
    const background = props.background ? props.background : '#1C7C73'
    const left = props.left
    const right = props.right
    
    return (
        <div className='justify-content-center' style={{
            minHeight: height, 
            color: color,
            backgroundColor: background,
            fontFamily: 'Oswald, sans-serif',
        }}>
        <Row >
        <Col xs lg={4}>
            {left}
        </Col>
        <Col lg={4} className='d-none d-lg-block ml-5'>
            {right}
        </Col>
        </Row>
        <Row>
        <Col>
        <div className='row d-block d-lg-none'>
            {right}
        </div>
        </Col>
        </Row>
        </div>
    )
}