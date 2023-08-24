import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query GetChars($page: Int, $name: String) {
    characters(page: $page, filter: { name: $name }) {
      info {
        count
        pages
      }
      results {
        name
        gender
        status
        species
        id
        image
        location {
          name
          id
        }
        origin {
          name
          id
        }
      }
    }
  }
`;

export const GET_LOCATION_BY_ID = gql`
  query GetLocations($id: ID!) {
    location(id: $id) {
      residents {
        name
        gender
        status
        species
        id
        image
        location {
          name
          id
        }
        origin {
          name
          id
        }
      }
    }
  }
`;
