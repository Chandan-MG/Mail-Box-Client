// import logo from './logo.svg';
import './App.css';
import {Switch, Route} from 'react-router-dom/cjs/react-router-dom'
import AuthForm from './Componets/Auth/AuthForm';

function App() {
  return (
    <>
      <Switch>
        <Route path='/' exact>
          <AuthForm />
        </Route>
      </Switch>
    </>
  );
}

export default App;
