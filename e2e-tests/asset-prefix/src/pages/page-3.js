import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import PageList from "../components/pageList"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1 data-page="3">Hi people</h1>
    <p>Welcome to your new Gatsby site. You hardly see any change</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <PageList hidePage={3} />
  </Layout>
)

export default IndexPage
