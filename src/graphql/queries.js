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
        createdAt
        storeId
        address
        description
        phoneNumber
        email
        menuCategories
        updatedAt
      }
      nextToken
    }
  }
`;
export const locationsByCreatedDate = /* GraphQL */ `
  query LocationsByCreatedDate(
    $storeId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelLocationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    locationsByCreatedDate(
      storeId: $storeId
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
        storeId
        address
        description
        phoneNumber
        email
        menuCategories
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
        createdAt
        storeId
        name
        price
        description
        updatedAt
      }
      nextToken
    }
  }
`;
export const itemsByName = /* GraphQL */ `
  query ItemsByName(
    $storeId: ID
    $name: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    itemsByName(
      storeId: $storeId
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdBy
        createdAt
        storeId
        name
        price
        description
        updatedAt
      }
      nextToken
    }
  }
`;
