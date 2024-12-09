"use client";

import { useState } from "react";

import { type Url } from "../../../utils/useConfigs";
import { usePingApi } from "./pingApi";

export type ServerAvailabilityStatusType =
	| "idle"
	| "offline"
	| "online"
	| "pending";

export interface ServerTestResult {
	url: Url | undefined;
	ping: number | undefined;
	status: ServerAvailabilityStatusType;
}

export const usePing = () => {
	const [testResult, setTestResult] = useState<ServerTestResult>({
		ping: -1,
		status: "idle",
		url: undefined,
	});

	const pingApi = usePingApi();

	const pinger = async (url: Url) => {
		setTestResult({
			...testResult,
			status: "pending",
		});

		const startTime = Date.now();

		await pingApi.handler({
			data: {},
			config: {
				baseURL: url,
				onError: () => {
					setTestResult({
						...testResult,
						ping: -1,
						status: "offline",
					});
				},
			},
		});

		const endTime = Date.now();

		const result: ServerTestResult = {
			ping: endTime - startTime,
			status: "online",
			url,
		};

		setTestResult(result);

		return result;
	};

	const updateStatus = (status: ServerAvailabilityStatusType) => {
		setTestResult({
			...testResult,
			status,
		});
	};

	return {
		handlers: {
			pinger,
			updateStatus,
		},
		data: {
			testResult,
		},
	};
};
