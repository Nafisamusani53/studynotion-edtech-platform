import React from 'react'

const HighlightText = ({text, bg}) => {
  return (
    <span className={`${bg} bg-clip-text text-transparent font-bold text-4xl`}>
      {` ${text} `}
    </span>
  )
}

export default HighlightText
