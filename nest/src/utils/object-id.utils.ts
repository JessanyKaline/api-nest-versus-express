import { Types } from 'mongoose';
import { HttpException, HttpStatus } from '@nestjs/common';

export function validateObjectId(id: string): void {
  if (!Types.ObjectId.isValid(id)) {
    throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
  }
}
