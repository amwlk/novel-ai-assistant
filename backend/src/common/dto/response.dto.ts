export class ResponseDto<T> {
  code: number;
  message: string;
  data: T;
  
  constructor(code: number, message: string, data: T) {
    this.code = code;
    this.message = message;
    this.data = data;
  }
  
  static success<T>(data: T, message = 'success'): ResponseDto<T> {
    return new ResponseDto(200, message, data);
  }
  
  static error<T>(code: number, message: string, data?: T): ResponseDto<T> {
    return new ResponseDto(code, message, data as T);
  }
}

export class PaginatedResponseDto<T> {
  code: number;
  message: string;
  data: T[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
  
  constructor(data: T[], total: number, page: number, pageSize: number) {
    this.code = 200;
    this.message = 'success';
    this.data = data;
    this.meta = {
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }
}
