/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMovieType = /* GraphQL */ `
  mutation CreateMovieType(
    $input: CreateMovieTypeInput!
    $condition: ModelMovieTypeConditionInput
  ) {
    createMovieType(input: $input, condition: $condition) {
      id
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateMovieType = /* GraphQL */ `
  mutation UpdateMovieType(
    $input: UpdateMovieTypeInput!
    $condition: ModelMovieTypeConditionInput
  ) {
    updateMovieType(input: $input, condition: $condition) {
      id
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteMovieType = /* GraphQL */ `
  mutation DeleteMovieType(
    $input: DeleteMovieTypeInput!
    $condition: ModelMovieTypeConditionInput
  ) {
    deleteMovieType(input: $input, condition: $condition) {
      id
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createPersonMovieTeam = /* GraphQL */ `
  mutation CreatePersonMovieTeam(
    $input: CreatePersonMovieTeamInput!
    $condition: ModelPersonMovieTeamConditionInput
  ) {
    createPersonMovieTeam(input: $input, condition: $condition) {
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
export const updatePersonMovieTeam = /* GraphQL */ `
  mutation UpdatePersonMovieTeam(
    $input: UpdatePersonMovieTeamInput!
    $condition: ModelPersonMovieTeamConditionInput
  ) {
    updatePersonMovieTeam(input: $input, condition: $condition) {
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
export const deletePersonMovieTeam = /* GraphQL */ `
  mutation DeletePersonMovieTeam(
    $input: DeletePersonMovieTeamInput!
    $condition: ModelPersonMovieTeamConditionInput
  ) {
    deletePersonMovieTeam(input: $input, condition: $condition) {
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
export const createRole = /* GraphQL */ `
  mutation CreateRole(
    $input: CreateRoleInput!
    $condition: ModelRoleConditionInput
  ) {
    createRole(input: $input, condition: $condition) {
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
export const updateRole = /* GraphQL */ `
  mutation UpdateRole(
    $input: UpdateRoleInput!
    $condition: ModelRoleConditionInput
  ) {
    updateRole(input: $input, condition: $condition) {
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
export const deleteRole = /* GraphQL */ `
  mutation DeleteRole(
    $input: DeleteRoleInput!
    $condition: ModelRoleConditionInput
  ) {
    deleteRole(input: $input, condition: $condition) {
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
export const createPerson = /* GraphQL */ `
  mutation CreatePerson(
    $input: CreatePersonInput!
    $condition: ModelPersonConditionInput
  ) {
    createPerson(input: $input, condition: $condition) {
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
export const updatePerson = /* GraphQL */ `
  mutation UpdatePerson(
    $input: UpdatePersonInput!
    $condition: ModelPersonConditionInput
  ) {
    updatePerson(input: $input, condition: $condition) {
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
export const deletePerson = /* GraphQL */ `
  mutation DeletePerson(
    $input: DeletePersonInput!
    $condition: ModelPersonConditionInput
  ) {
    deletePerson(input: $input, condition: $condition) {
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
      is_recommended
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
      is_recommended
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
      is_recommended
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
