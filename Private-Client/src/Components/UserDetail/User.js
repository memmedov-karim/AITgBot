import React from 'react';
import './user.css';
import axios from 'axios';
export default function User({name,surname,text,chat_id,id,blockUser,blackList,num}) {
    const idChecker = (data,id) => {
        for(let i of data){
          if(i.chat_id === id){
            return true
          }
        }
        return false
      }
    const goUser = (chat_id) => {
        window.location.href = `/private/${chat_id}`
    }
    const UnBlock = (id) => {
        console.log(chat_id)
        axios.delete(`http://localhost:3001/blackList/${id}`)
    }
  return (
    <div className='user'>
        <span>{num}</span>
        <div className='side left'>
            <div className='name-surname'>
                <div>Name:<span>{name}</span></div>
                <div>Surname:<span>{surname}</span></div>
            </div>
            <div className='text'>
                {text}
            </div>
            <div className='chat-id'>
                <small>Id:<span>{id}</span></small>

                <small>Chat_id:<span>{chat_id}</span></small>

            </div>
        </div>
        <div className='side right'>
            <button onClick={()=>goUser(chat_id)} className='btn'>Go user</button>

            <button onClick={()=>blockUser(name,chat_id,id)} className='btn block'>{idChecker(blackList,chat_id) ? "Blocked" : "Block"}</button>
            <button onClick={()=>UnBlock(id)} className='btn unblock'>{idChecker(blackList,chat_id) ? "UnBlock" : "UnBlocked"}</button>

        </div>
    </div>
  )
}
