import { z } from "zod";
import { superValidate } from "sveltekit-superforms/server";

const newUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(50),
});

export const load = async (event) => {
  const form = await superValidate(event, newUserSchema);
  
  return { form };
};

export const actions = {
  default: async (event) => {
    const form = await superValidate(event, newUserSchema);

    return { form };
  },
};
