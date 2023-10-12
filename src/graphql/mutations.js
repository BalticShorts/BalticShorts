/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      createdAt
      updatedAt
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
      createdAt
      updatedAt
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
