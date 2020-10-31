import React from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

export default function MyCard(props) {

    return (
        <Card style={{ width: '17rem' }} className='px-2 py-2 my-2 mx-1'>
            <Card.Header style={{backgroundColor: 'white', color: 'black',  }}><h1 className='title'>{props.title}</h1></Card.Header>
            <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>
                    <blockquote className="blockquote">
                        <footer className="blockquote-footer">
                            {props.description}
                        </footer>
                    </blockquote>
                    <Card.Link as={Link} to={'/' + props.slug}>Czytaj dalej...</Card.Link>
                </Card.Text>

            </Card.Body>
            {props.image ?
            <Card.Img variant='bottom' src={props.image} />
            :
            <p></p>
            }
        </Card>
    )
}

