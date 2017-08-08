/*const clientCode = () => { 
    import('./client').then(module => module);
    import('./registerServiceWorker').then(registerServiceWorker => registerServiceWorker);
};

const serverCode = () => {
    import('./index.css');
    import('react').then(React => {
        import('react-snapshot').then(snapshot => {
            import('./App').then(App => {
                snapshot.render(<App.default />, document.getElementById('root'));
            });
        });
    });
}

serverCode();

clientCode();*/

import React from 'react';
import { render } from 'react-snapshot';
import './index.css';
import App from './App';

import * as client from './client';

import registerServiceWorker from './registerServiceWorker';

console.log(window);
render(<App />, document.getElementById('root'));
registerServiceWorker();
