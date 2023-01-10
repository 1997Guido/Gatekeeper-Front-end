import React from 'react'
import axiosInstance from '../../api/axiosApi'
import {useState, useEffect} from 'react'
import Select from 'react-select'
import './../../css/EventInvite.css'
import Async, { useAsync } from 'react-select/async';
function EventInvite(event) {
  const [userlist, setuserlist] = useState([{}])
  const [invitedUsers, setInvitedUsers] = useState([{}])
  console.log(userlist)
  const tempList = [{}]
  const [selectedOption, setSelectedOption] = useState(null);
  const getUserNames = async () => {
    await axiosInstance.get('/api/usernamelistviewapi')
      .then(function(response){
        console.log(userlist)
        console.log(response.data)
        if (userlist !== [{}]){
        for (let i = 0; i < response.data.length; i++) {
          if (tempList.includes(response.data[i].id) === false){
          tempList.push({value: response.data[i].id, label: response.data[i].username})
          }
        }
        setuserlist(tempList)
        console.log(userlist)
        }
      })
  }
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption)
    invitedUsers.push(selectedOption)
    console.log(`Option selected:`, selectedOption);
  };
  return (
  <>
    <div>
      <Select
        defaultValue={selectedOption}
        onChange={handleChange}
        options={userlist}
        isMulti={true}
      />
    </div>
    <div className='Invited'>
      {invitedUsers.map((user, index) => {
        <p>invited:{user.label}</p>
      })}
    </div>
  </>
  )
}

export default EventInvite