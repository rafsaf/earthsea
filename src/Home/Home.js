import React, {useState} from 'react'
import Part from '../shared/Part'
import MyCard from '../shared/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Data from '../fake'
// import Image from '../img/cool.png'
import Image from '../img/cool2.png'


export default function Home() {
    const width = window.innerWidth
    const PartOneRight = (
        <div className='ursula py-3'>
            
            Encyklopedia uniwersum Ziemiomorza autorstwa Ursuli Le Guin.
        </div>
    )
    const [articles, setArticles] = useState(Data)

    return (
        <div id="home-page container-fluid" >

            <Part Image size='larger' height='100px' right={PartOneRight} />

            <Container fluid style={{
                    backgroundImage: `url(${Image})`,
                    
                }}>
                <Row className=' mx-1 py-3 justify-content-center'>

                    <Col xs={12} xl={{span:8, offset:1}}>
                        <Row className='py-2 justify-content-center'
                        >
                        {articles.map(row => (
                            <MyCard 
                            homeWidth
                            key={row.description}
                            title={row.title}
                            description={row.description}
                            image={row.image}
                            slug={row.slug}>

                            </MyCard>
                        ))}
                        </Row>
                    </Col>
                    <Col xs={12} xl={2}>
                        <div className='d-none d-xl-block pl-4'>
                        <Row className='justify-content-center py-5'>
                            <Col xs={12} className='py-3 news'>
                                <Part Image height='10px' left={<div className='ursula'>Najnowsze</div>} size='xx-large'>
                                </Part>
                            </Col>


                            <MyCard fullWidth />
                            <MyCard fullWidth />
                            <MyCard fullWidth />


                        </Row>
                        </div>
                        <div className='d-block d-xl-none'>
                        <Row className='justify-content-center py-5'>
                            <Col xs={12} className='news' >

                                <Part Image height='10px' left={<div className='ursula w-100'>Najnowsze</div>} size='xx-large'>
                                </Part>
                                </Col>


                            <MyCard fullWidth />
                            <MyCard fullWidth />
                            <MyCard fullWidth />


                        </Row>
                        </div>

                    </Col>
                </Row>
            </Container>




        </div>
    )
}