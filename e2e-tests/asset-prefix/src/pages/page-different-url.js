import React, { useState, useEffect } from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import PageList from '../components/pageList';

const ClientOnly = () => {
  const [text, setText] = useState('');

  useEffect(() => {
    setText('hydrated');
  }, []);

  return <span id="mytext">{text}</span>;
};

const RandomPage = () => (
  <Layout>
    <SEO title="Page random url" />
    <h1 data-page="random">Hi from the random page</h1>
    <p>Welcome to a random page</p>
    <ClientOnly />
    <PageList hidePage={5} />
  </Layout>
);

export default RandomPage;
