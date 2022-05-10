import React from 'react'

export default function Square({children, black}) {

    const bgColor = black?'square-black':'square-white'
    return (
        <div className={bgColor + ' board-square'}>{children}</div>
    )
}
