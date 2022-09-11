import { useEffect, useState } from "react";
import { UserServices } from "../services";

const useUserLookup = (defaultUsers, multiple) => {
  const [users, setUsers] = useState([]);
  const [defaultUserIds, setDefaultUserIds] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  const applyDefaultUsers = () => {
    const tmpArr = [];
    defaultUsers.forEach((element) => {
      tmpArr.push(element._id || element);
    });
    setDefaultUserIds(tmpArr);
  };

  const setSelectedUser = (userId) => () => {
    let tmpArr = [];
    if (multiple) {
      tmpArr = [...selectedUserIds];
      const selectedIndex = tmpArr.indexOf(userId);
      if (selectedIndex >= 0) {
        tmpArr.splice(selectedIndex, 1);
      } else {
        tmpArr.push(userId);
      }
    } else {
      if (selectedUserIds[0] !== userId) {
        tmpArr.push(userId);
      }
    }
    setSelectedUserIds(tmpArr);
  };

  useEffect(() => {
    applyDefaultUsers();

    UserServices.users()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return { users, defaultUserIds, selectedUserIds, setSelectedUser };
};

export default useUserLookup;
