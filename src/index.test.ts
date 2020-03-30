import {
    PropertyState, isAsyncProperty,
    emptyProperty, isEmpty,
    requestProperty, isRequest,
    setSuccessProperty, isSuccess,
    setFailureProperty, isFailure,
    cancelProperty, setCancelProperty, isCancel
} from './index'

const nonAsyncProperty = {
    state: 'Not Async Property',
}
const asyncProperty = {
    state: PropertyState.EMPTY
}

const testEmptyProperty = emptyProperty

const testRequestProperty = requestProperty

const testSuccessPropertyValue = 'success value'
const testSuccessProperty = setSuccessProperty(testSuccessPropertyValue)

const testFailurePropertyError = new Error('test error')
const testFailureProperty = setFailureProperty(testFailurePropertyError)

const testCancelPropertyReason = 'test reason'
const testCancelProperty = setCancelProperty(testCancelPropertyReason)
const testCancelPropertyWithoutReason = cancelProperty

describe('Test AsyncProperty', () => {
    test('isAsyncProperty true', () => {
        expect(isAsyncProperty(asyncProperty)).toBeTruthy()
    })

    test('isAsyncProperty false', () => {
        expect(isAsyncProperty(nonAsyncProperty)).toBeFalsy()
    })
})

describe('Test Empty property', () => {
    test('isAsyncProperty', () => {
        expect(isAsyncProperty(testEmptyProperty)).toBeTruthy()
    })

    test('isEmpty true', () => {
        expect(isEmpty(testEmptyProperty)).toBeTruthy()
    })

    test('isEmpty false', () => {
        expect(isEmpty(testRequestProperty)).toBeFalsy()
    })

    test('Check status', () => {
        expect(testEmptyProperty.state).toStrictEqual(PropertyState.EMPTY)
    })
})

describe('Test Request property', () => {
    test('isAsyncProperty', () => {
        expect(isAsyncProperty(testRequestProperty)).toBeTruthy()
    })

    test('isRequest true', () => {
        expect(isRequest(testRequestProperty)).toBeTruthy()
    })

    test('isRequest false', () => {
        expect(isRequest(testEmptyProperty)).toBeFalsy()
    })

    test('Check status', () => {
        expect(testRequestProperty.state).toStrictEqual(PropertyState.REQUEST)
    })
})

describe('Test Success property', () => {
    test('isAsyncProperty', () => {
        expect(isAsyncProperty(testSuccessProperty)).toBeTruthy()
    })

    test('isSuccess true', () => {
        expect(isSuccess(testSuccessProperty)).toBeTruthy()
    })

    test('isSuccess false', () => {
        expect(isSuccess(testEmptyProperty)).toBeFalsy()
    })

    test('Check status', () => {
        expect(testSuccessProperty.state).toStrictEqual(PropertyState.SUCCESS)
    })
})

describe('Test Failure property', () => {
    test('isAsyncProperty', () => {
        expect(isAsyncProperty(testFailureProperty)).toBeTruthy()
    })

    test('isFailure true', () => {
        expect(isFailure(testFailureProperty)).toBeTruthy()
    })

    test('isFailure false', () => {
        expect(isFailure(testEmptyProperty)).toBeFalsy()
    })

    test('Check status', () => {
        expect(testFailureProperty.state).toStrictEqual(PropertyState.FAILURE)
    })
})

describe('Test Cancel property', () => {
    test('isAsyncProperty', () => {
        expect(isAsyncProperty(testCancelProperty)).toBeTruthy()
    })

    test('isCancel true', () => {
        expect(isCancel(testCancelProperty)).toBeTruthy()
    })

    test('isCancel false', () => {
        expect(isCancel(testEmptyProperty)).toBeFalsy()
    })

    test('Test Cancel property without reason', () => {
        expect(testCancelPropertyWithoutReason.reason).toBeUndefined()
    })

    test('Check status', () => {
        expect(testCancelProperty.state).toStrictEqual(PropertyState.CANCEL)
    })
})