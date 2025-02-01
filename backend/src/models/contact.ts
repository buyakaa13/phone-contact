import {boolean, string, z} from 'zod';

export const contactSchema = z.object({
    id: string().optional(),
    name: string().min(2),
    phone: string().regex(/^\d{1,3}\d{9,15}$/, {
        message: 'Phone number must be in the format (1234567890)',
    }),
    email: string().email({message: `Invalid email`}),
    bookmarked: boolean()
});

export type contactModel = z.infer<typeof contactSchema>;