import { ZodError } from 'zod/lib';

export class GenericError extends Error {
  name = 'GenericError';
  status = 500;
  message = 'An error has occured. Please try again.';

  constructor(message?: string) {
    super(message);
    this.message = message || this.message;
  }
}

export class BadRequestError extends GenericError {
  name = 'BadRequestError';
  status = 400;
  message = 'Invalid data in request.';

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

export type Location =
  | 'body'
  | 'cookies'
  | 'headers'
  | 'params'
  | 'query'
  | 'unknown';

export class ValidationError<T> extends GenericError {
  name = 'ValidationError';
  status = 400;
  message = 'Invalid data in request.';
  errors: ZodError<T>;

  constructor(errors: ZodError<T>, message?: string) {
    super(message);
    this.errors = errors;
    this.message = message || this.message;
  }
}
