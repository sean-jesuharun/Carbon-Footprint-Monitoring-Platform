
function errorHandler(err, req, res, next) {
    if (err.response) {
        // The request was made and the server responded with a status code
        res.status(err.response.status).json(err.response.data);
    } else if (err.request) {
        // The request was made but no response was received
        res.status(500).json({ errors: [{ message: 'No response received from the server'}] });
    } else {
        // Something happened in setting up the request that triggered an error
        res.status(500).json({ errors: [{ message: 'An error occurred while processing the request'}] });
    }
}

module.exports = errorHandler;
