// Unsupported (404) Routes:
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error)
}


// Middleware to handle errors:
const errorHandler = (err, req, res, next) => {
    if(res.headerSent) {
        return next(err)
    }

    res.status(err.code || 500).json({message : err.message || 
    "An unknown error occured" })
}


module.exports = { notFound, errorHandler };


