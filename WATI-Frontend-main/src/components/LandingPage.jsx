import React from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import './landingpage.css';
let new_friends;
if(window.localStorage.getItem('UserData'))
new_friends = JSON.parse(window.localStorage.getItem('UserData')).friends;

if(new_friends==null){
  new_friends  = [];
}
export default function LandingPage() {
    const navigate = useNavigate();
    const user =  JSON.parse(window.localStorage.getItem('UserData'));
    const name = JSON.parse(window.localStorage.getItem('UserData')).name;
    const [Id,setId] = useState('')
    const [friendName,setfriendName] = useState('')
    const [PhoneNumber,setPhoneNumber] = useState('')
    const id=useParams();
    // const [friends,setfriends] = useState(JSON.parse(window.localStorage.getItem('UserData')).friends);
    function addFriends(){
      const newFriend = {
        Id: toString(id),
        Name: friendName,
        Email: PhoneNumber,
      };
       
      console.log(newFriend);
  
      axios
        .post('https://localhost:7126/api/addFriend', newFriend)
        .then((res) => {
          console.log('Friend added successfully:', res.data);
          // Optionally, you can navigate to another page after adding the friend
          navigate('/viewlist');
        })
        .catch((err) => {
          console.error('Error adding friend:', err);
          window.alert('Error in adding');
        });

    }

  return (
    <>
    <div className='flex flex-col'>
      <div className='flex' >
           <div className='text-[50px]'>Landing page</div>  
              <div className='mr-[10px]'>

                  <button  className=' text-[20px] absolute mt-[40px] ml-[800px] border-[2px] border-[black] bg-[red]' onClick={()=>{navigate('/')}}>Log Out</button>
                      
              </div>
      </div>
      <div className='mt-10 text-[30px]' >
                <label>Student Name</label>
               <input 
                  type="text" 
                  className='ml-[2px] border-[2px] border-[black]'
                  value={friendName}
                  onChange={(e) => setfriendName(e.target.value)}
              />  
              <div className='mt-10'>

              </div>
              <label>Student E-mail</label>
               <input 
                  type="text" 
                  className='ml-[2px] border-[2px] border-[black]'
                  value={PhoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
              />  
              <div className='ml-[10px]'>

                  <button  className=' text-[20px]  border-[2px] border-[black] bg-[cyan]' onClick={()=>{addFriends()}}>Add Friends</button>
                      
              </div>
      </div>
      <div className='flex flex-col'>
      <button  className=' text-[20px]  center  border-[2px] border-[black] bg-[cyan]' onClick={()=>{navigate('/viewlist')}}>ViewList</button>
      </div>
    </div>
    
    </>
    
  )
}
