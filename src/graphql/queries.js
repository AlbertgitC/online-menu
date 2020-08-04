/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getStore = /* GraphQL */ `
  query GetStore($id: ID!) {
    getStore(id: $id) {
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
export const listStores = /* GraphQL */ `
  query ListStores(
    $filter: ModelStoreFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStores(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdBy
        name
        description
        phoneNumber
        email
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getLocation = /* GraphQL */ `
  query GetLocation($id: ID!) {
    getLocation(id: $id) {
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
export const listLocations = /* GraphQL */ `
  query ListLocations(
    $filter: ModelLocationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLocations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      }
      nextToken
    }
  }
`;
export const getItem = /* GraphQL */ `
  query GetItem($id: ID!) {
    getItem(id: $id) {
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
export const listItems = /* GraphQL */ `
  query ListItems(
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdBy
        storeId
        name
        price
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
