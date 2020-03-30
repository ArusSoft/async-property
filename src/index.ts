export type AsyncProperty<T, F = Error> = EmptyProperty | RequestProperty | SuccessProperty<T> | FailureProperty<F> | CancelProperty;

export const enum PropertyState {
    EMPTY = 'Empty',
    REQUEST = 'Request',
    SUCCESS = 'Success',
    FAILURE = 'Failure',
    CANCEL = 'Cancel',
}

export const isAsyncProperty =
    <T, F>(property: any): property is AsyncProperty<T, F> =>
        property.state && (
            property.state === PropertyState.EMPTY
            || property.state === PropertyState.REQUEST
            || property.state === PropertyState.SUCCESS
            || property.state === PropertyState.FAILURE
            || property.state === PropertyState.CANCEL
        )

// ------------------ Empty -------------------------------------

export type EmptyProperty = {
    state: PropertyState.EMPTY
}

export const emptyProperty: EmptyProperty = {
    state: PropertyState.EMPTY
}

export const isEmpty =
    (property: AsyncProperty<any>): property is EmptyProperty =>
        property.state === PropertyState.EMPTY;

// ------------------ Request ------------------------------------

export type RequestProperty = {
    state: PropertyState.REQUEST
}

export const requestProperty: RequestProperty = {
    state: PropertyState.REQUEST
}

export const isRequest =
    (property: AsyncProperty<any>): property is RequestProperty =>
        property.state === PropertyState.REQUEST

// ------------------ Success -----------------------------------

export type SuccessProperty<T> = {
    state: PropertyState.SUCCESS,
    value: T,
}

export const setSuccessProperty = <T>(value: T): SuccessProperty<T> => ({
    state: PropertyState.SUCCESS,
    value,
})

export const isSuccess =
    <T>(property: AsyncProperty<T>): property is SuccessProperty<T> =>
        property.state === PropertyState.SUCCESS

// ------------------ Failure -----------------------------------

export type FailureProperty<T = Error> = {
    state: PropertyState.FAILURE,
    error: T,
}

export const setFailureProperty = <T>(error: T): FailureProperty<T> => ({
    state: PropertyState.FAILURE,
    error,
})

export const isFailure =
    <T>(property: AsyncProperty<any, T>): property is FailureProperty<T> =>
        property.state === PropertyState.FAILURE

// ------------------ Cancel -----------------------------------

export type CancelProperty = {
    state: PropertyState.CANCEL,
    reason?: string,
}

export const cancelProperty: CancelProperty = {
    state: PropertyState.CANCEL
}

export const setCancelProperty = (reason: string): CancelProperty => ({
    state: PropertyState.CANCEL,
    reason,
})

export const isCancel =
    (property: AsyncProperty<any>): property is CancelProperty =>
        property.state === PropertyState.CANCEL
