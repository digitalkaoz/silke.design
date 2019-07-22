import React, {RefObject} from "react";

type UniversalContext = {
    error?: string;
  };
  
export const stripTags = (html: string): string => {
  if (typeof window === "undefined") {
    return html.replace(/(<([^>]+)>)/gi, "");
  }

  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;

  return tmp.textContent || tmp.innerText;
};

// TODO below are all sideeffects
export const getParameterByName = (name: string): boolean => {
  if (typeof window === "undefined") {
    return true;
  }
  const search = new URLSearchParams(window.location.search);

  return search.has(name);
};

export const isMobile = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(max-width: 600px)").matches;

export const toId = (text: string): string =>
  stripTags(text).toLowerCase().replace(/ /g, "-");


export const Failed = (context: UniversalContext): any => {
  if (context.error) {
    console.error(context.error);
  }

  return <span />;
}

export const Loading = (): any => <span />;

export const getDistance = (container: RefObject<any>) : number => {
  if (!container.current) {
      return 1
    }
    const currentScroller = container.current.nextSibling;
    if (!currentScroller) {
      return 1;
    }

    return currentScroller.getBoundingClientRect().top / window.innerHeight;
  }
