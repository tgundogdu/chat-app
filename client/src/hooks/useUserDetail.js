import { useEffect, useState } from "react";
import { UserServices } from "../services";

const useUserDetail = (user) => {
  const isLoaded = typeof user === "string" ? false : true;
  const [userObj, setUserObj] = useState(isLoaded ? user : null);

  useEffect(() => {
    if (!userObj) {
      UserServices.userList([user])
        .then((response) => {
          setUserObj(response.data[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return { userObj };
};

export default useUserDetail;
