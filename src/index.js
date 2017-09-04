import React from 'react';
import { render } from 'react-snapshot';
import './index.css';
import App from './App';

import './client';

import registerServiceWorker from './registerServiceWorker';

render(<App />, document.getElementById('root'));
registerServiceWorker();
