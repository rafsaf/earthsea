import React, {useState} from 'react'
import Image1 from '../img/ziemiomorze.jpg'
import Image2 from '../img/img3.jpg'
import Part from '../shared/Part'
import MyCard from '../shared/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import {
    faFacebook,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Data from '../fake'


export default function Home() {

    const PartOneImage = (
        <div>
            <img className='img-fluid py-3' src={Image1} alt="czarnoksieznik-z-archipelagu" />
        </div>
    )

    const PartOneRight = (
        <div className='ursula pb-4'>
            <div className='py-2 '>
            <span className='badge badge-light'>
                <a href="https://www.facebook.com/"
                    className="facebook social my-auto">
                    <FontAwesomeIcon icon={faFacebook} size='lg' />
                </a>
                <a href="https://www.twitter.com/" className="twitter social">
                    <FontAwesomeIcon icon={faTwitter}  size='lg'/>
                </a>
                <button className='btn my-auto btn-outline-primary'>
                    Follow
                </button>
            </span>
            </div>
            Blog poświęcony uniwersum Ziemiomorza autorstwa Ursuli Le Guin.
        </div>
    )
    const [articles, setArticles] = useState(Data)

    return (
        <div id="home-page" >
            <Part Image size='larger' height='100px' right={PartOneRight} />

            <Container fluid style={{
                backgroundImage: `url(${Image2})`,
                backgroundColor: 'none'
            }}>
                <Row className='justify-content-center py-3'>
                    <Col xs={12} xl={9}>
                        <Row className='justify-content-center py-2'>
                        {articles.map(row => (
                            <MyCard
                            key={row.description}
                            title={row.title}
                            description={row.description}
                            image={row.image}
                            text={row.text} 
                            link={row.link}>

                            </MyCard>
                        ))}
                        </Row>
                    </Col>
                    <Col xs={12} xl={3}>
                        <Row className='justify-content-center py-5'>
                            <Col xs={12} className='py-3'>
                                <Part Image height='10px' left={<div className='ursula'>Najnowsze</div>} size='xx-large'>
                                </Part>
                            </Col>


                            <MyCard fullWidth />
                            <MyCard fullWidth />
                            <MyCard fullWidth />


                        </Row>
                    </Col>
                </Row>
            </Container>




        </div>
    )
}