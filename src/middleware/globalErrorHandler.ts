
import { ZodError } from 'zod';
import handleZodError from '../error/handleZoodValidationError';
import handleDuplicateError from '../error/handleDupleacteError';
import AppError from '../error/AppError';
import type { NextFunction, Request, Response } from 'express';
import type { TErrorSource } from '../interface/error';
import { configDotenv } from 'dotenv';
import { envVars } from '../envConfig/env';
import { Prisma } from '@prisma/client';
import { handlePrismaClientError } from '../error/handlePrismaClientError';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'something went wrong!';
  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'something went wrong!',
    },
  ];

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const simpleError = handlePrismaClientError(err)

    statusCode = simpleError.statusCode;
    message = simpleError.message;
    errorSources = simpleError.errorSources;
    
    return res.status(statusCode).json({
      success: false,
      message,
      errorSources,
      errorStack: envVars.NODE_ENV === 'development' ? err?.stack : null,
    });
  }

  if (err instanceof ZodError) {
    const simpleError = handleZodError(err);
    statusCode = simpleError.statusCode
    message = simpleError.message,
      errorSources = simpleError.errorSources;
  }
  else if (err?.code === 1100) {
    const simpleError = handleDuplicateError(err)
    statusCode = simpleError?.statusCode,
      message = simpleError?.message,
      errorSources = simpleError?.errorSources
  }
  else if (err instanceof AppError) {
    statusCode = err?.statusCode,
      message = err?.message,
      errorSources = [{
        path: '',
        message: err.message
      }]
  }
  else if (err instanceof Error) {
    statusCode = statusCode,
      message = err?.message,
      errorSources = [{
        path: '',
        message: err.message
      }]
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    errorStack: envVars.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;
