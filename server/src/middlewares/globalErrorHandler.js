// this middleware handles the error globally
const handleError = (error, req, res, next) => {

    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';

    return res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
        stack: error.stack
    })
}

export default handleError;