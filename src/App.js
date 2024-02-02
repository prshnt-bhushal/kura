import { auth } from './firebase-config.js';
import { useAuthState } from 'react-firebase-hooks/auth';

import SignIn from './pages/SignIn.js';
import Chat from './components/Chat.js';

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
          <SignIn />
        </>
      )}
    </>
  );
}
export default App;
