import React from 'react'
import Image1 from '../img/ziemiomorze.jpg'
import Image2 from '../img/img3.jpg'
import Part from '../shared/Part'
import MyCard from '../shared/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'


export default function Home() {
    const PartOneText = (
        <div>
            „Tylko w milczeniu słowo,<br />
            tylko w ciemności światło,<br />
            tylko w umieraniu życie:<br />
            na pustym niebie<br />
            jasny jest lot sokoła”<br />
            <br />
            „Czarnoksiężnik z Archipelagu”<br />
            Ursula K. Le Guin
        </div>
    )
    
    const PartOneImage = (
        <div>
            <img className='img-fluid py-3' src={Image1} alt="czarnoksieznik-z-archipelagu" />
        </div>
    )
    

    return (
        <div id="home-page">
        <Part size='larger' height='300px' left={PartOneText} right={PartOneImage} />
        
        <Container fluid style={{
            backgroundImage: `url(${Image2})`,
            backgroundColor: 'none'
        }}>
        <Row className='justify-content-center py-5'>
        <Col xs={12} xl={9}>
        <Row className='justify-content-center py-5'>
        <MyCard />
        <MyCard />
        <MyCard />
        <MyCard />
        <MyCard />
        <MyCard />
        <MyCard />
        <MyCard />
        <MyCard />
        <MyCard />
        <MyCard />
        <MyCard />
        </Row>
        </Col>
        <Col xs={12} xl={3}>
        <Row className='justify-content-center py-5'>
        <Col xs={12} className='py-3'>
            <Part height='10px' left={<div>Najnowsze</div>} size='xx-large'>
            </Part>
        </Col>
           
       
        <MyCard fullWidth/>
        <MyCard fullWidth/>
        <MyCard fullWidth/>


        </Row>
        </Col>
        </Row>
        </Container>
        
        
        
        
        </div>
    )
}