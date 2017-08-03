import React from 'react';

import Header from './Header/Header.js';
import Footer from './Footer/Footer.js';
import Skills from './Skills/Skills.js';
import Projects from './Projects/Projects.js';

const App = () =>
  <div>
    <Header />
    <main>
      <Skills />
      <Projects />
    </main>
    <Footer />
  </div>;

export default App;
