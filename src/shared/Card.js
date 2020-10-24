import React from 'react'
import Card from 'react-bootstrap/Card'

import TestImage from '../img/img2.jpg'
import Image from '../img/img4.jpg'

export default function MyCard(props) {

        if (!props.one) {
    return (
        <Card style={{ width: '14rem' }} className='px-2 py-2 my-2 mx-1'>
        <Card.Img variant='top' src={TestImage} />
        <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
            </Card.Text>
            xxx
        </Card.Body>
        </Card>
    )} else {
        return (
            <Card style={{ width: '14rem' }} className='px-2 py-2 my-2 mx-1'>
            <Card.Img variant='top' src={Image} />
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text>
                xxx
            </Card.Body>
            </Card>
        )   
    }
}
