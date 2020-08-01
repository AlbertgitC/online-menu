/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createStore = /* GraphQL */ `
  mutation CreateStore(
    $input: CreateStoreInput!
    $condition: ModelStoreConditionInput
  ) {
    createStore(input: $input, condition: $condition) {
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
export const updateStore = /* GraphQL */ `
  mutation UpdateStore(
    $input: UpdateStoreInput!
    $condition: ModelStoreConditionInput
  ) {
    updateStore(input: $input, condition: $condition) {
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
export const deleteStore = /* GraphQL */ `
  mutation DeleteStore(
    $input: DeleteStoreInput!
    $condition: ModelStoreConditionInput
  ) {
    deleteStore(input: $input, condition: $condition) {
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
export const createLocation = /* GraphQL */ `
  mutation CreateLocation(
    $input: CreateLocationInput!
    $condition: ModelLocationConditionInput
  ) {
    createLocation(input: $input, condition: $condition) {
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
export const updateLocation = /* GraphQL */ `
  mutation UpdateLocation(
    $input: UpdateLocationInput!
    $condition: ModelLocationConditionInput
  ) {
    updateLocation(input: $input, condition: $condition) {
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
export const deleteLocation = /* GraphQL */ `
  mutation DeleteLocation(
    $input: DeleteLocationInput!
    $condition: ModelLocationConditionInput
  ) {
    deleteLocation(input: $input, condition: $condition) {
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
export const createItem = /* GraphQL */ `
  mutation CreateItem(
    $input: CreateItemInput!
    $condition: ModelItemConditionInput
  ) {
    createItem(input: $input, condition: $condition) {
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
export const updateItem = /* GraphQL */ `
  mutation UpdateItem(
    $input: UpdateItemInput!
    $condition: ModelItemConditionInput
  ) {
    updateItem(input: $input, condition: $condition) {
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
export const deleteItem = /* GraphQL */ `
  mutation DeleteItem(
    $input: DeleteItemInput!
    $condition: ModelItemConditionInput
  ) {
    deleteItem(input: $input, condition: $condition) {
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
