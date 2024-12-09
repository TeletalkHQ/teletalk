"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
	type Control as RHFControl,
	type SubmitHandler as RHFSubmitHandler,
	useForm as RHFUseForm,
	type UseFormHandleSubmit,
} from "react-hook-form";
import type z from "zod";
import type { ZodSchema } from "zod";

export type GetFormValues<T extends ZodSchema> = z.infer<T>;

export type Control<T extends ZodSchema = ZodSchema> = RHFControl<
	GetFormValues<T>,
	GetFormValues<T>
>;

type UseFormArgs<T extends ZodSchema> = Partial<
	Parameters<typeof RHFUseForm<GetFormValues<T>, any, GetFormValues<T>>>[0]
> & {
	schema: ZodSchema;
	initialData?: z.infer<T>;
};

export type SubmitHandler<T extends ZodSchema> = RHFSubmitHandler<
	GetFormValues<T>
>;

export type FormOnSubmit = React.FormEventHandler<HTMLFormElement>;

export const useForm = <T extends ZodSchema>({
	schema,
	initialData,
	...rest
}: UseFormArgs<T>) => {
	type FormValues = GetFormValues<T>;

	const {
		control,
		trigger,
		reset: resetRhf,
		...restOfUseFormReturns
	} = RHFUseForm<FormValues, any, FormValues>({
		...rest,
		resolver: zodResolver(schema),
		// reValidateMode: "onChange",
	});

	const reset = () => resetRhf();

	return {
		...restOfUseFormReturns,
		schema,
		reset,
		control: control as Control<T>,
		handleSubmit: restOfUseFormReturns.handleSubmit as UseFormHandleSubmit<
			GetFormValues<T>
		>,
	};
};
