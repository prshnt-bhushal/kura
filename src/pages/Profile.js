import { useContext } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { signout } from '../methods/firebase';
import AuthContext from '../methods/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signout();
    // Redirect to the login page after logout
    navigate('/login');
  };

  if (!user) {
    // If user is not authenticated, navigate to login page
    return <Navigate replace to="/login" />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-semibold mb-4">Profile</h1>
      <p className="mb-4">Welcome, {user.email}</p>
      <Link className="mb-8" to="/">
        Go to homepage
      </Link>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
