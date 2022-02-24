// We override loadPage & loadPagesync to fix canonical redirects
// we also override hovering to disable hover prefetch
exports.onClientEntry = () => {
  const loader = window.___loader;

  // if development or no loader exists we shouldn't do anything
  if (process.env.NODE_ENV === 'development' || !loader) {
    return;
  }

  const pagePath = window.pagePath;
  const location = window.location;

  if (
    pagePath &&
    pagePath !== location.pathname &&
    pagePath !== location.pathname + '/'
  ) {
    const originalLoadPageSync = loader.loadPageSync;
    const originalLoadPage = loader.loadPage;

    loader.loadPageSync = path => {
      let pageResources;
      // With Gatsby V4, path has been appended with window.location.search when invoking loadPageSync
      const pathWithoutQueryParams = path.replace(location.search, '');

      // if the pathWithoutQueryParams is the same as our current page we know it's not a prefetch
      if (pathWithoutQueryParams === location.pathname) {
        pageResources = originalLoadPageSync(pagePath);
      } else {
        pageResources = originalLoadPageSync(pathWithoutQueryParams);
      }

      if (pageResources.page) {
        pageResources.page.matchPath = '*';
      }

      return pageResources;
    };

    loader.loadPage = path => {
      let pageResources;
      // With Gatsby V4, path has been appended with window.location.search when invoking loadPage
      const pathWithoutQueryParams = path.replace(location.search, '');

      // if the pathWithoutQueryParams is the same as our current page we know it's not a prefetch
      if (pathWithoutQueryParams === location.pathname) {
        pageResources = originalLoadPage(pagePath);
      } else {
        pageResources = originalLoadPage(pathWithoutQueryParams);
      }

      if (pageResources.page) {
        pageResources.page.matchPath = '*';
      }

      return pageResources;
    };
  }

  // disable hovering prefetching as we don't know if we can.
  loader.hovering = () => {};
};

// we also need to disable prefetching as we don't know the exact page-data path.
// TODO look at prefetch a whole html page on hover?
exports.disableCorePrefetching = () => true;
