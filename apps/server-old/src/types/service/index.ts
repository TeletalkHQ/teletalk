// import { IPrivateChatDoc, IUserDoc } from "@repo/model";
// import {
// 	DBUserData,
// 	PrivateChatItem,
// 	SessionId,
// 	StringMap,
// 	UserData,
// 	UserId,
// } from "@repo/types";
// import { ProjectionType, QueryOptions } from "mongoose";

// export type ServiceHandlerExcludeProp = "_id" | "__v";
// export type ServiceHandlerExcludeProps = ServiceHandlerExcludeProp[];

// export type ServiceMiddleware<Arg extends object, Return> = (
// 	arg: Arg & object
// ) => Return | Promise<Return>;

// export interface ServiceHandlerOptions {
// 	extraExcludeProps: ServiceHandlerExcludeProps;
// 	shouldExclude: boolean;
// }

// export type UserDataProjectionType = ProjectionType<UserData>;
// export type PrivateChatDataProjectionType = ProjectionType<PrivateChatItem>;

// export type ServiceFn<
// 	Query = StringMap,
// 	Return = StringMap,
// 	Model = IUserDoc | IPrivateChatDoc,
// > = (
// 	queryData: Query,
// 	options?: QueryOptions<Model>,
// 	projection?: ProjectionType<Model>
// ) => Return | Promise<Return>;

// export type PrivateChatServiceQueryData = Partial<PrivateChatItem>;

// export type PrivateChatService<
// 	Query extends PrivateChatServiceQueryData,
// 	ReturnData,
// > = ServiceFn<Query, ReturnData, IPrivateChatDoc>;

// export type UserServiceQueryData = Partial<UserData> &
// 	Partial<{
// 		currentSessionId: SessionId;
// 		currentUserId: UserId;
// 		targetUserId: UserId;
// 		userData: DBUserData;
// 	}>;

// export type UserService<
// 	Query extends UserServiceQueryData,
// 	ReturnData,
// > = ServiceFn<Query, ReturnData, IUserDoc>;
