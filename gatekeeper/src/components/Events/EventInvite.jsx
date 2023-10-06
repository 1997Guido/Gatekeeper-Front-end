import React from "react";
import axiosInstance from "../../api/axiosApi";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Select from "react-select";
import "./../../css/Events/EventInvite.css";
import { useCookies } from "react-cookie";
import { motion } from "framer-motion";
function EventInvite(event) {
  let csrftoken = useCookies(["csrftoken"]);
  const [userlist, setuserlist] = useState([{}]);
  const [currentInvitedUsers, setcurrentInvitedUsers] = useState([{}]);
  const tempList = [{}];
  const invitedUsers = [];
  const [selectedOption, setSelectedOption] = useState(null);
  const getUserNames = async () => {
    await axiosInstance.get(`/api/username?show=all`).then(function (response) {
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
      .get(`/api/event/${event.eventdata.pk}/?show=guests`, {
        headers: { "X-CSRFToken": csrftoken[0].csrftoken },
      })
      .then(function (response) {
        console.log("invited_user:", response.data);
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
      .patch(
        `/api/eventinvite/${event.eventdata.pk}/`,
        {
          invited: selectedOption,
        },
        { headers: { "X-CSRFToken": csrftoken[0].csrftoken } }
      )
      .then(function (response) {
        getInvitedUsers();
        console.log(response);
      });
  };
  const unInvite = (invite) => {
    axiosInstance
      .patch(
        `/api/eventuninvite/${event.eventdata.pk}/`,
        {
          uninvited: selectedOption,
        },
        { headers: { "X-CSRFToken": csrftoken[0].csrftoken } }
      )
      .then(function (response) {
        getInvitedUsers();
        console.log(response);
      });
  };

  function chunkArray(array, chunkSize) {
    const chunked = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunked.push(array.slice(i, i + chunkSize));
    }
    return chunked;
  }

  useEffect(() => {
    getUserNames();
    getInvitedUsers();
    console.log("i should fire once");
  }, []);
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
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
                  onClick={() => unInvite("Uninvite")}
                >
                  Uninvite
                </button>
                <div className="col InvitedUsersTitle">Invited Users:</div>
                <div className="row">
                  {chunkArray(currentInvitedUsers, 2).map((pair, index) => (
                    <div key={index} className="col">
                      <div className="row">
                        {pair.map((user, i) => (
                          <div key={i} className="col">
                            {typeof user === "string" ||
                            typeof user === "number"
                              ? `${index * 2 + i + 1}: ${user}`
                              : "Invalid user type"}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default EventInvite;
