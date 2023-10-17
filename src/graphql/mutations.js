/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMovieTeam = /* GraphQL */ `
  mutation CreateMovieTeam(
    $input: CreateMovieTeamInput!
    $condition: ModelMovieTeamConditionInput
  ) {
    createMovieTeam(input: $input, condition: $condition) {
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
export const updateMovieTeam = /* GraphQL */ `
  mutation UpdateMovieTeam(
    $input: UpdateMovieTeamInput!
    $condition: ModelMovieTeamConditionInput
  ) {
    updateMovieTeam(input: $input, condition: $condition) {
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
export const deleteMovieTeam = /* GraphQL */ `
  mutation DeleteMovieTeam(
    $input: DeleteMovieTeamInput!
    $condition: ModelMovieTeamConditionInput
  ) {
    deleteMovieTeam(input: $input, condition: $condition) {
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
export const createMovie = /* GraphQL */ `
  mutation CreateMovie(
    $input: CreateMovieInput!
    $condition: ModelMovieConditionInput
  ) {
    createMovie(input: $input, condition: $condition) {
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
export const updateMovie = /* GraphQL */ `
  mutation UpdateMovie(
    $input: UpdateMovieInput!
    $condition: ModelMovieConditionInput
  ) {
    updateMovie(input: $input, condition: $condition) {
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
export const deleteMovie = /* GraphQL */ `
  mutation DeleteMovie(
    $input: DeleteMovieInput!
    $condition: ModelMovieConditionInput
  ) {
    deleteMovie(input: $input, condition: $condition) {
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
