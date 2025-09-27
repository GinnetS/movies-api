import type { Response } from 'express';

export const HttpStatusCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export type HttpStatusCode =
  (typeof HttpStatusCode)[keyof typeof HttpStatusCode];

const statusMessages: Readonly<Record<HttpStatusCode, string>> = {
  [HttpStatusCode.OK]: 'Request was successful.',
  [HttpStatusCode.CREATED]: 'Resource created successfully.',
  [HttpStatusCode.BAD_REQUEST]: 'Bad request. Please check your input.',
  [HttpStatusCode.UNAUTHORIZED]: 'Unauthorized access.',
  [HttpStatusCode.FORBIDDEN]: 'Access is forbidden.',
  [HttpStatusCode.NOT_FOUND]: 'The requested resource was not found.',
  [HttpStatusCode.CONFLICT]:
    'Conflict occurred with the current state of the resource.',
  [HttpStatusCode.INTERNAL_SERVER_ERROR]:
    'An unexpected error occurred on the server.',
};


class ResponseDto {
  readonly status: number;
  readonly message: string;
  readonly data?: object;

  constructor(status: HttpStatusCode, message?: string, data?: object) {
    this.status = status;

    const cleanMessage = message?.trim();
    this.message = cleanMessage || statusMessages[status] || 'Unknown status';

    if (data !== undefined) {
      this.data = data;
    }
  }
}


export const codeResponses = {

  send(res: Response, status: HttpStatusCode, message?: string, data?: object) {
    const response = new ResponseDto(status, message, data);
    return res.status(status).json(response);
  },


  success(res: Response, message?: string) {
    return codeResponses.send(res, HttpStatusCode.OK, message);
  },

  successWithData(res: Response, message?: string, data?: object) {
    return codeResponses.send(res, HttpStatusCode.OK, message, data);
  },

  created(res: Response, data?: object, message?: string) {
    return codeResponses.send(res, HttpStatusCode.CREATED, message, data);
  },

  badRequest(res: Response, message?: string, data?: object) {
    return codeResponses.send(res, HttpStatusCode.BAD_REQUEST, message, data);
  },

  unauthorized(res: Response, message?: string, data?: object) {
    return codeResponses.send(res, HttpStatusCode.UNAUTHORIZED, message, data);
  },

 
  forbidden(res: Response, message?: string, data?: object) {
    return codeResponses.send(res, HttpStatusCode.FORBIDDEN, message, data);
  },

  notFound(res: Response, message?: string, data?: object) {
    return codeResponses.send(res, HttpStatusCode.NOT_FOUND, message, data);
  },


  conflict(res: Response, message?: string, data?: object) {
    return codeResponses.send(res, HttpStatusCode.CONFLICT, message, data);
  },

  error(res: Response, message?: string, data?: object) {
    return codeResponses.send(
      res,
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      message,
      data
    );
  },
} as const;
