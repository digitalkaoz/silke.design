import '@fontsource/fjalla-one';
import '@fontsource/roboto/100.css';
import '@fontsource/roboto/400.css';
import './App.scss';

import Header from './components/Header';
import Footer from './components/Footer';
import Skills from './components/Skills';
import Projects from './components/Projects';

import footerLinks from './config/footer.json';
import skills from './config/skills.json';
import projects from './config/projects.json';

function App() {
  return (
    <>
      <Header />
      <main>
        <Skills skills={skills} />
        <Projects projects={projects} />
      </main>
      <Footer links={footerLinks} />
    </>
  );
}

export default App;
