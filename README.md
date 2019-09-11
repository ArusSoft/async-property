# async-property
Simple helper to store async operations state and data.

# Example
To handle with async processes in react and redux we use async types and actions, so why not to use async properties.
```tsx
import React, { useState, useEffect } from 'react'
import {
  AsyncProperty, 
  emptyProperty, requestProperty,
  setSuccessProperty, setFailureProperty,
  isEmpty, isRequest, isSuccess, isFailure
} from 'async-property';

const requestStringProperty = () => new Promise(() => 'async result')

function Example() {
  const [stringProperty, setStringProperty] = useState<AsyncProperty<string>>(emptyProperty)

  useEffect(async () => {
    try {
      setStringProperty(requestProperty)
      const stringResult = await requestStringProperty()
      setStringProperty(setSuccessProperty(stringResult))
    } catch (error) {
      setFailureProperty(error)
    }
  })

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
}
```

# Documentation
## Types
```typescript
type AsyncProperty<T, F = Error> = EmptyProperty | RequestProperty | SuccessProperty<T> | FailureProperty<F> | CancelProperty;
type EmptyProperty = {
    status: PropertyStatus.EMPTY
}
type RequestProperty = {
    status: PropertyStatus.REQUEST
}
type SuccessProperty<T> = {
    status: PropertyStatus.SUCCESS,
    value: T,
}
type FailureProperty<T = Error> = {
    status: PropertyStatus.FAILURE,
    error: T,
}
type CancelProperty = {
    status: PropertyStatus.CANCEL,
    reason?: string,
}
```
## Enum
```typescript
const enum PropertyStatus {
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
    status: PropertyStatus.EMPTY
}
const requestProperty: RequestProperty = {
    status: PropertyStatus.REQUEST
}
const cancelProperty: CancelProperty = {
    status: PropertyStatus.CANCEL
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

# Build
```
npm run build
```

# Test
```
npm test
```