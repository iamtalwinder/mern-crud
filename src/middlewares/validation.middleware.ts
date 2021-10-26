import { Request, Response, NextFunction } from 'express';
import { Schema, ValidationResult } from 'joi';

export class ValidationMiddleware {
  public static validateBody(schema: Schema) {
    return (req: Request, res: Response, next: NextFunction) => {

      const { error }: ValidationResult = schema.validate(
        req.body ? req.body : {}
      );

      if (!error) {
        next();
      } else {
        res.status(400).send({ message: error?.message });
      }
    };
  }
}
