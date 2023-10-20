/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMovieType = /* GraphQL */ `
  query GetMovieType($id: ID!) {
    getMovieType(id: $id) {
      id
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listMovieTypes = /* GraphQL */ `
  query ListMovieTypes(
    $filter: ModelMovieTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMovieTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPersonMovieTeam = /* GraphQL */ `
  query GetPersonMovieTeam($id: ID!) {
    getPersonMovieTeam(id: $id) {
      id
      movieteamID
      personID
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
        producer_org
        PersonMovieTeams {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      Person {
        id
        name
        surname
        role
        description
        Instagram
        Facebook
        IMBD
        email
        PersonMovieTeams {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      roleID
      Role {
        id
        name
        PersonMovieTeam {
          nextToken
          __typename
        }
        name_eng
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listPersonMovieTeams = /* GraphQL */ `
  query ListPersonMovieTeams(
    $filter: ModelPersonMovieTeamFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPersonMovieTeams(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        movieteamID
        personID
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
          producer_org
          createdAt
          updatedAt
          __typename
        }
        Person {
          id
          name
          surname
          role
          description
          Instagram
          Facebook
          IMBD
          email
          createdAt
          updatedAt
          __typename
        }
        roleID
        Role {
          id
          name
          name_eng
          createdAt
          updatedAt
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
export const personMovieTeamsByMovieteamID = /* GraphQL */ `
  query PersonMovieTeamsByMovieteamID(
    $movieteamID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPersonMovieTeamFilterInput
    $limit: Int
    $nextToken: String
  ) {
    personMovieTeamsByMovieteamID(
      movieteamID: $movieteamID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        movieteamID
        personID
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
          producer_org
          createdAt
          updatedAt
          __typename
        }
        Person {
          id
          name
          surname
          role
          description
          Instagram
          Facebook
          IMBD
          email
          createdAt
          updatedAt
          __typename
        }
        roleID
        Role {
          id
          name
          name_eng
          createdAt
          updatedAt
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
export const personMovieTeamsByPersonID = /* GraphQL */ `
  query PersonMovieTeamsByPersonID(
    $personID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPersonMovieTeamFilterInput
    $limit: Int
    $nextToken: String
  ) {
    personMovieTeamsByPersonID(
      personID: $personID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        movieteamID
        personID
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
          producer_org
          createdAt
          updatedAt
          __typename
        }
        Person {
          id
          name
          surname
          role
          description
          Instagram
          Facebook
          IMBD
          email
          createdAt
          updatedAt
          __typename
        }
        roleID
        Role {
          id
          name
          name_eng
          createdAt
          updatedAt
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
export const personMovieTeamsByRoleID = /* GraphQL */ `
  query PersonMovieTeamsByRoleID(
    $roleID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPersonMovieTeamFilterInput
    $limit: Int
    $nextToken: String
  ) {
    personMovieTeamsByRoleID(
      roleID: $roleID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        movieteamID
        personID
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
          producer_org
          createdAt
          updatedAt
          __typename
        }
        Person {
          id
          name
          surname
          role
          description
          Instagram
          Facebook
          IMBD
          email
          createdAt
          updatedAt
          __typename
        }
        roleID
        Role {
          id
          name
          name_eng
          createdAt
          updatedAt
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
export const getRole = /* GraphQL */ `
  query GetRole($id: ID!) {
    getRole(id: $id) {
      id
      name
      PersonMovieTeam {
        items {
          id
          movieteamID
          personID
          roleID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      name_eng
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listRoles = /* GraphQL */ `
  query ListRoles(
    $filter: ModelRoleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRoles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        PersonMovieTeam {
          nextToken
          __typename
        }
        name_eng
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPerson = /* GraphQL */ `
  query GetPerson($id: ID!) {
    getPerson(id: $id) {
      id
      name
      surname
      role
      description
      Instagram
      Facebook
      IMBD
      email
      PersonMovieTeams {
        items {
          id
          movieteamID
          personID
          roleID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listPeople = /* GraphQL */ `
  query ListPeople(
    $filter: ModelPersonFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPeople(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        surname
        role
        description
        Instagram
        Facebook
        IMBD
        email
        PersonMovieTeams {
          nextToken
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
      is_recommended
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
        is_recommended
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
      producer_org
      PersonMovieTeams {
        items {
          id
          movieteamID
          personID
          roleID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
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
        producer_org
        PersonMovieTeams {
          nextToken
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
        producer_org
        PersonMovieTeams {
          nextToken
          __typename
        }
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
      times_watched
      MovieType {
        id
        type
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      movieMovieTeamId
      movieMovieTypeId
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
          producer_org
          createdAt
          updatedAt
          __typename
        }
        MovieInPlaylists {
          nextToken
          __typename
        }
        times_watched
        MovieType {
          id
          type
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        movieMovieTeamId
        movieMovieTypeId
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
        is_recommended
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
          producer_org
          createdAt
          updatedAt
          __typename
        }
        MovieInPlaylists {
          nextToken
          __typename
        }
        times_watched
        MovieType {
          id
          type
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        movieMovieTeamId
        movieMovieTypeId
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
          is_recommended
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
          times_watched
          createdAt
          updatedAt
          movieMovieTeamId
          movieMovieTypeId
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
          is_recommended
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
          times_watched
          createdAt
          updatedAt
          movieMovieTeamId
          movieMovieTypeId
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
          is_recommended
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
          times_watched
          createdAt
          updatedAt
          movieMovieTeamId
          movieMovieTypeId
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
