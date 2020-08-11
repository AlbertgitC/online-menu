/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
        createdAt
        name
        description
        phoneNumber
        email
        updatedAt
      }
      nextToken
    }
  }
`;
export const getStore = /* GraphQL */ `
  query GetStore($id: ID!) {
    getStore(id: $id) {
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
export const storesByCreatedDate = /* GraphQL */ `
  query StoresByCreatedDate(
    $createdBy: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStoreFilterInput
    $limit: Int
    $nextToken: String
  ) {
    storesByCreatedDate(
      createdBy: $createdBy
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdBy
        createdAt
        name
        description
        phoneNumber
        email
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
      name
      price
      description
      createdAt
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
