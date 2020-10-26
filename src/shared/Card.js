import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import { Redirect, Link } from 'react-router-dom'

export default function MyCard(props) {

    return (
        <Card style={{ width: '17rem' }} className='px-2 py-2 my-2 mx-1'>
            <Card.Header style={{backgroundColor: '#002a32', color: 'white', backgroundImage: 'linear-gradient(90deg, rgba(0,42,50,1) 0%, rgba(9,100,121,1) 66%, rgba(26,151,161,1) 100%)' }}><h1 className='title'>{props.title}</h1></Card.Header>
            <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>
                    <blockquote className="blockquote">
                        <footer className="blockquote-footer">
                            {props.description}
                        </footer>
                    </blockquote>
                    <Card.Link as={Link} to={props.link}>Czytaj dalej...</Card.Link>
                </Card.Text>

            </Card.Body>
            <Card.Img variant='bottom' src={props.image} />
        </Card>
    )
}

