import React from 'react'

export default function Error404({ location }) {
    return (
        <div>
            <h2>No match found for <code>{location.pathname}</code></h2>
            <p style={{fontSize:'200px', margin:'0'}}>404</p>
            <p style={{fontSize:'200px', margin:'0'}}>:(</p>
        </div>
    )
}
