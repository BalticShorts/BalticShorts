/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMovieTeam = /* GraphQL */ `
  query GetMovieTeam($id: ID!) {
    getMovieTeam(id: $id) {
      id
      director
      operator
      scenario
      editor
      actors
      costumes
      makeup
      executive_producer
      producer
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listMovieTeams = /* GraphQL */ `
  query ListMovieTeams(
    $filter: ModelMovieTeamFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMovieTeams(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        director
        operator
        scenario
        editor
        actors
        costumes
        makeup
        executive_producer
        producer
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getMovie = /* GraphQL */ `
  query GetMovie($id: ID!) {
    getMovie(id: $id) {
      id
      name
      name_eng
      type
      genre
      description
      description_eng
      screen_language
      captions_language
      origin_country
      length
      created_year
      uploaded_at
      guid
      MovieTeam {
        id
        director
        operator
        scenario
        editor
        actors
        costumes
        makeup
        executive_producer
        producer
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      movieMovieTeamId
      __typename
    }
  }
`;
export const listMovies = /* GraphQL */ `
  query ListMovies(
    $filter: ModelMovieFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMovies(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        name_eng
        type
        genre
        description
        description_eng
        screen_language
        captions_language
        origin_country
        length
        created_year
        uploaded_at
        guid
        MovieTeam {
          id
          director
          operator
          scenario
          editor
          actors
          costumes
          makeup
          executive_producer
          producer
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        movieMovieTeamId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
