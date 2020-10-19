import { graphql, Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Pagination from '../components/Pagination';
import SEO from './SEO';

const SliceMastersGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const SliceMasterStyles = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: --2rem;
    position: relative;
    z-index: 2;
  }
  .description {
    background: var(--yellow);
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    z-index: 2;
    position: relative;
    transform: rotate(1deg);
  }
`;

export default function SliceMastersPage({ data, pageContext }) {
  const sliceMasters = data.persons.nodes;
  return (
    <>
      <SEO title={`Slicemasters page - ${pageContext.currentPage || 1}`} />
      <Pagination
        perPage={parseInt(process.env.GATSBY_PAGE_SIZE)}
        totalCount={data.persons.totalCount}
        currentPage={pageContext.currentPage || 1}
        skip={pageContext.skip}
        base="slicemasters"
      />
      <SliceMastersGrid>
        {sliceMasters.map((person) => (
          <SliceMasterStyles key={person.id}>
            <Link to={`/slicemasters/${person.slug.current}`}>
              <h2>
                <span className="mark"> {person.name}</span>
              </h2>
            </Link>
            <Img fluid={person.image.asset.fluid} />
            <p className="description">{person.description}</p>
          </SliceMasterStyles>
        ))}
      </SliceMastersGrid>
    </>
  );
}

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 2) {
    persons: allSanityPerson(limit: $pageSize, skip: $skip) {
      nodes {
        name
        id
        slug {
          current
        }
        description
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
      totalCount
    }
  }
`;
