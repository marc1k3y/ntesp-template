import { sequelize } from "../service/postgre";
import { DataTypes, sql } from "@sequelize/core"

export const UserModel = sequelize.define("user", {
  id: {
    type: DataTypes.STRING,
    defaultValue: sql.uuidV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});