/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMovieTeam = /* GraphQL */ `
  subscription OnCreateMovieTeam(
    $filter: ModelSubscriptionMovieTeamFilterInput
  ) {
    onCreateMovieTeam(filter: $filter) {
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
export const onUpdateMovieTeam = /* GraphQL */ `
  subscription OnUpdateMovieTeam(
    $filter: ModelSubscriptionMovieTeamFilterInput
  ) {
    onUpdateMovieTeam(filter: $filter) {
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
export const onDeleteMovieTeam = /* GraphQL */ `
  subscription OnDeleteMovieTeam(
    $filter: ModelSubscriptionMovieTeamFilterInput
  ) {
    onDeleteMovieTeam(filter: $filter) {
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
export const onCreateMovie = /* GraphQL */ `
  subscription OnCreateMovie($filter: ModelSubscriptionMovieFilterInput) {
    onCreateMovie(filter: $filter) {
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
export const onUpdateMovie = /* GraphQL */ `
  subscription OnUpdateMovie($filter: ModelSubscriptionMovieFilterInput) {
    onUpdateMovie(filter: $filter) {
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
export const onDeleteMovie = /* GraphQL */ `
  subscription OnDeleteMovie($filter: ModelSubscriptionMovieFilterInput) {
    onDeleteMovie(filter: $filter) {
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
