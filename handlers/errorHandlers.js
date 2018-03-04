exports.catchErrors = (fn) => {
    return function(req, res, next) {
      return fn(req, res, next).catch(next);
    };
  };
  
  /*    Not found  */
  exports.notFound = (req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  };
  
  /*  MongoDB Validation Error Handler  */
  
  
  /*    Development Error Hanlder  */
  exports.developmentErrors = (err, req, res, next) => {
    err.stack = err.stack || '';
    const errorDetails = {
      message: err.message,
      status: err.status,
      stackHighlighted: err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>')
    };
    res.status(err.status || 500);
    res.json(errorDetails) // Ajax call, send JSON back
  };
  
  
  /*
    Production Error Handler
  */
  exports.productionErrors = (err, req, res, next) => {
    res.status(err.status || 500);
    // res.send({
    //   message: err.message,
    //   error: {}
    // });
  };
  