import {ClassType, transformAndValidate} from 'class-transformer-validator';
import {get} from 'lodash';
import {NextFunction, Response, Request} from 'express';
import {StatusCodes} from 'http-status-codes';

const getValidationHandler = (key: 'query' | 'params' | 'body') => {
  return <T extends object>(classType: ClassType<T>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        req[key] = await transformAndValidate(classType, get(req, key));
        next();
      } catch (e) {
        res.status(StatusCodes.BAD_REQUEST).json(e);
      }
    };
  };
};

export const validateRequestQuery = getValidationHandler('query');

export const validateRequestBody = getValidationHandler('body');

export const validateRequestParams = getValidationHandler('params');
