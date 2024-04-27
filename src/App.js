// import logo from './logo.svg';
import './App.css';
import {Switch, Route} from 'react-router-dom/cjs/react-router-dom'
import AuthForm from './Componets/Auth/AuthForm';
import MailBox from './Componets/Sceens/MailBox';
import InBox from './Componets/Sceens/InBox';
import InBoxItem from './Componets/Sceens/InBoxItem';
import SentBox from './Componets/Sceens/sentBox';
import SentBoxItem from './Componets/Sceens/sentBoxItem.js';

function App() {
  return (
    <>
      <Switch>
        <Route path='/' exact>
          <AuthForm />
        </Route>
        <Route path='/mailbox'>
          <MailBox />
        </Route>
        <Route path='/inbox'>
          <InBox />
        </Route>
        <Route path='/inboxitem'>
          <InBoxItem />
        </Route>
        <Route path='/sentbox'>
          <SentBox />
        </Route>
        <Route path='/sentboxitem'>
          <SentBoxItem />
        </Route>
      </Switch>
    </>
  );
}

export default App;
