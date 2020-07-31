/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateStore = /* GraphQL */ `
  subscription OnCreateStore {
    onCreateStore {
      id
      createdBy
      name
      description
      phoneNumber
      locations {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateStore = /* GraphQL */ `
  subscription OnUpdateStore {
    onUpdateStore {
      id
      createdBy
      name
      description
      phoneNumber
      locations {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteStore = /* GraphQL */ `
  subscription OnDeleteStore {
    onDeleteStore {
      id
      createdBy
      name
      description
      phoneNumber
      locations {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateLocation = /* GraphQL */ `
  subscription OnCreateLocation {
    onCreateLocation {
      id
      createdBy
      storeId
      address
      description
      phoneNumber
      store {
        id
        createdBy
        name
        description
        phoneNumber
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateLocation = /* GraphQL */ `
  subscription OnUpdateLocation {
    onUpdateLocation {
      id
      createdBy
      storeId
      address
      description
      phoneNumber
      store {
        id
        createdBy
        name
        description
        phoneNumber
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteLocation = /* GraphQL */ `
  subscription OnDeleteLocation {
    onDeleteLocation {
      id
      createdBy
      storeId
      address
      description
      phoneNumber
      store {
        id
        createdBy
        name
        description
        phoneNumber
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
