import { RequestHandler } from "express";
import { MasterController } from ".";
import { compareSync, hashSync } from "bcrypt";
import { AccountTypeEnum, AuthRequest, TokenPayload } from "../variables/types";
import { JWT_SECRET } from "../variables/constants";
import { sign } from "jsonwebtoken";
import { UserModel } from "../models/user";

const generateJwt = (args: TokenPayload) => {
  if (!JWT_SECRET) throw new Error("500:jwt secret not found");
  return sign(args, JWT_SECRET, { expiresIn: "12h" });
}

export class AuthController extends MasterController {
  create: RequestHandler = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw this.newError(404, "create", "req.body");
      if (password.length < 8) throw this.newError(400, "create", "password.length");
      const findedUser = await UserModel.findOne({ where: { email } });
      if (findedUser) throw this.newError(400, "create", "findedUser");
      const hashPassword = hashSync(password, 4);
      const insertedUser = await UserModel.create({
        email, password: hashPassword
      });
      if (!insertedUser) throw this.newError(500, "create", "!insertedUser");
      const token = generateJwt({
        id: insertedUser.dataValues.id, accountType: AccountTypeEnum.Credentials
      });
      if (!token) throw this.newError(500, "create", "generateJwt");
      res.status(200).json({ token, insertedUser });
    } catch (e) {
      return next(e);
    }
  }

  login: RequestHandler = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw this.newError(404, "login", "req.body");
      const findedUser = await UserModel.findOne({ where: { email } });
      if (!findedUser) throw this.newError(404, "login", "!findedUser");
      const comparePassword = compareSync(password, findedUser.dataValues.password);
      if (!comparePassword) throw this.newError(401, "login", "!comparePassword");
      const token = generateJwt({ id: findedUser.dataValues.id, accountType: findedUser.dataValues.accountType });
      if (!token) throw this.newError(500, "login", "generateJwt");
      res.status(200).json({ token, findedUser });
    } catch (e) {
      return next(e);
    }
  }

  check: RequestHandler = async (req, res, next) => {
    try {
      const { id, accountType } = (req as AuthRequest).token;
      const findedUser = await UserModel.findOne({ where: { id } });
      if (!findedUser) throw this.newError(404, "check", "!findedUser");
      const token = generateJwt({ id, accountType });
      if (!token) throw this.newError(500, "check", "generateJwt");
      res.status(200).json({ token, findedUser });
    } catch (e) {
      return next(e);
    }
  }
}