import React, {useState, useEffect} from 'react'
import {
    Switch,
    Route,
    Link,
    Redirect,
    useRouteMatch,
    useParams,
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