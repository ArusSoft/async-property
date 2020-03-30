export const isAsyncProperty = (property) => property.state && (property.state === "Empty" /* EMPTY */
    || property.state === "Request" /* REQUEST */
    || property.state === "Success" /* SUCCESS */
    || property.state === "Failure" /* FAILURE */
    || property.state === "Cancel" /* CANCEL */);
export const emptyProperty = {
    state: "Empty" /* EMPTY */
};
export const isEmpty = (property) => property.state === "Empty" /* EMPTY */;
export const requestProperty = {
    state: "Request" /* REQUEST */
};
export const isRequest = (property) => property.state === "Request" /* REQUEST */;
export const setSuccessProperty = (value) => ({
    state: "Success" /* SUCCESS */,
    value,
});
export const isSuccess = (property) => property.state === "Success" /* SUCCESS */;
export const setFailureProperty = (error) => ({
    state: "Failure" /* FAILURE */,
    error,
});
export const isFailure = (property) => property.state === "Failure" /* FAILURE */;
export const cancelProperty = {
    state: "Cancel" /* CANCEL */
};
export const setCancelProperty = (reason) => ({
    state: "Cancel" /* CANCEL */,
    reason,
});
export const isCancel = (property) => property.state === "Cancel" /* CANCEL */;
