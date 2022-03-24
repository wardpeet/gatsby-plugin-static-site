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

  const parsePathComponents = pathAndQuery => {
    const queryIndex = pathAndQuery.indexOf('?');
    const path =
      queryIndex > -1 ? pathAndQuery.substr(0, queryIndex) : pathAndQuery;
    const query = queryIndex > -1 ? pathAndQuery.substr(queryIndex) : '';

    return { path, query };
  };

  if (
    pagePath &&
    pagePath !== location.pathname &&
    pagePath !== location.pathname + '/'
  ) {
    const originalLoadPageSync = loader.loadPageSync;
    const originalLoadPage = loader.loadPage;

    loader.loadPageSync = path => {
      // with Gatsby v4, 'path' can now be a path component, or path component + query
      const {
        path: pathComponent,
        query: queryComponent,
      } = parsePathComponents(path);

      let pageResources;
      // if the path is the same as our current page we know it's not a prefetch
      if (pathComponent === location.pathname) {
        pageResources = originalLoadPageSync(pagePath + queryComponent);
      } else {
        pageResources = originalLoadPageSync(path);
      }

      if (pageResources.page) {
        pageResources.page.matchPath = '*';
      }

      return pageResources;
    };

    loader.loadPage = path => {
      // with Gatsby v4, 'path' can now be a path component, or path component + query
      const {
        path: pathComponent,
        query: queryComponent,
      } = parsePathComponents(path);

      let pageResources;
      // if the path is the same as our current page we know it's not a prefetch
      if (pathComponent === location.pathname) {
        pageResources = originalLoadPage(pagePath + queryComponent);
      } else {
        pageResources = originalLoadPage(path);
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
