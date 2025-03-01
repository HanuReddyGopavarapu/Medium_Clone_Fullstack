import {z}  from "zod";

export const signupschema = z.object({
    firstname:z.string(),
    lastname:z.string(),
    email:z.string().email(),
    password:z.string().min(5)
});

export const signinschema = z.object({
    email:z.string().email(),
    password:z.string().min(5)
});

export const postschema = z.object({
    title:z.string(),
    content:z.string(),
    ispublished:z.boolean().optional().default(false)
    
});
export const updateschema = z.object({
    title:z.string(),
    content:z.string(),
    ispublished:z.boolean().optional().default(false)
    
})

export type Signupschema = z.infer<typeof signupschema>
export type Signinschema = z.infer<typeof signinschema>
export type Postschema = z.infer<typeof postschema>
export type Updateschema = z.infer<typeof updateschema>





