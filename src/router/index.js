export * from "@reach/router-original";

export const navigate = (url, options) => {
  // when we do not replace the current url or the replacement is just adding a slash we navigate
  // this fixes canonical redirects
  if (!options.replace || window.location.href + '/' === url) {
    window.location = url;
  }
};
