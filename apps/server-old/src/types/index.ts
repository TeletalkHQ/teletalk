import { Cellphone } from "@repo/types";
import { JWTPayload, JWTVerifyResult } from "jose";

export type LogLevel = "debug" | "error" | "info" | "warn";

export interface StoredAuthSession extends Cellphone {
	isVerified: boolean;
	verificationCode: string;
}

export interface SessionPayload extends JWTPayload {
	sessionId: string;
}

export interface VerifiedSession extends JWTVerifyResult {
	payload: SessionPayload;
}

export * from "./api";
export * from "./env";
export * from "./error";
export * from "./service";
