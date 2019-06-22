import React from "react";
import ReactDOM from "react-dom";

// Your top level component
import App from "./components/App";

/*if (process.env.NODE_ENV !== "production") {
  const { whyDidYouUpdate } = require("why-did-you-update");
  whyDidYouUpdate(React);
}*/

// Export your top level component as JSX (for static rendering)
export default App;

// Render your app
if (typeof document !== "undefined") {
  const renderMethod = module.hot
    ? ReactDOM.render
    : ReactDOM.hydrate || ReactDOM.render;

  const render = (Comp) => {
    renderMethod(<React.Suspense fallback={<em>...loading...</em>}><Comp /></React.Suspense>, document.getElementById("root"));
  };

  // Render!
  render(App);

  // Hot Module Replacement
  if (module.hot) {
    module.hot.accept("./components/App", () =>
      render(require("./components/App").default)
    );
  }
}

export function isMobile() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(max-width: 600px)").matches
  );
}

export function toId(text) {
  return text.toLowerCase().replace(/ /g, '-');
}
