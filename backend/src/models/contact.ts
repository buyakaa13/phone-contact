import {boolean, string, z} from 'zod';

export const contactSchema = z.object({
    id: string().optional(),
    name: string().min(2),
    phone: string().regex(/^\d{3}-\d{3}-\d{4}$/, {
        message: 'Phone number must be in a valid format, e.g., 123-456-7890',
    }),
    email: string().email({message: `Invalid email`}),
    bookmarked: boolean()
});

export type contactModel = z.infer<typeof contactSchema>;