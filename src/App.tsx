import { Route, Switch } from 'react-router-dom';
import { AllTodos } from './AllTodos';
import { CreateTodo } from './CreateTodo';
import { Header } from './Header';
import { Login } from './Login';

function App() {
  return (
    <div className="container">
      <Header/>
      <Switch>
        <Route exact path='/' component={AllTodos} />
        <Route path='/login' component={Login} />
        <Route path='/add' component={CreateTodo} />
      </Switch>
    </div>
  );
}

export default App;
