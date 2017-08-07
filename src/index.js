import React from 'react';
import { render } from 'react-snapshot';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

require('./materialize');

render(<App />, document.getElementById('root'));
registerServiceWorker();
