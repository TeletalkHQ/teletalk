import { z } from "zod";

import { IOCollection, IOName } from "../schema";

export type GetInput<T extends IOName> = z.infer<IOCollection[T]["input"]>;
export type GetOutput<T extends IOName> = z.infer<IOCollection[T]["output"]>;
