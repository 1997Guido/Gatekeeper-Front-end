import React from "react";
import axiosInstance from "../../api/axiosApi";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Select from "react-select";
import "./../../css/EventInvite.css";
import { useCookies } from "react-cookie";

function EventInvite(event) {
  let csrftoken = useCookies(["csrftoken"]);
  const [userlist, setuserlist] = useState([{}]);
  const [currentInvitedUsers, setcurrentInvitedUsers] = useState([{}]);
  const tempList = [{}];
  const invitedUsers = [];
  const [selectedOption, setSelectedOption] = useState(null);
  const getUserNames = async () => {
    await axiosInstance
      .get(`/api/usernameviewapi?allusers=yes`)
      .then(function (response) {
        console.log("response.data:", response.data);
        for (let i = 0; i < response.data.length; i++) {
          if (tempList.includes(response.data[i].id) === false) {
            tempList.push({
              value: response.data[i].id,
              label: response.data[i].username,
            });
          }
        }
        setuserlist(tempList);
      });
  };
  const getInvitedUsers = async () => {
    await axiosInstance
      .post(
        "/api/getinvitedusers",
        {
          pk: event.eventdata.pk,
        },
        { headers: { "X-CSRFToken": csrftoken[0].csrftoken } }
      )
      .then(function (response) {
        console.log("response.data:", response.data);
        setcurrentInvitedUsers(response.data);
      });
  };

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    invitedUsers.push(selectedOption);
    console.log("invitedUsers", invitedUsers);
    console.log(`Option selected:`, selectedOption);
  };

  const Invite = (invite) => {
    axiosInstance
      .post(
        "/api/eventinviteapi",
        {
          pk: event.eventdata.pk,
          invitedUsers: selectedOption,
          inv: invite,
        },
        { headers: { "X-CSRFToken": csrftoken[0].csrftoken } }
      )
      .then(function (response) {
        getInvitedUsers();
        console.log(response);
      });
  };

  useEffect(() => {
    getUserNames();
    getInvitedUsers();
    console.log("i should fire once");
  }, []);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col EventBanner">Invite</div>
        </div>
        <Select
          defaultValue={selectedOption}
          onChange={handleChange}
          options={userlist}
          isMulti={true}
        />
        <div className="EventInviteContainer">
          <div className="row">
            <div className="col">
              <button
                className="btn btn-primary"
                onClick={() => Invite("Invite")}
              >
                Invite
              </button>
              <button
                className="btn btn-primary"
                onClick={() => Invite("Uninvite")}
              >
                Uninvite
              </button>
              {currentInvitedUsers.map((user, index) => (
                <div key={index}>{user.username}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventInvite;
