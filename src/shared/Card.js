import React from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

export default function MyCard(props) {
    const small = props.small ? 'px-1 py-2 my-2 col-6 col-md-3 col-xl-2' : null
    const fullWidth = props.fullWidth ? ' my-2 col-6 col-lg-12 ' : null
    const homeWidth = props.homeWidth ? 'px-1 py-2 my-2 col-6 col-lg-3' : null
    let cardClass
    if (small) {
        cardClass = small
    } else if (fullWidth) {
        cardClass = fullWidth
    } else if (homeWidth) {
        cardClass = homeWidth
    }

    return (
        <Card className={cardClass}>
            <Card.Header style={{backgroundColor: 'white', color: 'black', height: '5rem' }}><h1 className='title'>{props.title}</h1></Card.Header>
            <Card.Body style={{paddingLeft: '1vh', paddingRight: '0'}}>
                <Card.Title></Card.Title>
                <Card.Text>
                    <blockquote className="blockquote" >
                        <footer className="blockquote-footer">
                            {props.description}
                        </footer>
                    </blockquote>
                    <Card.Link as={Link} to={'/' + props.slug}>Czytaj dalej...</Card.Link>
                </Card.Text>

            </Card.Body>
            <div className='text-center' >
            {props.image ?
            <img className='cardImage'  src={props.image} />
            :
            <span></span>
            }
            </div>

        </Card>
    )
}

