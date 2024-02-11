import React from 'react'
import { TypeAnimation } from 'react-type-animation'

const Editor = ({sequence}) => {
  return (
    <div className='flex flex-row'>
      <div>
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <p>6</p>
        <p>7</p>
        <p>8</p>
        <p>9</p>
        <p>10</p>
      </div>
      <div>
        <TypeAnimation
        sequence={[sequence]}
        speed={5}
        style={{ fontWeight: 700, fontSize: '14px', lineHeight: '22px',
        fontFamily: 'Roboto Mono', color: '#E7BC5B'}}
        repeat={Infinity}
        omitDeletionAnimation={true}
        />
        
      </div>
    </div>
  )
}

export default Editor
