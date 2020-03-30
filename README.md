# async-property
Simple typesafe helper to store async operations state and data.

# Example
To work with async processes in react and redux we use async types and actions, so why not to use async properties.
```tsx
import React, { useState, useEffect } from 'react'
import {
  AsyncProperty,
  emptyProperty, requestProperty,
  setSuccessProperty, setFailureProperty,
  isEmpty, isRequest, isSuccess, isFailure
} from 'async-property';

const requestStringProperty = async () => new Promise<string>((resolve) => resolve('async result'))

const Example: React.FC = () => {
  const [stringProperty, setStringProperty] = useState<AsyncProperty<string>>(emptyProperty)

  useEffect(() => {
    setStringProperty(requestProperty)

    const fetchData = async () => {
      try {
        const stringResult = await requestStringProperty()
        setStringProperty(setSuccessProperty(stringResult))
      } catch (error) {
        setStringProperty(setFailureProperty(error))
      }
    }
    fetchData()
  }, [])

  if (isEmpty(stringProperty) || isRequest(stringProperty)) {
    return (
      <p>Processing</p>
    )
  }

  if (isFailure(stringProperty)) {
    return (
      <p>Failure: {stringProperty.error}</p>
    )
  }

  if (isSuccess(stringProperty)) {
    return (
      <p>Success: {stringProperty.value}</p>
    )
  }

  return <p>Initialize</p>
}
```

# Documentation
## Types
```typescript
type AsyncProperty<T, F = Error> = EmptyProperty | RequestProperty | SuccessProperty<T> | FailureProperty<F> | CancelProperty;
type EmptyProperty = {
    state: PropertyState.EMPTY
}
type RequestProperty = {
    state: PropertyState.REQUEST
}
type SuccessProperty<T> = {
    state: PropertyState.SUCCESS,
    value: T,
}
type FailureProperty<T = Error> = {
    state: PropertyState.FAILURE,
    error: T,
}
type CancelProperty = {
    state: PropertyState.CANCEL,
    reason?: string,
}
```
## Enum
```typescript
const enum PropertyState {
    EMPTY = 'Empty',
    REQUEST = 'Request',
    SUCCESS = 'Success',
    FAILURE = 'Failure',
    CANCEL = 'Cancel',
}
```
## Constants
```typescript
const emptyProperty: EmptyProperty = {
    state: PropertyState.EMPTY
}
const requestProperty: RequestProperty = {
    state: PropertyState.REQUEST
}
const cancelProperty: CancelProperty = {
    state: PropertyState.CANCEL
}
``` 
## Methods
### Setters
```typescript
function setSuccessProperty<T>(value: T): SuccessProperty<T>
function setFailureProperty<T>(error: T): FailureProperty<T>
function setCancelProperty(reason: string): CancelProperty
```
### Type check
```typescript
function isAsyncProperty<T, F>(property: any): property is AsyncProperty<T, F>
function isEmpty(property: AsyncProperty<any>): property is EmptyProperty
function isRequest(property: AsyncProperty<any>): property is RequestProperty
function isSuccess<T>(property: AsyncProperty<T>): property is SuccessProperty<T>
function isFailure<T>(property: AsyncProperty<any, T>): property is FailureProperty<T>
function isCancel(property: AsyncProperty<any>): property is CancelProperty
```

# Contribute

## Build
```
npm run build
```

## Test
```
npm test
```