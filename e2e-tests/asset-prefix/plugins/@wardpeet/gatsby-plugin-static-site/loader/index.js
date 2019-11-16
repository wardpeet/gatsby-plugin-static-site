import { ProdLoader as BaseProdLoader } from '@wardpeet/gatsby-plugin-static-site/gatsby-loader';

export { default } from '@wardpeet/gatsby-plugin-static-site/gatsby-loader';
export * from '@wardpeet/gatsby-plugin-static-site/gatsby-loader';

// We override loadPage & loadPagesync to fix canonical redirects
// we also override hovering to disable hover prefetch
export class ProdLoader extends BaseProdLoader {
  loadPageSync(path) {
    // if the path is the same as our current page we know it's not a prefetch
    if (path === window.location.pathname) {
      return super.loadPageSync(window.pagePath);
    }

    return super.loadPageSync(path);
  }

  loadPage(path) {
    // if the path is the same as our current page we know it's not a prefetch
    if (path === window.location.pathname) {
      return super.loadPage(window.pagePath);
    }

    return super.loadPage(path);
  }

  hovering() {}
}