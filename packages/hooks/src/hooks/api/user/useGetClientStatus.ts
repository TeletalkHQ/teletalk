"use client";

import { type BaseSchema } from "@repo/schema";
import { useState } from "react";

type Arg = { userId: BaseSchema.UserId };

export const useGetClientStatus = ({ userId }: Arg) => {
	useState(userId);
};
