export class Response {
  constructor(public readonly status: number) {}
}

export class SuccessResponse<T = any> extends Response {
  constructor(public readonly data: T) {
    super(200);
  }
}

export class FailResponse extends Response {
  constructor(public readonly message: string) {
    super(500);
  }
}

export class ValidationErrorResponse<
  T = Record<string, string[]>
> extends Response {
  constructor(public readonly errors: T) {
    super(400);
  }
}
