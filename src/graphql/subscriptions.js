/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUserProfile = /* GraphQL */ `
  subscription OnCreateUserProfile(
    $filter: ModelSubscriptionUserProfileFilterInput
  ) {
    onCreateUserProfile(filter: $filter) {
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
          creator
          title
          description
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
export const onUpdateUserProfile = /* GraphQL */ `
  subscription OnUpdateUserProfile(
    $filter: ModelSubscriptionUserProfileFilterInput
  ) {
    onUpdateUserProfile(filter: $filter) {
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
          creator
          title
          description
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
export const onDeleteUserProfile = /* GraphQL */ `
  subscription OnDeleteUserProfile(
    $filter: ModelSubscriptionUserProfileFilterInput
  ) {
    onDeleteUserProfile(filter: $filter) {
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
          creator
          title
          description
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
export const onCreateMovieType = /* GraphQL */ `
  subscription OnCreateMovieType(
    $filter: ModelSubscriptionMovieTypeFilterInput
  ) {
    onCreateMovieType(filter: $filter) {
      id
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateMovieType = /* GraphQL */ `
  subscription OnUpdateMovieType(
    $filter: ModelSubscriptionMovieTypeFilterInput
  ) {
    onUpdateMovieType(filter: $filter) {
      id
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteMovieType = /* GraphQL */ `
  subscription OnDeleteMovieType(
    $filter: ModelSubscriptionMovieTypeFilterInput
  ) {
    onDeleteMovieType(filter: $filter) {
      id
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreatePersonMovieTeam = /* GraphQL */ `
  subscription OnCreatePersonMovieTeam(
    $filter: ModelSubscriptionPersonMovieTeamFilterInput
  ) {
    onCreatePersonMovieTeam(filter: $filter) {
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
          subtitles_location
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
export const onUpdatePersonMovieTeam = /* GraphQL */ `
  subscription OnUpdatePersonMovieTeam(
    $filter: ModelSubscriptionPersonMovieTeamFilterInput
  ) {
    onUpdatePersonMovieTeam(filter: $filter) {
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
          subtitles_location
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
export const onDeletePersonMovieTeam = /* GraphQL */ `
  subscription OnDeletePersonMovieTeam(
    $filter: ModelSubscriptionPersonMovieTeamFilterInput
  ) {
    onDeletePersonMovieTeam(filter: $filter) {
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
          subtitles_location
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
export const onCreateRole = /* GraphQL */ `
  subscription OnCreateRole($filter: ModelSubscriptionRoleFilterInput) {
    onCreateRole(filter: $filter) {
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
export const onUpdateRole = /* GraphQL */ `
  subscription OnUpdateRole($filter: ModelSubscriptionRoleFilterInput) {
    onUpdateRole(filter: $filter) {
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
export const onDeleteRole = /* GraphQL */ `
  subscription OnDeleteRole($filter: ModelSubscriptionRoleFilterInput) {
    onDeleteRole(filter: $filter) {
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
export const onCreatePerson = /* GraphQL */ `
  subscription OnCreatePerson($filter: ModelSubscriptionPersonFilterInput) {
    onCreatePerson(filter: $filter) {
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
export const onUpdatePerson = /* GraphQL */ `
  subscription OnUpdatePerson($filter: ModelSubscriptionPersonFilterInput) {
    onUpdatePerson(filter: $filter) {
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
export const onDeletePerson = /* GraphQL */ `
  subscription OnDeletePerson($filter: ModelSubscriptionPersonFilterInput) {
    onDeletePerson(filter: $filter) {
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
export const onCreateMoviePlaylist = /* GraphQL */ `
  subscription OnCreateMoviePlaylist(
    $filter: ModelSubscriptionMoviePlaylistFilterInput
  ) {
    onCreateMoviePlaylist(filter: $filter) {
      id
      creator
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
      title
      description
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
export const onUpdateMoviePlaylist = /* GraphQL */ `
  subscription OnUpdateMoviePlaylist(
    $filter: ModelSubscriptionMoviePlaylistFilterInput
  ) {
    onUpdateMoviePlaylist(filter: $filter) {
      id
      creator
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
      title
      description
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
export const onDeleteMoviePlaylist = /* GraphQL */ `
  subscription OnDeleteMoviePlaylist(
    $filter: ModelSubscriptionMoviePlaylistFilterInput
  ) {
    onDeleteMoviePlaylist(filter: $filter) {
      id
      creator
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
      title
      description
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
export const onCreateMovieTeam = /* GraphQL */ `
  subscription OnCreateMovieTeam(
    $filter: ModelSubscriptionMovieTeamFilterInput
  ) {
    onCreateMovieTeam(filter: $filter) {
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
        subtitles_location
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
export const onUpdateMovieTeam = /* GraphQL */ `
  subscription OnUpdateMovieTeam(
    $filter: ModelSubscriptionMovieTeamFilterInput
  ) {
    onUpdateMovieTeam(filter: $filter) {
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
        subtitles_location
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
export const onDeleteMovieTeam = /* GraphQL */ `
  subscription OnDeleteMovieTeam(
    $filter: ModelSubscriptionMovieTeamFilterInput
  ) {
    onDeleteMovieTeam(filter: $filter) {
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
        subtitles_location
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
export const onCreateMovie = /* GraphQL */ `
  subscription OnCreateMovie($filter: ModelSubscriptionMovieFilterInput) {
    onCreateMovie(filter: $filter) {
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
          subtitles_location
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
      subtitles_location
      createdAt
      updatedAt
      movieMovieTeamId
      movieMovieTypeId
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
          subtitles_location
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
      subtitles_location
      createdAt
      updatedAt
      movieMovieTeamId
      movieMovieTypeId
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
          subtitles_location
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
      subtitles_location
      createdAt
      updatedAt
      movieMovieTeamId
      movieMovieTypeId
      __typename
    }
  }
`;
export const onCreateCountryCode = /* GraphQL */ `
  subscription OnCreateCountryCode(
    $filter: ModelSubscriptionCountryCodeFilterInput
  ) {
    onCreateCountryCode(filter: $filter) {
      id
      Country
      Code
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCountryCode = /* GraphQL */ `
  subscription OnUpdateCountryCode(
    $filter: ModelSubscriptionCountryCodeFilterInput
  ) {
    onUpdateCountryCode(filter: $filter) {
      id
      Country
      Code
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCountryCode = /* GraphQL */ `
  subscription OnDeleteCountryCode(
    $filter: ModelSubscriptionCountryCodeFilterInput
  ) {
    onDeleteCountryCode(filter: $filter) {
      id
      Country
      Code
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateMovieMoviePlaylist = /* GraphQL */ `
  subscription OnCreateMovieMoviePlaylist(
    $filter: ModelSubscriptionMovieMoviePlaylistFilterInput
  ) {
    onCreateMovieMoviePlaylist(filter: $filter) {
      id
      moviePlaylistId
      movieId
      moviePlaylist {
        id
        creator
        movies {
          nextToken
          __typename
        }
        title
        description
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
        subtitles_location
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
export const onUpdateMovieMoviePlaylist = /* GraphQL */ `
  subscription OnUpdateMovieMoviePlaylist(
    $filter: ModelSubscriptionMovieMoviePlaylistFilterInput
  ) {
    onUpdateMovieMoviePlaylist(filter: $filter) {
      id
      moviePlaylistId
      movieId
      moviePlaylist {
        id
        creator
        movies {
          nextToken
          __typename
        }
        title
        description
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
        subtitles_location
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
export const onDeleteMovieMoviePlaylist = /* GraphQL */ `
  subscription OnDeleteMovieMoviePlaylist(
    $filter: ModelSubscriptionMovieMoviePlaylistFilterInput
  ) {
    onDeleteMovieMoviePlaylist(filter: $filter) {
      id
      moviePlaylistId
      movieId
      moviePlaylist {
        id
        creator
        movies {
          nextToken
          __typename
        }
        title
        description
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
        subtitles_location
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
