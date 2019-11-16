describe('Navigation', function() {
  it('From non gatsby to gatsby site works', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[data-page]').should(`have.attr`, `data-page`, '1');

    cy.get('#list-of-pages')
      .find('li:eq(1) a')
      .click();

    cy.location('pathname').should('include', '/page-3');
    cy.get('[data-page]').should(`have.attr`, `data-page`, '3');
  });

  it('From gatsby to non gatsby site works', () => {
    cy.visit('http://localhost:3000/page-3').waitForRouteChange();
    cy.get('[data-page]').should(`have.attr`, `data-page`, '3');

    // wait for image to load to make sure js is loaded
    cy.get('.gatsby-image-wrapper')
      .find('> img')
      .should('have.css', 'opacity', '0');

    cy.get('#list-of-pages')
      .find('li:eq(0) a')
      .click();

    cy.location(`pathname`).should(`equal`, `/`);

    cy.get('[data-page]').should(`have.attr`, `data-page`, '1');
  });
});
