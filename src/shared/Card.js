import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import { Redirect, Link } from 'react-router-dom'

export default function MyCard(props) {

    return (
        <Card style={{ width: '17rem' }} className='px-2 py-2 my-2 mx-1'>
            <Card.Header><h1 className='ursula'>{props.title}</h1></Card.Header>
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

