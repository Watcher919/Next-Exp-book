import React, { useContext } from "react"
import { Nav } from "react-bootstrap"
import { StaticQuery, graphql, Link } from "gatsby"
import "../styles/sidebar.css"
import { BookmarkContext } from '../context/globalState'
var slugify = require('slugify')

export default () => {
	const { readingList } = useContext(BookmarkContext)

  return (
    <StaticQuery
      query={graphql`
        query CategoryQuery {
          allCategoriesJson {
            edges {
              node {
                id
                name
                emoji
              }
            }
          }
        }
      `}
      render={data => (
        <Nav
          className="col-md-12 d-none d-md-block bg-light sidebar"
          activeKey="/home"
        >
          <div className="sidebar-sticky" role="navigation" aria-label="Sidebar">
						<div style={{position: "relative", left: "0.9rem", paddingBottom: "0.2rem"}}>
							<Link to="/readingList">🔖 Reading List ({readingList.bookIds.length})</Link>
						</div>
            {data.allCategoriesJson.edges.map(function(x, index) {
              return (
                <Nav.Item key={x.node.name}>
                  <Nav.Link href={slugify(x.node.name)} role="button">
                    {x.node.emoji} {x.node.name}
                  </Nav.Link>
                </Nav.Item>
              )
            })}
          </div>
        </Nav>
      )}
    />
  )
}
