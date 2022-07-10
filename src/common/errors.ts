export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

interface AppHttpErrorArgs {
  httpCode: HttpStatusCode;
  message: string;
}

export class AppHttpError extends Error {
  public readonly httpCode: HttpStatusCode;

  constructor(args: AppHttpErrorArgs) {
    super(args.message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.httpCode = args.httpCode;

    Error.captureStackTrace(this);
  }
}

export class BadRequestError extends AppHttpError {
  constructor(message: string) {
    super({
      httpCode: HttpStatusCode.BAD_REQUEST,
      message,
    });
  }
}
