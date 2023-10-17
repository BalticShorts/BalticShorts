/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMoviePlaylist = /* GraphQL */ `
  mutation CreateMoviePlaylist(
    $input: CreateMoviePlaylistInput!
    $condition: ModelMoviePlaylistConditionInput
  ) {
    createMoviePlaylist(input: $input, condition: $condition) {
      id
      Creator
      movies {
        items {
          id
          moviePlaylistId
          movieId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      Title
      is_public
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateMoviePlaylist = /* GraphQL */ `
  mutation UpdateMoviePlaylist(
    $input: UpdateMoviePlaylistInput!
    $condition: ModelMoviePlaylistConditionInput
  ) {
    updateMoviePlaylist(input: $input, condition: $condition) {
      id
      Creator
      movies {
        items {
          id
          moviePlaylistId
          movieId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      Title
      is_public
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteMoviePlaylist = /* GraphQL */ `
  mutation DeleteMoviePlaylist(
    $input: DeleteMoviePlaylistInput!
    $condition: ModelMoviePlaylistConditionInput
  ) {
    deleteMoviePlaylist(input: $input, condition: $condition) {
      id
      Creator
      movies {
        items {
          id
          moviePlaylistId
          movieId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      Title
      is_public
      createdAt
      updatedAt
      __typename
    }
  }
`;
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
      MovieInPlaylists {
        items {
          id
          moviePlaylistId
          movieId
          createdAt
          updatedAt
          __typename
        }
        nextToken
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
      MovieInPlaylists {
        items {
          id
          moviePlaylistId
          movieId
          createdAt
          updatedAt
          __typename
        }
        nextToken
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
      MovieInPlaylists {
        items {
          id
          moviePlaylistId
          movieId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      movieMovieTeamId
      __typename
    }
  }
`;
export const createMovieMoviePlaylist = /* GraphQL */ `
  mutation CreateMovieMoviePlaylist(
    $input: CreateMovieMoviePlaylistInput!
    $condition: ModelMovieMoviePlaylistConditionInput
  ) {
    createMovieMoviePlaylist(input: $input, condition: $condition) {
      id
      moviePlaylistId
      movieId
      moviePlaylist {
        id
        Creator
        movies {
          nextToken
          __typename
        }
        Title
        is_public
        createdAt
        updatedAt
        __typename
      }
      movie {
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
        MovieInPlaylists {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        movieMovieTeamId
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateMovieMoviePlaylist = /* GraphQL */ `
  mutation UpdateMovieMoviePlaylist(
    $input: UpdateMovieMoviePlaylistInput!
    $condition: ModelMovieMoviePlaylistConditionInput
  ) {
    updateMovieMoviePlaylist(input: $input, condition: $condition) {
      id
      moviePlaylistId
      movieId
      moviePlaylist {
        id
        Creator
        movies {
          nextToken
          __typename
        }
        Title
        is_public
        createdAt
        updatedAt
        __typename
      }
      movie {
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
        MovieInPlaylists {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        movieMovieTeamId
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteMovieMoviePlaylist = /* GraphQL */ `
  mutation DeleteMovieMoviePlaylist(
    $input: DeleteMovieMoviePlaylistInput!
    $condition: ModelMovieMoviePlaylistConditionInput
  ) {
    deleteMovieMoviePlaylist(input: $input, condition: $condition) {
      id
      moviePlaylistId
      movieId
      moviePlaylist {
        id
        Creator
        movies {
          nextToken
          __typename
        }
        Title
        is_public
        createdAt
        updatedAt
        __typename
      }
      movie {
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
        MovieInPlaylists {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        movieMovieTeamId
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
