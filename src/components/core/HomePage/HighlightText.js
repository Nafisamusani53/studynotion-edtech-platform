import React from 'react'

const HighlightText = ({text, style}) => {
  return (
    <span className={`${style} font-bold`}>
      {` ${text} `}
    </span>
  )
}

export default HighlightText
