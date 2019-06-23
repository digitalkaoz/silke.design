import React from "react";
import ReactDOM from "react-dom";

// Your top level component
import App from "./components/App";

// Export your top level component as JSX (for static rendering)
export default App;

// Render your app
if (typeof document !== "undefined") {
  const target = document.getElementById("root");

  if (!target) {
    throw new Error("#root not found to mount app");
  }

  const renderMethod = target.hasChildNodes()
    ? ReactDOM.hydrate
    : ReactDOM.render;

  const render = (Comp: React.FunctionComponent<any>) => {
    renderMethod(
      <React.Suspense fallback={<em>Loading...</em>}>
        <Comp />
      </React.Suspense>,
      target
    );
  };

  // Render!
  render(App);

  // Hot Module Replacement
  if (module && module.hot) {
    module.hot.accept("./components/App", () => {
      render(App);
    });
  }
}
