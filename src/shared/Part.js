import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

export default function Part(props) {
    const height = props.height ? props.height : 400
    const color = props.color ? props.color : 'white'
    const background = props.background ? props.background : '#1C7C73'
    const lg = props.lg ? props.lg : 'auto'
    const font = props.font ? props.font : 'Oswald, sans-serif'
    const left = props.left
    const right = props.right
    const size = props.size ? props.size : 'normal'
    
    return (
        <div style={{
            fontSize: size,
            minHeight: height, 
            color: color,
            backgroundColor: background,
            fontFamily: font,
        }}>
        <div className='d-none d-lg-block'>
        <Row className='w-100 justify-content-center text-center'>
        <Col lg={lg} md={8} className='my-auto'>
            {left}
        </Col>
        <Col lg={'auto'} className='my-auto'>
                {right}
            
        </Col>
        </Row>
        </div>
        <div className='text-center d-block d-lg-none px-2'>
            <div className='pt-5'>
            {left}
            </div>
            <div className='py-5'>
            {right}
            </div>
            
            
        </div>
        </div>
    )
}