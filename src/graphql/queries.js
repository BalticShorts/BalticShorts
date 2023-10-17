/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMoviePlaylist = /* GraphQL */ `
  query GetMoviePlaylist($id: ID!) {
    getMoviePlaylist(id: $id) {
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
export const listMoviePlaylists = /* GraphQL */ `
  query ListMoviePlaylists(
    $filter: ModelMoviePlaylistFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMoviePlaylists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
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
        MovieInPlaylists {
          nextToken
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
export const getMovieMoviePlaylist = /* GraphQL */ `
  query GetMovieMoviePlaylist($id: ID!) {
    getMovieMoviePlaylist(id: $id) {
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
export const listMovieMoviePlaylists = /* GraphQL */ `
  query ListMovieMoviePlaylists(
    $filter: ModelMovieMoviePlaylistFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMovieMoviePlaylists(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        moviePlaylistId
        movieId
        moviePlaylist {
          id
          Creator
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
          createdAt
          updatedAt
          movieMovieTeamId
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const movieMoviePlaylistsByMoviePlaylistId = /* GraphQL */ `
  query MovieMoviePlaylistsByMoviePlaylistId(
    $moviePlaylistId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMovieMoviePlaylistFilterInput
    $limit: Int
    $nextToken: String
  ) {
    movieMoviePlaylistsByMoviePlaylistId(
      moviePlaylistId: $moviePlaylistId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        moviePlaylistId
        movieId
        moviePlaylist {
          id
          Creator
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
          createdAt
          updatedAt
          movieMovieTeamId
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const movieMoviePlaylistsByMovieId = /* GraphQL */ `
  query MovieMoviePlaylistsByMovieId(
    $movieId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMovieMoviePlaylistFilterInput
    $limit: Int
    $nextToken: String
  ) {
    movieMoviePlaylistsByMovieId(
      movieId: $movieId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        moviePlaylistId
        movieId
        moviePlaylist {
          id
          Creator
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
          createdAt
          updatedAt
          movieMovieTeamId
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
