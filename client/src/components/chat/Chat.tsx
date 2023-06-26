import React from 'react'
import Header from './Header'

type Props = {
  publicKey: string | null
  
}

const Chat = (props: Props) => {
  return (
    <>
    <Header />
    <div className=''>
      This is the chat Card!
    </div>
    </>
  )
}

export default Chat