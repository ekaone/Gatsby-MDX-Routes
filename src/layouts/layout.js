import React, { Fragment } from "react"
import { StaticQuery, graphql, Link } from "gatsby"

import PropTypes from "prop-types"

import { MdxRoutes } from "@pauliescanlon/gatsby-mdx-routes"

import Seo from "../components/seo"

import "./layout.css"

const Tree = ({ menus }) => {
  const createTree = menus => {
    return (
      <ul>
        {menus.map(route => (
          <li key={route.navigationLabel}>
            {route.slug ? (
              <Link to={route.slug}>
                {route.navigationLabel}
                {route.menu && createTree(route.menu)}
              </Link>
            ) : (
              <span>
                {route.navigationLabel}
                {route.menu && createTree(route.menu)}
              </span>
            )}
          </li>
        ))}
      </ul>
    )
  }

  return createTree(menus)
}

const Layout = ({ children }) => {
  return (
    <StaticQuery
      query={graphql`
        query defaultQuery {
          site {
            siteMetadata {
              title
              description
              siteURL
              siteImage
              author
            }
          }
        }
      `}
      render={data => {
        const {
          title,
          description,
          siteImage,
          siteURL,
          author,
        } = data.site.siteMetadata

        return (
          <Fragment>
            <Seo
              lang="eng"
              title={title}
              description={description}
              siteImage={siteImage}
              siteURL={siteURL}
              author={author}
            />
            <ul>
              <li>
                <a
                  href="https://github.com/ekaone/Gatsby-MDX-Routes"
                  target="_blank"
                >
                  GitHub: Gatsby-MDX-Routes
                </a>
              </li>
              <li>
                <a
                  href="https://www.npmjs.com/package/@pauliescanlon/gatsby-mdx-routes"
                  target="_blank"
                >
                  Plugin: @pauliescanlon/gatsby-mdx-routes
                </a>
              </li>
            </ul>

            <main>{children}</main>
            <h2>routes</h2>
            <p>
              Simple example <code>routes.map</code>
            </p>
            <nav>
              <MdxRoutes>
                {(routes, _) => (
                  <ul>
                    {routes.map((route, index) => (
                      <li key={index}>
                        <Link to={route.slug}>{route.navigationLabel}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </MdxRoutes>
            </nav>
            <h2>routes navigationOrder</h2>
            <p>
              Simple example <code>routes.map</code> with{" "}
              <code>navigationOrder</code>
            </p>
            <nav>
              <MdxRoutes
                navigationOrder={[
                  "contact",
                  "some other page",
                  "sub page 1",
                  "about",
                  "sub page item 1",
                  "sub page item again 1",
                  "home",
                ]}
              >
                {(routes, _) => (
                  <ul>
                    {routes.map((route, index) => (
                      <li key={index}>
                        <Link to={route.slug}>{route.navigationLabel}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </MdxRoutes>
            </nav>
            <h2>menus</h2>
            <p>
              Recursive example <code>createTree</code>
            </p>
            <nav>
              <MdxRoutes>{(_, menus) => <Tree menus={menus} />}</MdxRoutes>
            </nav>
            <h2>menus navigationOrder</h2>
            <p>
              Recursive example <code>createTree</code> with{" "}
              <code>navigationOrder</code>
            </p>
            <nav>
              <MdxRoutes
                navigationOrder={[
                  "contact",
                  "sub pages",
                  "about",
                  "other pages",
                  "home",
                ]}
              >
                {(_, menus) => <Tree menus={menus} />}
              </MdxRoutes>
            </nav>
          </Fragment>
        )
      }}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
