import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    user: Joi.string().required(),
    interest: Joi.array().items(Joi.string()).required(),
    age: Joi.number().required().min(1),
    mobile: Joi.string().required().pattern(/^[0-9]{10}$/),
    email: Joi.string().email().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
