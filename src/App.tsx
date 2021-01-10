import { Route, Switch } from 'react-router-dom';
import { AllTodos } from './AllTodos';
import { CreateTodo } from './CreateTodo';
import { Header } from './Header';
import { Login } from './Login';
import green_checkmark from './assets/green_checkmark.png'
import { ReactElement, useState } from 'react';
import { NotFound404 } from './NotFound404';

function App() {
  const [showAlert, setShowAlert] = useState<boolean>(false)

  window.addEventListener('load', () => {
    if (!navigator.onLine) setShowAlert(true)
  })

  window.addEventListener('online', function () {
    setShowAlert(false)
  }, false);

  window.addEventListener('offline', function () {
    setShowAlert(true)
  }, false)

  let OfflineAlert: ReactElement =
    <button className='alertBtn'>
      App is working in offline mode
      <img src={green_checkmark} alt='' className='alertCheck' />
    </button>

  return (
    <div className="container">
      <Header />
      <Switch>
        <Route exact path='/' component={AllTodos} />
        <Route path='/about' render={() => <h1>This is a practice project</h1>} />
        <Route path='/contact' render={() => <h1>Checkout Github page.</h1>} />
        <Route path='/login' component={Login} />
        <Route path='/add' component={CreateTodo} />
        <Route component={NotFound404} />
      </Switch>
      {showAlert && OfflineAlert}
    </div>
  );
}

export default App;
