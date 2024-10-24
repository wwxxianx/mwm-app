import { z } from "zod";
import { AdminSchema } from "../../../types/dataType";

export const AdminValidator = AdminSchema.omit({
    id: true,
});

export type AdminPayload = z.infer<typeof AdminValidator>;
