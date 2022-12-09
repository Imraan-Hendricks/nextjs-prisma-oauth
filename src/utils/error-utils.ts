export class GenericError extends Error {
  name = 'GenericError';
  status = 500;
  message = 'An error has occured. Please try again.';

  constructor(message?: string) {
    super(message);
    this.message = message || this.message;
  }
}

export class DatabaseError extends GenericError {
  name = 'DatabaseError';
  status = 500;
  message = 'Failed to process data. Please try again.';

  constructor(message?: string) {
    super(message);
    this.message = message || this.message;
  }
}

export class ForbiddenError extends GenericError {
  name = 'ForbiddenError';
  status = 403;
  message = 'Access denied!';

  constructor(message?: string) {
    super(message);
    this.message = message || this.message;
  }
}

export class InternalServerError extends GenericError {
  name = 'InternalServerError';
  status = 500;
  message = 'Something went wrong. Please try again.';

  constructor(message?: string) {
    super(message);
    this.message = message || this.message;
  }
}

export class NotAcceptableError extends GenericError {
  name = 'NotAcceptableError';
  status = 406;
  message = 'Unacceptable request!';

  constructor(message?: string) {
    super(message);
    this.message = message || this.message;
  }
}

export class NotFoundError extends GenericError {
  name = 'NotFoundError';
  status = 404;
  message = 'Failed to load resource.';

  constructor(message?: string) {
    super(message);
    this.message = message || this.message;
  }
}

export class NoRecordError extends GenericError {
  name = 'NoRecordError';
  status = 404;
  message = 'Record does not exist.';

  constructor(message?: string) {
    super(message);
    this.message = message || this.message;
  }
}

export class ServiceUnavailableError extends GenericError {
  name = 'ServiceUnavailableError';
  status = 503;
  message = 'Service is currently unavailable.';

  constructor(message?: string) {
    super(message);
    this.message = message || this.message;
  }
}

export class UnauthorizedError extends GenericError {
  name = 'UnauthorizedError';
  status = 401;
  message = 'Authentication required. Please sign in!';

  constructor(message?: string) {
    super(message);
    this.message = message || this.message;
  }
}

export interface Errors {
  [keys: string]: {
    type: string;
    message: string;
  };
}

export type Location =
  | 'body'
  | 'cookies'
  | 'headers'
  | 'params'
  | 'query'
  | 'unknown';

export class ValidationError extends GenericError {
  name = 'ValidationError';
  status = 400;
  message = 'Invalid data in request.';
  location: Location;
  errors: Errors;

  constructor(location: Location, errors: Errors, message?: string) {
    super(message);
    this.location = location;
    this.errors = errors;
    this.message = message || this.message;
  }
}
