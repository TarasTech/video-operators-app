/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePerson = /* GraphQL */ `
  subscription OnCreatePerson($filter: ModelSubscriptionPersonFilterInput) {
    onCreatePerson(filter: $filter) {
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
export const onUpdatePerson = /* GraphQL */ `
  subscription OnUpdatePerson($filter: ModelSubscriptionPersonFilterInput) {
    onUpdatePerson(filter: $filter) {
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
export const onDeletePerson = /* GraphQL */ `
  subscription OnDeletePerson($filter: ModelSubscriptionPersonFilterInput) {
    onDeletePerson(filter: $filter) {
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
export const onCreateCheckins = /* GraphQL */ `
  subscription OnCreateCheckins($filter: ModelSubscriptionCheckinsFilterInput) {
    onCreateCheckins(filter: $filter) {
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
export const onUpdateCheckins = /* GraphQL */ `
  subscription OnUpdateCheckins($filter: ModelSubscriptionCheckinsFilterInput) {
    onUpdateCheckins(filter: $filter) {
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
export const onDeleteCheckins = /* GraphQL */ `
  subscription OnDeleteCheckins($filter: ModelSubscriptionCheckinsFilterInput) {
    onDeleteCheckins(filter: $filter) {
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
