
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
        role
        surname
        PersonMovieTeams {
            items {
            Role {
                name
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
                Movie {
                name
                origin_country
                length
                created_year
                }
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
      trailerGuid
      thumbnail_location
      creators_comment
      photo_location
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
        {name: {contains: $capitalisedSearchString}}, {name_eng: {contains: $capitalisedSearchString}}]}
    ) {
      items {
        id
        name
        name_eng
        created_year
        origin_country
        length
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
       {name: {contains: $capitalisedSearchString}}, {surname: {contains: $capitalisedSearchString}}]}) {
      items {
        name
        surname
        role
        id
        nationality
      }
    }
    listMoviePlaylists(
      filter: {or: [{creator: {contains: $searchString}}, {title: {contains: $searchString}},
        {creator: {contains: $lowSearchString}}, {title: {contains: $lowSearchString}},
        {creator: {contains: $firstCapitalisedSearchString}}, {title: {contains: $firstCapitalisedSearchString}},
        {creator: {contains: $capitalisedSearchString}}, {title: {contains: $capitalisedSearchString}}], is_public: {eq: true}}
    ) {
      items {
        creator
        title
        id
        is_public
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
      member_untill
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
