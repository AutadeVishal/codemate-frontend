import React from 'react'
import { useParams } from 'react-router-dom'

const Chat = () => {
    const {toUserId}=useParams();
    console.log(toUserId)
  return (
    <div><h1 className="p-t border-4 ">Chat </h1></div>
  )
}

export default Chat