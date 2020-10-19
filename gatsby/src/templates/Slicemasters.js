import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import SEO from '../pages/SEO';

export default function SliceMastersPage({ data: { person } }) {
  return (
    <>
      <SEO title={`SliceMaster - ${person.name}`} />
      <div className="center">
        <Img fluid={person.image.asset.fluid} />
        <h2 className="mark">{person.name}</h2>
        <p>{person.description}</p>
      </div>
    </>
  );
}

export const query = graphql`
  query($slug: String!) {
    person: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      id
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
