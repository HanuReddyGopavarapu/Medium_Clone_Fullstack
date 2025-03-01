import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign,verify } from 'hono/jwt';
import { signupschema } from '@hanu124/medium-common';

export const userroute = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

// User signup
userroute.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();
        const parsed = signupschema.safeParse(body);

        if (!parsed.success) {
            return c.json({ error: 'Invalid input format', details: parsed.error }, 400);
        }

        const user = await prisma.user.create({
            data: {
                firstname: body.firstname,
                lastname: body.lastname,
                email: body.email,
                password: body.password,
            },
        });

        return c.json({ message: 'User created successfully', user });
    } catch (e) {
        return c.json({ error: 'Failed to create user', details: e }, 400);
    }
});

// User signin
userroute.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();
        const existingUser = await prisma.user.findUniqueOrThrow({
            where: {
                email: body.email,
                password: body.password,
            },
        });

        const token = await sign({ id: existingUser.id }, c.env.JWT_SECRET);
        return c.json({ message: 'Signin successful', token, user: existingUser });
    } catch (e) {
        return c.json({ error: 'Invalid credentials', details: e }, 401);
    }
});

userroute.get('/me', async (c) => {
    const token = c.req.header('Authorization');
    if (!token) {
        return c.json({ error: 'Unauthorized' }, 401);
    }

    try {
        const decoded = await verify(token, c.env.JWT_SECRET) as { id: string };
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const user = await prisma.user.findUnique({
            where: { id: Number(decoded.id) },
            select: { firstname: true }, // Return only the first name
        });

        if (!user) {
            return c.json({ error: 'User not found' }, 404);
        }

        return c.json(user);
    } catch (e) {
        return c.json({ error: 'Invalid token' }, 401);
    }
});