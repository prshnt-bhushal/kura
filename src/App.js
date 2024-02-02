import { auth } from './firebase-config.js';
import { useAuthState } from 'react-firebase-hooks/auth';

import Chat from './components/Chat.js';
import Signup from './pages/SignUp.js';

function App() {
  const welcomeText = 'Welcome to the Kura!';
  const [user] = useAuthState(auth);
  return (
    <>
      {user ? (
        <Chat />
      ) : (
        <>
          <h2 className="w-full text-center pt-3">{welcomeText}</h2>
          <Signup />
        </>
      )}
    </>
  );
}
export default App;
