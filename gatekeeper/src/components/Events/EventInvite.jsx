import React from 'react'
import axiosInstance from '../../api/axiosApi'
import {useState, useEffect} from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

function EventInvite(event) {
  const [invites, setinvites] = useState([])
  const [searchInput, setSearchInput] = useState("");

  const [userlist, setuserlist] = useState([{}])
  const getUserNames = async () => {
    await axiosInstance.get('/api/usernamelistviewapi')
      .then(function(response){
        setuserlist(response.data);
        console.log(response.data)
        console.log(userlist)
      })
  }

  useEffect(() => {
    getUserNames();
  }, []);
  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnHover = (result) => {
    // the user hovered
    console.log(result)
  }

  const handleOnSelect = (user) => {
    // the user selected
    console.log(user)
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const formatResult = (user) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>id: {user.id}</span>
        <span style={{ display: 'block', textAlign: 'left' }}>name: {user.username}</span>
      </>
    )
  }
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ width: 400 }}>
          <ReactSearchAutocomplete
            items={userlist}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
          />
        </div>
      </header>
    </div>
  )
}

export default EventInvite