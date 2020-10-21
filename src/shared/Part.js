import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

export default function Part(props) {
    const height = props.height ? props.height : 400
    const color = props.color ? props.color : 'white'
    const background = props.background ? props.background : '#1C7C73'
    const left = props.left
    const right = props.right
    
    return (
        <div style={{
            minHeight: height, 
            color: color,
            backgroundColor: background,
            
            fontFamily: 'Oswald, sans-serif',
        }}>
        <div className='d-none d-lg-block'>
        <Row className='w-100 justify-content-center text-center'>
        <Col lg={'auto'} className='my-auto'>
            {left}
        </Col>
        <Col lg={'auto'} className='py-3'>
                {right}
            
        </Col>
        </Row>
        </div>
        <div className='text-center d-block d-lg-none'>
            <div className='pt-3'>
            {left}
            </div>
            <div className='py-3'>
            {right}
            </div>
            
            
        </div>
        </div>
    )
}