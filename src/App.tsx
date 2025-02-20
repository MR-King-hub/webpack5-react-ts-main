import React, { lazy, Suspense, useState,useRef } from 'react'
import './app.less'
// @ts-ignore
import {AgentUi} from 'block';

import * as wedaClient from "@cloudbase/weda-client";

wedaClient.app.init({
  /** 当前是否处于正式发布模式 */
  isProd: true,
  /** 低码应用ID */
  /** 云开发环境ID */
  envId: "TODO REPLACE YOUR OWN ENVID",
});


function App() {
  const [ show, setShow ] = useState(false)
  const myComponentRef = useRef();

  return (
    <>
      <AgentUi ref={myComponentRef} bot={{botId:'bot-f3c6bedc'}}></AgentUi>
    </>
  )
}
export default App