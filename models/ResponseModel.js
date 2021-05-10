module.exports = class ResponseModel {
    constructor(status, hasError, data) {
        this.status = status;
        this.hasError = hasError;
        this.data = data;
    }
}
