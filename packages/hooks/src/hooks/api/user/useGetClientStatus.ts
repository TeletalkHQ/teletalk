"use client";

import { BaseSchema } from "@repo/schema";
import { useState } from "react";

type Arg = { userId: BaseSchema.UserId };

export const useGetClientStatus = ({ userId }: Arg) => {
	useState(userId);
};
