import React from 'react';

export default function Gauge(props) {
    return (
        <div 
            style={
                {
                    height: `${props.height}px`,
                    width: `${props.width}px`,
                    backgroundColor: '#bdbdbd',
                }
            }
        >
            <div 
                style={
                    {
                        height: `${props.height}px`,
                        width: `${Math.round(props.ratio*props.width)}px`,
                        backgroundColor: '#3f51b5',
                    }
                }
            />
        </div>
    );
}