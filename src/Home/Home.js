import React, {useState} from 'react'
import Image1 from '../img/ziemiomorze.jpg'
import Image2 from '../img/img3.jpg'
import Part from '../shared/Part'
import MyCard from '../shared/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import {
    faYoutube,
    faFacebook,
    faTwitter,
    faInstagram
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Data from '../fake'


export default function Home() {
    const PartOneText = (
        <div className='py-3'>
            „Tylko w milczeniu słowo,<br />
            tylko w ciemności światło,<br />
            tylko w umieraniu życie:<br />
            na pustym niebie<br />
            jasny jest lot sokoła”<br />
        </div>
    )

    const PartOneImage = (
        <div>
            <img className='img-fluid py-3' src={Image1} alt="czarnoksieznik-z-archipelagu" />
        </div>
    )

    const PartOneRight = (
        <div className='ursula pb-2'>
            <div className='py-4'>
                <a href="https://www.facebook.com/learnbuildteach/"
                    className="facebook social">
                    <FontAwesomeIcon icon={faFacebook} size='lg' />
                </a>
                <a href="https://www.twitter.com/jamesqquick" className="twitter social">
                    <FontAwesomeIcon icon={faTwitter}  size='lg'/>
                </a>
                <button size='2x' className='btn my-auto btn-lg btn-outline-primary'>
                    Follow
                </button>
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