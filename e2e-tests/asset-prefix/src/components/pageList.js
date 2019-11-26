import React from 'react';
import { Link } from 'gatsby';

export default function PageList({ hidePage }) {
  const pages = [];

  for (let i = 1; i <= 4; i++) {
    if (i === hidePage) {
      continue;
    }

    let page;
    switch (i) {
      case 1: {
        page = <Link to="/">Go back to the homepage</Link>;
        break;
      }
      case 5: {
        page = <Link to="/random-page">Random page</Link>;
        break;
      }
      default: {
        page = <Link to={`/page-${i}`}>Go back to {`page ${i}`}</Link>;
      }
    }

    pages.push(page);
  }

  return (
    <ul style={{ fontSize: 'small' }} id="list-of-pages">
      {pages.map((page, i) => (
        <li style={{ marginBottom: 0 }} key={i}>
          {page}
        </li>
      ))}
    </ul>
  );
}
