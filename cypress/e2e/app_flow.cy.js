describe('Application flow', () => {
  const api = 'http://localhost:10000';

  it('logs in and receives a token', () => {
    cy.request('POST', `${api}/login`, {
      email: 'user@example.com',
      password: 'secret'
    }).its('body').should('have.property', 'token').then((token) => {
      expect(token).to.exist;
    });
  });

  it('fetches dashboard data with auth token', () => {
    cy.request('POST', `${api}/login`, {
      email: 'user@example.com',
      password: 'secret'
    }).then((res) => {
      const token = res.body.token;
      cy.request({
        url: `${api}/api/dashboard/data.json`,
        headers: { Authorization: `Bearer ${token}` }
      }).its('status').should('eq', 200);
    });
  });

  it('uploads a file', () => {
    cy.request('POST', `${api}/login`, {
      email: 'user@example.com',
      password: 'secret'
    }).then((res) => {
      const token = res.body.token;
      cy.fixture('sample.json', 'binary')
        .then(Cypress.Blob.binaryStringToBlob)
        .then((fileContent) => {
          cy.request({
            method: 'POST',
            url: `${api}/api/upload`,
            headers: {
              Authorization: `Bearer ${token}`
            },
            form: true,
            body: {
              file: {
                fileContent,
                fileName: 'sample.json',
                mimeType: 'application/json'
              }
            }
          }).its('status').should('eq', 200);
        });
    });
  });
});
