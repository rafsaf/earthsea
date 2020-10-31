import React, {useState} from 'react'
import {
    Link,
    Redirect,
  } from "react-router-dom";

export default function Characters() {
    const [redirect, setRedirect] = useState(false)
    const [param, setParam] = useState('')
    
    if (redirect) {
        return <Redirect to={param}/>
    }
    return (
        <div>
            Postacie<br />
            <Link to='/Ged' onClick={()=>{
                setParam('/Ged')
                setRedirect(true)
            }} >
                Ged
            </Link>
        </div>
    )
}