
// We override loadPage & loadPagesync to fix canonical redirects
exports.onClientEntry = () => {
  if (!window.___loader) {
    return;
  }

  if (window.pagePath !== location.pathname && window.pagePath !== location.pathname + '/') {
    const originalLoadPageSync = window.___loader.loadPageSync;
    const originalLoadPage = window.___loader.loadPage;

    window.___loader.loadPageSync = path => {
      // if the path is the same as our current page we know it's not a prefetch
      if (path === window.location.pathname) {
        return originalLoadPageSync(window.pagePath);
      }

      return originalLoadPageSync(path);
    }
    window.___loader.loadPage = path => {
      // if the path is the same as our current page we know it's not a prefetch
      if (path === window.location.pathname) {
        return originalLoadPage(window.pagePath);
      }

      return originalLoadPage(path);
    }
  }
}