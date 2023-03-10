import { Avatar } from '@material-ui/core'
import React, { useState, useEffect} from 'react'
import '../css/SidebarChat.css'

function SidebarChat({newChat}) {
  const [random__number, setrandom__number] = useState('');
  useEffect(() => {
    setrandom__number(Math.floor(Math.random()*1000))
  }, [])

  const createChat = ()=>{
    const roomName = prompt('Enter your Room name')

    if (roomName) {
      alert('This functionality is not awailable right now!')
    }
  }
  
  return !newChat ? (
    <div className='sidebar__chat'>
      <Avatar src={`https://avatars.dicebear.com/api/human/${random__number}.svg`}/>
      <div style={{marginLeft:'18px'}} className='sidebar__chat__info'>
        <p><span style={{fontWeight: 'bold'}}>Room name </span><br/><span style={{fontSize:'13px'}}> Last message... </span></p>
      </div>
    </div>
  ) : (
    <div className='sidebar__chat' style={{fontWeight:'bold'}} onClick={createChat}>Add new Chat</div>
  )
}

export default SidebarChat