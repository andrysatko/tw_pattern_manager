import { HttpException } from '@nestjs/common';

type Assert = (
  condition: unknown,
  ErrorType?: new (message?: string) => HttpException,
  message?: string,
) => asserts condition;

/**
 * assert condition and throws a HttpException
 */
export const assert: Assert = (condition, ErrorType, message) => {
  if (!condition) {
    if (ErrorType) {
      if (message) {
        throw new ErrorType(message);
      }

      throw new ErrorType();
    }

    throw new Error(message);
  }
};

export function assertNotNull<T>(item: T): item is NonNullable<T> {
  return item !== null && item !== undefined;
}
