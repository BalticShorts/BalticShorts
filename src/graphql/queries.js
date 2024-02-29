/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserProfile = /* GraphQL */ `
  query GetUserProfile($id: ID!) {
    getUserProfile(id: $id) {
      id
      name
      surname
      is_member
      member_untill
      is_admin
      email
      user_id
      photo_location
      MoviePlaylists {
        items {
          id
          Creator
          Title
          is_public
          is_recommended
          photo_location
          userprofileID
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
export const listUserProfiles = /* GraphQL */ `
  query ListUserProfiles(
    $filter: ModelUserProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        surname
        is_member
        member_untill
        is_admin
        email
        user_id
        photo_location
        MoviePlaylists {
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
        MovieName
        PersonMovieTeams {
          nextToken
          __typename
        }
        Movie {
          id
          name
          name_eng
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
          photo_location
          thumbnail_location
          age_rating
          createdAt
          updatedAt
          movieMovieTeamId
          movieMovieTypeId
          __typename
        }
        createdAt
        updatedAt
        movieTeamMovieId
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
        user_id
        is_public
        completed_setup
        photo_location
        description_confirmed
        photo_confirmed
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
          MovieName
          createdAt
          updatedAt
          movieTeamMovieId
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
          user_id
          is_public
          completed_setup
          photo_location
          description_confirmed
          photo_confirmed
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
          MovieName
          createdAt
          updatedAt
          movieTeamMovieId
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
          user_id
          is_public
          completed_setup
          photo_location
          description_confirmed
          photo_confirmed
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
          MovieName
          createdAt
          updatedAt
          movieTeamMovieId
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
          user_id
          is_public
          completed_setup
          photo_location
          description_confirmed
          photo_confirmed
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
          MovieName
          createdAt
          updatedAt
          movieTeamMovieId
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
          user_id
          is_public
          completed_setup
          photo_location
          description_confirmed
          photo_confirmed
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
      user_id
      is_public
      completed_setup
      photo_location
      description_confirmed
      photo_confirmed
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
        user_id
        is_public
        completed_setup
        photo_location
        description_confirmed
        photo_confirmed
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
      photo_location
      userprofileID
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
        photo_location
        userprofileID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const moviePlaylistsByUserprofileID = /* GraphQL */ `
  query MoviePlaylistsByUserprofileID(
    $userprofileID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMoviePlaylistFilterInput
    $limit: Int
    $nextToken: String
  ) {
    moviePlaylistsByUserprofileID(
      userprofileID: $userprofileID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        photo_location
        userprofileID
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
      MovieName
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
      Movie {
        id
        name
        name_eng
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
          MovieName
          createdAt
          updatedAt
          movieTeamMovieId
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
        photo_location
        thumbnail_location
        age_rating
        createdAt
        updatedAt
        movieMovieTeamId
        movieMovieTypeId
        __typename
      }
      createdAt
      updatedAt
      movieTeamMovieId
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
        MovieName
        PersonMovieTeams {
          nextToken
          __typename
        }
        Movie {
          id
          name
          name_eng
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
          photo_location
          thumbnail_location
          age_rating
          createdAt
          updatedAt
          movieMovieTeamId
          movieMovieTypeId
          __typename
        }
        createdAt
        updatedAt
        movieTeamMovieId
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
        MovieName
        PersonMovieTeams {
          nextToken
          __typename
        }
        Movie {
          id
          name
          name_eng
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
          photo_location
          thumbnail_location
          age_rating
          createdAt
          updatedAt
          movieMovieTeamId
          movieMovieTypeId
          __typename
        }
        createdAt
        updatedAt
        movieTeamMovieId
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
      photo_location
      thumbnail_location
      age_rating
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
          MovieName
          createdAt
          updatedAt
          movieTeamMovieId
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
        photo_location
        thumbnail_location
        age_rating
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
export const getCountryCode = /* GraphQL */ `
  query GetCountryCode($id: ID!) {
    getCountryCode(id: $id) {
      id
      Country
      Code
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listCountryCodes = /* GraphQL */ `
  query ListCountryCodes(
    $filter: ModelCountryCodeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCountryCodes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Country
        Code
        createdAt
        updatedAt
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
        photo_location
        userprofileID
        createdAt
        updatedAt
        __typename
      }
      movie {
        id
        name
        name_eng
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
          MovieName
          createdAt
          updatedAt
          movieTeamMovieId
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
        photo_location
        thumbnail_location
        age_rating
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
          photo_location
          userprofileID
          createdAt
          updatedAt
          __typename
        }
        movie {
          id
          name
          name_eng
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
          photo_location
          thumbnail_location
          age_rating
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
          photo_location
          userprofileID
          createdAt
          updatedAt
          __typename
        }
        movie {
          id
          name
          name_eng
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
          photo_location
          thumbnail_location
          age_rating
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
          photo_location
          userprofileID
          createdAt
          updatedAt
          __typename
        }
        movie {
          id
          name
          name_eng
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
          photo_location
          thumbnail_location
          age_rating
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
