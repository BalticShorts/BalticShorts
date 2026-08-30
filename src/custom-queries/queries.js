export const getProfile = `
    query MyQuery($id: ID!) {
      getPerson(id: $id) {
        Facebook
        IMBD
        Instagram
        description
        email
        id
        name
        approved
        PersonRoles {
          items {
            id
            roleID
            Role {
              id
              name
            }
          }
        }
        surname
        nationality
        PersonMovieTeams {
          items {
            MovieTeam {
              Movie {
                age_rating
                created_year
                genre
                id
                length
                name
                origin_country
                screen_language
                subtitles_location
                thumbnail_location
                approved
                MovieTeam {
                  PersonMovieTeams {
                    items {
                      Person {
                        surname
                        name
                      }
                      Role {
                        name
                      }
                    }
                  }
                }
              }
            }
            Role {
              name
            }
          }
        }
      }
    }
  `;

  export const getMovieQuery = `
  query MyQuery($id: ID!) {
    getMovie(id: $id) {
      MovieTeam {
        PersonMovieTeams {
          items {
            Role {
              name
              name_eng
            }
            Person {
              name
              surname
              id
            }
          }
        }
      }
      genre
      captions_language
      created_year
      description
      description_language
      description_eng
      id
      length
      MovieType {
        type
      }
      name
      name_eng
      origin_country
      screen_language
      times_watched
      guid
      subtitles_location
      trailer_location
      thumbnail_location
      creators_comment
      photo_location
      age_rating
      approved
      raw_video_location
      hls_url
      dash_url
      cmaf_hls_url
      cmaf_dash_url
      drm_key_id
      drm_resource_id
      awards {
        items {
          name
          year
          category
          comment
        }
      }
    }
  }
`;

export const getSearch = `
  query searchMovie($searchString: String!, $lowSearchString: String!, $firstCapitalisedSearchString: String!, $capitalisedSearchString: String!) {
    listMovies(
      filter: {or: [{name: {contains: $searchString}}, {name_eng: {contains: $searchString}},
        {name: {contains: $lowSearchString}}, {name_eng: {contains: $lowSearchString}},
        {name: {contains: $firstCapitalisedSearchString}}, {name_eng: {contains: $firstCapitalisedSearchString}},
        {name: {contains: $capitalisedSearchString}}, {name_eng: {contains: $capitalisedSearchString}}], approved: {eq: true}}
    ) {
      items {
        id
        name
        name_eng
        created_year
        origin_country
        length
        thumbnail_location
        MovieTeam {
          PersonMovieTeams {
            items {
              Role {
                name
              }
              Person {
                name
                surname
              }
            }
          }
        }
      }
    }
    listPeople(filter: {or: [{name: {contains: $searchString}}, {surname: {contains: $searchString}},
       {name: {contains: $lowSearchString}}, {surname: {contains: $lowSearchString}},
       {name: {contains: $firstCapitalisedSearchString}}, {surname: {contains: $firstCapitalisedSearchString}},
       {name: {contains: $capitalisedSearchString}}, {surname: {contains: $capitalisedSearchString}}], approved: {eq: true}}) {
      items {
        name
        surname
        PersonRoles {
          items {
            id
            roleID
            Role {
              id
              name
              name_eng
            }
          }
        }
        id
        nationality
        PersonMovieTeams {
          items {
            MovieTeam {
              Movie {
                id
              }
            }
          }
        }
      }
    }
    listMoviePlaylists(
      filter: {or: [{creator: {contains: $searchString}}, {title: {contains: $searchString}},
        {creator: {contains: $lowSearchString}}, {title: {contains: $lowSearchString}},
        {creator: {contains: $firstCapitalisedSearchString}}, {title: {contains: $firstCapitalisedSearchString}},
        {creator: {contains: $capitalisedSearchString}}, {title: {contains: $capitalisedSearchString}}], is_public: {eq: true}, approved: {eq: true}}
    ) {
      items {
        creator
        title
        id
        is_public
        size
        photo_location
      }
    }
  }
  `
;

export const checkPersonExists = `
query MyQuery($email: String!) {
  listUserProfiles(filter: {email: {eq: $email}}) {
    items {
      user_id
    }
  }
}
`
;

export const getPersonByEmail = `
query MyQuery($email: String!) {
  listUserProfiles(filter: {email: {eq: $email}}) {
    items {
      id
      name
      surname
      email
      user_id
      is_member
      member_until
      is_admin
      createdAt
      updatedAt
      __typename
    }
  }
}
`;

export const getMoviesMain = `
  query MyQuery {
    listMovies {
      items {
        id
        name
        name_eng
        created_year
        origin_country
        length
        thumbnail_location
        createdAt
        genre
        screen_language
        captions_language
        is_highlighted
        description
        trailer_location
        MovieType {
          type
        }
        MovieTeam {
          PersonMovieTeams {
            items {
              Role {
                name
              }
              Person {
                name
                surname
              }
            }
          }
        }
      }
    }
  }
  `
;

export const getMoviePlaylistWithMovie = /* GraphQL */ `
  query GetMoviePlaylist($id: ID!) {
    getMoviePlaylist(id: $id) {
      id
      creator
      movies {
      items {
        movie {
          id
          created_year
          name
          name_eng
        }
      }
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

export const ListMoviesByPerson = `
  query ListMoviesByPerson($personID: ID!) {
    listPersonMovieTeams(filter: { personID: { eq: $personID } }) {
      items {
        MovieTeam {
          Movie {
            id
            name
            genre
            created_year
            length
            origin_country
            thumbnail_location
            approved
            MovieTeam {
              id
              MovieName
              PersonMovieTeams {
                items {
                  Person {
                    id
                    name
                    surname
                  }
                  Role {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
;

export const getUserPlaylists = `
query GetUserProfile($id: ID!) {
  getUserProfile(id: $id) {
    id
    name
    surname
    is_member
    member_until
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
        size
        userprofileID
        createdAt
        updatedAt
        __typename
        movies {
          items {
            id
            movie {
              id
            }
          }
        }
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

export const getMoviesByPlaylistId = /* GraphQL */ `
  query GetMoviesByPlaylistId($id: ID!) {
    getMoviePlaylist(id: $id) {
      id
      title
      creator
      photo_location
      is_public
      approved
      movies {
        items {
          movie {
            id
            name
            name_eng
            created_year
            origin_country
            length
            thumbnail_location
            genre
            screen_language
            captions_language
            MovieType {
              type
            }
            MovieTeam {
              PersonMovieTeams {
                items {
                  Role {
                    name
                  }
                  Person {
                    name
                    surname
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const getUserPlaylistsFull = `
query GetUserProfile($id: ID!) {
  getUserProfile(id: $id) {
    id
    name
    surname
    is_member
    member_until
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
        size
        userprofileID
        createdAt
        updatedAt
        __typename
        movies {
          items {
            id
            movie {
              id
              name
              name_eng
              created_year
              origin_country
              length
              thumbnail_location
              genre
              screen_language
              captions_language
              MovieType {
                type
              }
              MovieTeam {
                PersonMovieTeams {
                  items {
                    Role {
                      name
                    }
                    Person {
                      name
                      surname
                    }
                  }
                }
              }
            }
          }
        }
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

export const updatePerson = `
  mutation UpdatePerson($input: UpdatePersonInput!) {
    updatePerson(input: $input) {
      id
      name
      surname
      description
      Instagram
      Facebook
      IMBD
      email
      is_entity
      nationality
      PersonRoles {
        items {
          id
          roleID
          Role {
            id
            name
          }
        }
      }
    }
  }
`;

export const createMovieMinimal = `
  mutation CreateMovie($input: CreateMovieInput!) {
    createMovie(input: $input) {
      id
      name
      name_eng
      genre
      description
      description_eng
      description_language
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
      creators_comment
      is_highlighted
      trailer_location
      raw_video_location
      hls_url
      dash_url
      cmaf_hls_url
      cmaf_dash_url
      drm_key_id
      drm_resource_id
      approved
    }
  }
`;

export const updateMovieMinimal = `
  mutation UpdateMovie($input: UpdateMovieInput!) {
    updateMovie(input: $input) {
      id
      name
      name_eng
      genre
      description
      description_eng
      description_language
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
      creators_comment
      is_highlighted
      trailer_location
      raw_video_location
      hls_url
      dash_url
      cmaf_hls_url
      cmaf_dash_url
      drm_key_id
      drm_resource_id
      approved
    }
  }
`;

export const createAwardMinimal = `
  mutation CreateAward($input: CreateAwardInput!) {
    createAward(input: $input) {
      id
      name
      year
      category
      comment
      movieID
    }
  }
`;

export const createMovieTeamMinimal = `
  mutation CreateMovieTeam($input: CreateMovieTeamInput!) {
    createMovieTeam(input: $input) {
      id
      MovieName
    }
  }
`;

export const listMoviesForReview = `
  query ListMoviesForReview($filter: ModelMovieFilterInput) {
    listMovies(filter: $filter) {
      items {
        id
        name
        name_eng
        created_year
        origin_country
        raw_video_location
        hls_url
        dash_url
        cmaf_hls_url
        cmaf_dash_url
        drm_key_id
        drm_resource_id
        approved
        MovieTeam {
          id
          PersonMovieTeams {
            items {
              id
              Role {
                name
                name_eng
              }
              Person {
                id
                name
                surname
                is_entity
                approved
              }
            }
          }
        }
      }
    }
  }
`;

export const deletePersonRole = `
  mutation DeletePersonRole($input: DeletePersonRoleInput!) {
    deletePersonRole(input: $input) {
      id
    }
  }
`;

export const createPersonRole = `
  mutation CreatePersonRole($input: CreatePersonRoleInput!) {
    createPersonRole(input: $input) {
      id
      personID
      roleID
    }
  }
`;

