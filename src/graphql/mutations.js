/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUserProfile = /* GraphQL */ `
  mutation CreateUserProfile(
    $input: CreateUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    createUserProfile(input: $input, condition: $condition) {
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
export const updateUserProfile = /* GraphQL */ `
  mutation UpdateUserProfile(
    $input: UpdateUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    updateUserProfile(input: $input, condition: $condition) {
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
export const deleteUserProfile = /* GraphQL */ `
  mutation DeleteUserProfile(
    $input: DeleteUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    deleteUserProfile(input: $input, condition: $condition) {
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
export const createMoviePlaylist = /* GraphQL */ `
  mutation CreateMoviePlaylist(
    $input: CreateMoviePlaylistInput!
    $condition: ModelMoviePlaylistConditionInput
  ) {
    createMoviePlaylist(input: $input, condition: $condition) {
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
export const updateMoviePlaylist = /* GraphQL */ `
  mutation UpdateMoviePlaylist(
    $input: UpdateMoviePlaylistInput!
    $condition: ModelMoviePlaylistConditionInput
  ) {
    updateMoviePlaylist(input: $input, condition: $condition) {
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
export const deleteMoviePlaylist = /* GraphQL */ `
  mutation DeleteMoviePlaylist(
    $input: DeleteMoviePlaylistInput!
    $condition: ModelMoviePlaylistConditionInput
  ) {
    deleteMoviePlaylist(input: $input, condition: $condition) {
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
export const createMovieTeam = /* GraphQL */ `
  mutation CreateMovieTeam(
    $input: CreateMovieTeamInput!
    $condition: ModelMovieTeamConditionInput
  ) {
    createMovieTeam(input: $input, condition: $condition) {
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
export const updateMovieTeam = /* GraphQL */ `
  mutation UpdateMovieTeam(
    $input: UpdateMovieTeamInput!
    $condition: ModelMovieTeamConditionInput
  ) {
    updateMovieTeam(input: $input, condition: $condition) {
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
export const deleteMovieTeam = /* GraphQL */ `
  mutation DeleteMovieTeam(
    $input: DeleteMovieTeamInput!
    $condition: ModelMovieTeamConditionInput
  ) {
    deleteMovieTeam(input: $input, condition: $condition) {
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
export const createMovie = /* GraphQL */ `
  mutation CreateMovie(
    $input: CreateMovieInput!
    $condition: ModelMovieConditionInput
  ) {
    createMovie(input: $input, condition: $condition) {
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
export const updateMovie = /* GraphQL */ `
  mutation UpdateMovie(
    $input: UpdateMovieInput!
    $condition: ModelMovieConditionInput
  ) {
    updateMovie(input: $input, condition: $condition) {
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
export const deleteMovie = /* GraphQL */ `
  mutation DeleteMovie(
    $input: DeleteMovieInput!
    $condition: ModelMovieConditionInput
  ) {
    deleteMovie(input: $input, condition: $condition) {
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
export const createCountryCode = /* GraphQL */ `
  mutation CreateCountryCode(
    $input: CreateCountryCodeInput!
    $condition: ModelCountryCodeConditionInput
  ) {
    createCountryCode(input: $input, condition: $condition) {
      id
      Country
      Code
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateCountryCode = /* GraphQL */ `
  mutation UpdateCountryCode(
    $input: UpdateCountryCodeInput!
    $condition: ModelCountryCodeConditionInput
  ) {
    updateCountryCode(input: $input, condition: $condition) {
      id
      Country
      Code
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteCountryCode = /* GraphQL */ `
  mutation DeleteCountryCode(
    $input: DeleteCountryCodeInput!
    $condition: ModelCountryCodeConditionInput
  ) {
    deleteCountryCode(input: $input, condition: $condition) {
      id
      Country
      Code
      createdAt
      updatedAt
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
