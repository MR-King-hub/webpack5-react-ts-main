import React, { lazy, Suspense, useState } from 'react'
import './app.less'
// @ts-ignore
import {Index} from 'block';

// prefetch

function App() {
  const [ show, setShow ] = useState(false)

  return (
    <>
      <Index></Index>
    </>
  )
}
export default App