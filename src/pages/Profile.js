import { useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { signout } from '../methods/firebase';
import AuthContext from '../methods/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    await signout();
  };

  if (!user) {
    return <Navigate replace to="/login" />;
  }
  return (
    <>
      <h1>Profile</h1>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Profile;
