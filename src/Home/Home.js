import React from 'react'
import Image1 from '../img/img2.jpg'
import Image2 from '../img/img4.jpg'
import Part from '../shared/Part'

function PartOne() {
    return (
        <div className='part-1 justify-content-center'>
            
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
            <div className="d-none d-lg-block ml-5">
                <img height='380' src={Image1} alt="czarnoksieznik-z-archipelagu" />
            </div>

        </div>
    )
}

function PartTwo() {
    return (
        <div className='part-2 justify-content-center'>
            <div className="d-none d-lg-block mr-5">
                <img height='480' src={Image2} alt="czarnoksieznik-z-archipelagu" />
            </div>
            <div className='part'>
            Ursula K. Le Guin <br />
            ur. 21 października 1929 w Berkeley, zm. 22 stycznia 2018 w Portland.<br /><br />
            Amerykańska pisarka, autorka książek SF i fantasy, z których wiele weszło do klasyki gatunku. Stworzyła cykle Ziemiomorze i Ekumena.
            </div>

        </div>

    )
}
function PartThree() {
    return (
        <div className='part-3 justify-content-center'>
            
            <div className='part'>
            KOLEJNE CZĘŚCI CYKLU<br /><br />
            <li>Czarnoksiężnik z archipelagu</li>
            <li>Grobowce Atuanu</li>
            <li>Najdalszy brzeg</li>
            <li>Tehanu</li>
            <li>Inny wiatr</li>
            </div>

        </div>

    )
}



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
        <img height='380' src={Image1} alt="czarnoksieznik-z-archipelagu" />
    )
    
    return (
        <div id="home-page">
        <Part left={PartOneText} right={PartOneImage} />
        <PartTwo />
        <PartThree />
        </div>
    )
}