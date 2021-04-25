import React from 'react';

export default function ErrorScreen(props){
    return(
        <div 
            style={
                {
                    width: '100%', 
                    height: '100%',
                    textAlign: 'center',
                    backgroundColor: 'white',                    
                }
            }
        >
            <div style={
                {
                    color: 'rgba(0, 0, 0, 0.54)',
                    fontWeight: 'bold',
                    fontSize: '2rem',
                    padding: '10px',
                }
            }>
                <span style={{margin: '0 10px'}}>
                    {':('}
                </span>
                <span>
                    {'Sorry...'}
                </span>
            </div>
            <div style={
                {
                    color: 'black',
                    fontSize: '1.5rem',
                }
            }>
                {`${props.message}`}
            </div>
        </div>
    )
}