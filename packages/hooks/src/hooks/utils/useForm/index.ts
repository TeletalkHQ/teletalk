"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchemaName, formSchema } from "@repo/schema";
import {
	Control as RHFControl,
	SubmitHandler as RHFSubmitHandler,
	useForm as RHFUseForm,
	UseFormHandleSubmit,
} from "react-hook-form";
import z from "zod";

import { formInitialData } from "./initialData";

export type GetFormValues<Name extends FormSchemaName> = z.infer<
	(typeof formSchema)[Name]
>;

export type Control<Name extends FormSchemaName> = RHFControl<
	GetFormValues<Name>,
	GetFormValues<Name>
>;

type UseFormArgs<Name extends FormSchemaName> = Partial<
	Parameters<
		typeof RHFUseForm<GetFormValues<Name>, any, GetFormValues<Name>>
	>[0]
> & {
	schemaName: FormSchemaName;
};

export type SubmitHandler<Name extends FormSchemaName> = RHFSubmitHandler<
	GetFormValues<Name>
>;

export type FormOnSubmit = React.FormEventHandler<HTMLFormElement>;

export const useForm = <Name extends FormSchemaName>({
	schemaName,
	...rest
}: UseFormArgs<Name>) => {
	type FormValues = GetFormValues<Name>;

	const schema = formSchema[schemaName];

	const {
		control,
		trigger,
		reset: resetRhf,
		...restOfUseFormReturns
	} = RHFUseForm<FormValues, any, FormValues>({
		...rest,
		resolver: zodResolver(schema),
		reValidateMode: "onChange",
	});

	const reset = () => resetRhf(formInitialData[schemaName]);

	return {
		...restOfUseFormReturns,
		schema,
		reset,
		control: control as Control<Name>,
		handleSubmit: restOfUseFormReturns.handleSubmit as UseFormHandleSubmit<
			GetFormValues<Name>
		>,
	};
};
