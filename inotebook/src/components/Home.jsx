import React from 'react'
import Notes from './Notes'

function Home(props) {
  return (
    <>
      <Notes showalert={props.showalert}/>
    </>
  )
}

export default Home
