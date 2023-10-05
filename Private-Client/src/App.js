import UsersData from './Db/db.json'
import './App.css';
import React from 'react';
import User from './Components/UserDetail/User';
import axios from 'axios';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import PrivateUser from './Pages/Private/PrivateUser';
//json-server --watch db.json --port 3001
function App() {
  const [blackList,setblackList] = React.useState([]);
  React.useEffect(()=>{
    setblackList(UsersData.blackList);
  },[UsersData.blackList.length])
  const idChecker = (data,id) => {
    for(let i of data){
      if(i.chat_id === id){
        return true
      }
    }
    return false
  }
  const blockUser = (name,chat_id,id) => {
    const blockedUserInfo = {name:name,chat_id:chat_id,id:id};
    if(!idChecker(blackList,chat_id)){
      axios.post("http://localhost:3001/blackList",blockedUserInfo)

    }
    
    // console.log(name,chat_id)
}
  const [users,setusers] = React.useState([]);
  
  const [onlyClearUsersWidtId,setOnlyClearUsers] = React.useState([]);
  const findObj = (data,id) => {
    for(let i of data ){
      if(i.chat_id === id){
        return {
          name:i.name,
          surname:i.surname,
          id:i.id,
          chat_id:i.chat_id
        }
      }
    }
  }
  function clearData(data){
    let res = [];
    for(let i of data){
      if(!res.includes(i.chat_id)){
        res.push(i.chat_id)
      }
    }
    return res
  }
  const getAllData = (data,ids) => {
    let res = [];
    for(let i of ids){
      res.push(findObj(data,i))
    }
    return res
  }
  React.useEffect(()=>{
    setusers(UsersData.users)
  },[UsersData.users.length])

  const [onlyUsers,setonlyusers] = React.useState(clearData(users));
  console.log(users,clearData(users))
  console.log(getAllData(users,onlyUsers))
  const LiEl = getAllData(users,clearData(users))?.map((data,index)=>{
    return <User  blackList={blackList} key={index} blockUser={blockUser} name={data.name} surname={data.surname} text={data.text} chat_id = {data.chat_id} id={data.id} num={index+1} />
  })
  return (
    <Router>
      <Routes>
   
      <Route path='/' element={ <div className="App">
      <h1>Users-<span>{getAllData(users,clearData(users)).length}</span>,Blocked-Users-<span style={{color:"red"}}>{blackList.length}</span></h1>
      {LiEl}
      </div>} />
      <Route path='/private/:id' element={<PrivateUser idChecker={idChecker} blackList={blackList} users = {users} />} />
    
    </Routes>
    </Router>
  );
}

export default App;
