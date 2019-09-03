export type AsyncProperty<T, F = Error> = EmptyProperty | RequestProperty | SuccessProperty<T> | FailureProperty<F> | CancelProperty;

export const enum PropertyStatus {
    EMPTY = 'Empty',
    REQUEST = 'Request',
    SUCCESS = 'Success',
    FAILURE = 'Failure',
    CANCEL = 'Cancel',
}

export const isAsyncProperty =
    <T, F>(property: any): property is AsyncProperty<T, F> =>
        property.status && (
            property.status === PropertyStatus.EMPTY
            || property.status === PropertyStatus.REQUEST
            || property.status === PropertyStatus.SUCCESS
            || property.status === PropertyStatus.FAILURE
            || property.status === PropertyStatus.CANCEL
        )

// ------------------ Empty -------------------------------------

export type EmptyProperty = {
    status: PropertyStatus.EMPTY
}

export const emptyProperty: EmptyProperty = {
    status: PropertyStatus.EMPTY
}

export const isEmpty =
    (property: AsyncProperty<any>): property is EmptyProperty =>
        property.status === PropertyStatus.EMPTY;

// ------------------ Request ------------------------------------

export type RequestProperty = {
    status: PropertyStatus.REQUEST
}

export const requestProperty: RequestProperty = {
    status: PropertyStatus.REQUEST
}

export const isRequest =
    (property: AsyncProperty<any>): property is RequestProperty =>
        property.status === PropertyStatus.REQUEST

// ------------------ Success -----------------------------------

export type SuccessProperty<T> = {
    status: PropertyStatus.SUCCESS,
    value: T,
}

export const setSuccessProperty = <T>(value: T): SuccessProperty<T> => ({
    status: PropertyStatus.SUCCESS,
    value,
})

export const isSuccess =
    <T>(property: AsyncProperty<T>): property is SuccessProperty<T> =>
        property.status === PropertyStatus.SUCCESS

// ------------------ Failure -----------------------------------

export type FailureProperty<T = Error> = {
    status: PropertyStatus.FAILURE,
    error: T,
}

export const setFailureProperty = <T>(error: T): FailureProperty<T> => ({
    status: PropertyStatus.FAILURE,
    error,
})

export const isFailure =
    <T>(property: AsyncProperty<any, T>): property is FailureProperty<T> =>
        property.status === PropertyStatus.FAILURE

// ------------------ Cancel -----------------------------------

export type CancelProperty = {
    status: PropertyStatus.CANCEL,
    reason?: string,
}

export const cancelProperty: CancelProperty = {
    status: PropertyStatus.CANCEL
}

export const setCancelProperty = (reason: string): CancelProperty => ({
    status: PropertyStatus.CANCEL,
    reason,
})

export const isCancel =
    (property: AsyncProperty<any>): property is CancelProperty =>
        property.status === PropertyStatus.CANCEL
