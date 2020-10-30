import React, {useState} from 'react'
import Image1 from '../img/ziemiomorze.jpg'
import Image2 from '../img/img3.jpg'
import Part from '../shared/Part'
import MyCard from '../shared/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Data from '../fake'


export default function Home() {

    const PartOneImage = (
        <div>
            <img className='img-fluid py-3' src={Image1} alt="czarnoksieznik-z-archipelagu" />
        </div>
    )

    const PartOneRight = (
        <div className='ursula py-4'>
            
            Blog poświęcony uniwersum Ziemiomorza autorstwa Ursuli Le Guin.
        </div>
    )
    const [articles, setArticles] = useState(Data)

    return (
        <div id="home-page container-fluid" >

            <Part Image size='larger' height='100px' right={PartOneRight} />

            <Container fluid style={{
                
                backgroundColor: 'white'
            }}>
                <Row className='justify-content-center py-3'>
                    <Col xs={12} xl={8}>
                        <Row className='justify-content-center py-2'>
                        {articles.map(row => (
                            <MyCard
                            key={row.description}
                            title={row.title}
                            description={row.description}
                            image={row.image}
                            slug={row.slug}>

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