import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor(message: string) {
    if (message && Array.isArray(message)) {
      // Flatten the error messages into a single string
      const flatMessage = message.join(', ');
      message = flatMessage;
    }
    super(message, HttpStatus.FORBIDDEN);
  }
}
