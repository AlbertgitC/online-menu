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
      email
      createdAt
      updatedAt
      locations {
        nextToken
      }
      items {
        nextToken
      }
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
      email
      createdAt
      updatedAt
      locations {
        nextToken
      }
      items {
        nextToken
      }
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
      email
      createdAt
      updatedAt
      locations {
        nextToken
      }
      items {
        nextToken
      }
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
      email
      menuCategories
      createdAt
      updatedAt
      store {
        id
        createdBy
        name
        description
        phoneNumber
        email
        createdAt
        updatedAt
      }
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
      email
      menuCategories
      createdAt
      updatedAt
      store {
        id
        createdBy
        name
        description
        phoneNumber
        email
        createdAt
        updatedAt
      }
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
      email
      menuCategories
      createdAt
      updatedAt
      store {
        id
        createdBy
        name
        description
        phoneNumber
        email
        createdAt
        updatedAt
      }
    }
  }
`;
export const onCreateItem = /* GraphQL */ `
  subscription OnCreateItem {
    onCreateItem {
      id
      createdBy
      storeId
      name
      price
      description
      createdAt
      updatedAt
      store {
        id
        createdBy
        name
        description
        phoneNumber
        email
        createdAt
        updatedAt
      }
    }
  }
`;
export const onUpdateItem = /* GraphQL */ `
  subscription OnUpdateItem {
    onUpdateItem {
      id
      createdBy
      storeId
      name
      price
      description
      createdAt
      updatedAt
      store {
        id
        createdBy
        name
        description
        phoneNumber
        email
        createdAt
        updatedAt
      }
    }
  }
`;
export const onDeleteItem = /* GraphQL */ `
  subscription OnDeleteItem {
    onDeleteItem {
      id
      createdBy
      storeId
      name
      price
      description
      createdAt
      updatedAt
      store {
        id
        createdBy
        name
        description
        phoneNumber
        email
        createdAt
        updatedAt
      }
    }
  }
`;
