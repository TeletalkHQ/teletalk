import { DBUserData } from "@repo/type-store";
import { Document, HydratedDocument, Model } from "mongoose";

export type IUserDoc = DBUserData & Document;
export type IUserModel = Model<IUserDoc>;

export type HydratedUser = HydratedDocument<DBUserData>;
