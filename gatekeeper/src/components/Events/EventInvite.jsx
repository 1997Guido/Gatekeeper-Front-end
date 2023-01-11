import React from "react";
import axiosInstance from "../../api/axiosApi";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Select from "react-select";
import "./../../css/EventInvite.css";
import { useCookies } from "react-cookie";
function EventInvite(event) {
  let csrftoken = useCookies(['csrftoken'])
  const [userlist, setuserlist] = useState([{}]);
  console.log("userlist", userlist);
  const tempList = [{}];
  const invitedUsers = [];
  const [selectedOption, setSelectedOption] = useState(null);
  const getUserNames = async () => {
    await axiosInstance
      .get("/api/usernamelistviewapi")
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
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    invitedUsers.push(selectedOption);
    console.log("invitedUsers", invitedUsers)
    console.log(`Option selected:`, selectedOption);
  };
  const Invite = () => {
    axiosInstance.post("/api/eventinviteapi", {
      invitedUsers: invitedUsers,
    }, {headers: {'X-CSRFToken': csrftoken[0].csrftoken}})
      .then(function (response) {
        console.log(response)
        });
  }
  useEffect(() => {
    getUserNames();
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
          <div className="row SelectBox">
            <div className="col">
              <div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventInvite;
