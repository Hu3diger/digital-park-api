module.exports = class ResponseModel {
    constructor(status, hasError, message) {
        this.statusCode = status;
        this.hasError = hasError;
        this.message = message;
    }
}