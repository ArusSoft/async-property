export const isAsyncProperty = (property) => property.status && (property.status === "Empty" /* EMPTY */
    || property.status === "Request" /* REQUEST */
    || property.status === "Success" /* SUCCESS */
    || property.status === "Failure" /* FAILURE */
    || property.status === "Cancel" /* CANCEL */);
export const emptyProperty = {
    status: "Empty" /* EMPTY */
};
export const isEmpty = (property) => property.status === "Empty" /* EMPTY */;
export const requestProperty = {
    status: "Request" /* REQUEST */
};
export const isRequest = (property) => property.status === "Request" /* REQUEST */;
export const setSuccessProperty = (value) => ({
    status: "Success" /* SUCCESS */,
    value,
});
export const isSuccess = (property) => property.status === "Success" /* SUCCESS */;
export const setFailureProperty = (error) => ({
    status: "Failure" /* FAILURE */,
    error,
});
export const isFailure = (property) => property.status === "Failure" /* FAILURE */;
export const cancelProperty = {
    status: "Cancel" /* CANCEL */
};
export const setCancelProperty = (reason) => ({
    status: "Cancel" /* CANCEL */,
    reason,
});
export const isCancel = (property) => property.status === "Cancel" /* CANCEL */;
