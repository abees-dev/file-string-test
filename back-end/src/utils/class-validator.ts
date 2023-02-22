import { ValidationError, validate } from 'class-validator';
import { isEmpty } from 'lodash';
import { HttpStatus } from 'src/enums/http-status';
import { ExeccptionError } from 'src/lib/error-handling';

export const getMessageValidationError = (error: ValidationError[]): string => {
  const errors = error.map((item) => {
    if (isEmpty(item?.children)) {
      return Object.values(item?.constraints || {}).join(', ');
    } else {
      return getMessageValidationError(item?.children || []);
    }
  });
  return errors.join(',');
};

export const validatorDto = async (object: object) => {
  const error = await validate(object);

  if (error.length > 0) {
    throw new ExeccptionError(HttpStatus.BAD_REQUEST, getMessageValidationError(error));
  }

  return true;
};
