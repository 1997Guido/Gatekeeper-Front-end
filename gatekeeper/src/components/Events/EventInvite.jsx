import React from "react";
import axiosInstance from "../../api/axiosApi";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Select from "react-select";
import "./../../css/Events/EventInvite.css";
import { useCookies } from "react-cookie";
import { motion } from "framer-motion";
import * as TbIcons from "react-icons/tb";
function EventInvite(event) {
  let csrftoken = useCookies(["csrftoken"]);
  const [userlist, setuserlist] = useState([{}]);
  const [invitedUsers, setInvitedUsers] = useState([]);
  const tempList = [{}];
  const [selectedOption, setSelectedOption] = useState(null);
  const getUserNames = async () => {
    await axiosInstance.get(`/api/username?show=all`).then(function (response) {
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
        setInvitedUsers(response.data);
        setSelectedOption(null);
      });
  };

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
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
        setSelectedOption(null);
      });
  };
  const unInvite = (username) => {
    axiosInstance
      .patch(
        `/api/eventuninvite/${event.eventdata.pk}/`,
        {
          username: username,
        },
        { headers: { "X-CSRFToken": csrftoken[0].csrftoken } }
      )
      .then(function (response) {
        getInvitedUsers();
        setSelectedOption(null);
      });
  };

  useEffect(() => {
    getUserNames();
    getInvitedUsers();
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
            <div className="row">
              <div className="col text-center">
                <button
                  className="btn btn-primary m-2"
                  onClick={() => Invite("Invite")}
                >
                  Invite
                </button>
              </div>
            </div>
          <div className="EventInviteContainer">
            <div className="InvitedUsersTitle">Guestlist</div>
            <ul className="list-group InvitedUsers">
              {invitedUsers.map((username) => (
                <li className="list-group-item text-start">
                  <div className="row">
                    <div className="col text-white text-start">{username}</div>
                    <div className="col">
                      <TbIcons.TbTrash
                        onClick={() => unInvite(username)}
                        className="EventDeleteButton"
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default EventInvite;
