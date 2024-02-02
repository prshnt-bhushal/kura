import { auth } from './firebase-config.js';
import { useAuthState } from 'react-firebase-hooks/auth';

import Chat from './components/Chat.js';
import Signup from './pages/SignUp.js';

function App() {
  const welcomeText = 'Welcome to the chat app!';
  const [user] = useAuthState(auth);
  return (
    <>
      {user ? (
        <Chat />
      ) : (
        <>
          {welcomeText}
          <br />
          <Signup />
        </>
      )}
    </>
  );
}
export default App;
