/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateStore = /* GraphQL */ `
  subscription OnCreateStore {
    onCreateStore {
      id
      createdBy
      createdAt
      name
      description
      phoneNumber
      email
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
      createdAt
      name
      description
      phoneNumber
      email
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
      createdAt
      name
      description
      phoneNumber
      email
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
      createdAt
      storeId
      address
      description
      phoneNumber
      email
      menuCategories
      updatedAt
      store {
        id
        createdBy
        createdAt
        name
        description
        phoneNumber
        email
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
      createdAt
      storeId
      address
      description
      phoneNumber
      email
      menuCategories
      updatedAt
      store {
        id
        createdBy
        createdAt
        name
        description
        phoneNumber
        email
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
      createdAt
      storeId
      address
      description
      phoneNumber
      email
      menuCategories
      updatedAt
      store {
        id
        createdBy
        createdAt
        name
        description
        phoneNumber
        email
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
      createdAt
      storeId
      name
      price
      description
      updatedAt
      store {
        id
        createdBy
        createdAt
        name
        description
        phoneNumber
        email
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
      createdAt
      storeId
      name
      price
      description
      updatedAt
      store {
        id
        createdBy
        createdAt
        name
        description
        phoneNumber
        email
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
      createdAt
      storeId
      name
      price
      description
      updatedAt
      store {
        id
        createdBy
        createdAt
        name
        description
        phoneNumber
        email
        updatedAt
      }
    }
  }
`;
