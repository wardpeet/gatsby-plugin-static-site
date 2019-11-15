import React from 'react';
import { Link } from 'gatsby';

export default function PageList({ hidePage }) {
  const pages = [];

  for (let i = 1; i <= 4; i++) {
    if (i === hidePage) {
      continue;
    }

    pages.push(<Link to={i === 1 ? '/' : `/page-${i}`}>Go back to {i === 1 ? 'the homepage' : `page ${i}`}</Link>)
  }

  return <ul style={{ fontSize: 'small' }} id="list-of-pages">
    {pages.map(page => <li style={{ marginBottom: 0 }}>{page}</li>)}
  </ul>;
}