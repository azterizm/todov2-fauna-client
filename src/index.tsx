import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { BrowserRouter } from 'react-router-dom'
import { hydrate, render } from 'react-dom'

const rootElem = document.getElementById('root')
if (rootElem?.hasChildNodes()) {
  hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    rootElem
  )
} else {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    rootElem
  )
}

serviceWorkerRegistration.register();
