import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import PageList from '../components/pageList';

const SecondPage = () => (
  <Layout>
    <SEO title="Page four" />
    <h1 data-page="4">Hi from the Fourth page</h1>
    <p>Welcome to page 4</p>
    <PageList hidePage={4} />
  </Layout>
);

export default SecondPage;
