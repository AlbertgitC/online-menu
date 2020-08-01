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
      locations {
        nextToken
      }
      items {
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
      email
      locations {
        nextToken
      }
      items {
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
      email
      locations {
        nextToken
      }
      items {
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
      address
      description
      phoneNumber
      email
      menuCategories
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
      address
      description
      phoneNumber
      email
      menuCategories
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
      address
      description
      phoneNumber
      email
      menuCategories
      createdAt
      updatedAt
    }
  }
`;
export const onCreateItem = /* GraphQL */ `
  subscription OnCreateItem {
    onCreateItem {
      id
      createdBy
      storeId
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
      name
      price
      description
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateItem = /* GraphQL */ `
  subscription OnUpdateItem {
    onUpdateItem {
      id
      createdBy
      storeId
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
      name
      price
      description
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteItem = /* GraphQL */ `
  subscription OnDeleteItem {
    onDeleteItem {
      id
      createdBy
      storeId
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
      name
      price
      description
      createdAt
      updatedAt
    }
  }
`;
