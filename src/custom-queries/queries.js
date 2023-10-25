
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
    }
  }
`;