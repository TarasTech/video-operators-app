/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPerson = /* GraphQL */ `
  mutation CreatePerson(
    $input: CreatePersonInput!
    $condition: ModelPersonConditionInput
  ) {
    createPerson(input: $input, condition: $condition) {
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
export const updatePerson = /* GraphQL */ `
  mutation UpdatePerson(
    $input: UpdatePersonInput!
    $condition: ModelPersonConditionInput
  ) {
    updatePerson(input: $input, condition: $condition) {
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
export const deletePerson = /* GraphQL */ `
  mutation DeletePerson(
    $input: DeletePersonInput!
    $condition: ModelPersonConditionInput
  ) {
    deletePerson(input: $input, condition: $condition) {
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
export const createCheckins = /* GraphQL */ `
  mutation CreateCheckins(
    $input: CreateCheckinsInput!
    $condition: ModelCheckinsConditionInput
  ) {
    createCheckins(input: $input, condition: $condition) {
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
export const updateCheckins = /* GraphQL */ `
  mutation UpdateCheckins(
    $input: UpdateCheckinsInput!
    $condition: ModelCheckinsConditionInput
  ) {
    updateCheckins(input: $input, condition: $condition) {
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
export const deleteCheckins = /* GraphQL */ `
  mutation DeleteCheckins(
    $input: DeleteCheckinsInput!
    $condition: ModelCheckinsConditionInput
  ) {
    deleteCheckins(input: $input, condition: $condition) {
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
