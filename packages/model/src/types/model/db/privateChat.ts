import { PrivateChatItem } from "@repo/type-store";
import { Document, HydratedDocument, Model } from "mongoose";

export type IPrivateChatDoc = PrivateChatItem & Document;
export type IPrivateChatModel = Model<IPrivateChatDoc>;

export type HydratedPrivateChat = HydratedDocument<PrivateChatItem>;
