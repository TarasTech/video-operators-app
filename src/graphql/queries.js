/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPerson = /* GraphQL */ `
  query GetPerson($id: ID!) {
    getPerson(id: $id) {
      id
      name
      lastname
      checkins {
        items {
          id
          position
          date
          time
          createdAt
          updatedAt
          personCheckinsId
        }
        nextToken
      }
      createdAt
      updatedAt
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
        lastname
        checkins {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCheckins = /* GraphQL */ `
  query GetCheckins($id: ID!) {
    getCheckins(id: $id) {
      id
      position
      date
      time
      createdAt
      updatedAt
      personCheckinsId
    }
  }
`;
export const listCheckins = /* GraphQL */ `
  query ListCheckins(
    $filter: ModelCheckinsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCheckins(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        position
        date
        time
        createdAt
        updatedAt
        personCheckinsId
      }
      nextToken
    }
  }
`;
