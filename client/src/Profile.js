import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";

const Profile = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const { user, isAuthenticated } = useAuth0();
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  console.log(user);
  // useEffect(() => {
  //   if (isAuthenticated && user) {
  //     fetch(`/users/${user.email}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         window.sessionStorage.setItem(
  //           "userId",
  //           JSON.stringify(data.data._id)
  //         );
  //         setCurrentUser(data.data._id);
  //       })
  //       .catch((e) => {
  //         console.log("Error: ", e);
  //       });
  //   }
  // }, [isAuthenticated]);

  return (
    isAuthenticated &&
    currentUser && (
      <article className="column">
        <h1>{currentUser}</h1>
      </article>
    )
  );
};

export default Profile;
