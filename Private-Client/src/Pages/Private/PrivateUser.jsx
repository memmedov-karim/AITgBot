import React from 'react'
import './privateuser.css';
import { useParams } from 'react-router-dom';
export default function PrivateUser({idChecker,blackList,users}) {
    const id = useParams().id;
    const [user,setUser] = React.useState([]);
    React.useEffect(()=>{
        setUser(users?.filter(data=>data.chat_id === Number(id)))
    },[users.length])
    console.log(idChecker(blackList,Number(id)))
    const TextElement = user?.map((val,index)=>{
        return <div key={index} className="item">
        <div className="number">{index+1}-</div>
        <div className="content">{val.text}</div>
    </div>
    })
    console.log(user[0])
    const {name,surname,chat_id} = user[0] ? user[0] : {}
  return (
    <div className='aps'>
        <div className="privateuser">
            <div className="head">
                {name} {surname} ,Chat-<small style={{color:"red"}}><u>{chat_id}</u></small>
            </div>
            <div className="text-container">
                <div className="text">User Questions</div>
                <div className="texts">
                    {TextElement}
                </div>
            </div>
            <div className="status"><span style={{color:"white",fontWeight:"bold"}}>Status:</span><span style={{fontSize:"15px",color:idChecker(blackList,Number(id)) ? "red" : "green",fontWeight:"bold"}}>{idChecker(blackList,Number(id)) ? "Blocked" : "Ok"}</span></div>
        </div>
    </div>
  )
}
