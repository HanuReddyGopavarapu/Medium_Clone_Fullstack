// import { Hono } from 'hono'
// import { PrismaClient } from '@prisma/client/edge'
// import { withAccelerate } from '@prisma/extension-accelerate'
// import { verify } from 'hono/jwt'



// export const postroute = new Hono<{
//     Bindings: {
//         DATABASE_URL: string;
//         JWT_SECRET:string;
//     },
//     Variables:{
//       userid:string;
//     }
// }>()

// postroute.use("*",async(c,next)=>{
//   const authheader = c.req.header('authorization')||" ";
 
//   try{
//     const usertoken = await verify(authheader,c.env.JWT_SECRET)as { id: string }
//     if(usertoken){
//       c.set('userid',usertoken.id);
//       await next();
//   }}catch(e){
//     return c.text(`header invalid`)

//   }});


// postroute.post('/post',async (c) => {
//     const prisma = new PrismaClient({
//       datasourceUrl: c.env.DATABASE_URL,
//     }).$extends(withAccelerate())
//     try{
//       const body = await c.req.json();
//       const authorid = c.get('userid')
//       await prisma.post.create({
//         data:{
//             title:body.title,
//             content:body.content,
//             ispublished:body.ispublished,
//             authorid:Number(authorid)
            
//         }
//     })
//     return c.text('Post Created')
//     }catch(e){
//         return c.text(`invalid post input or - ${e}`)
//     }
//   })
//   postroute.put('/update', async (c) => {
//     const authorid = c.get('userid')
//     const prisma = new PrismaClient({
//       datasourceUrl: c.env?.DATABASE_URL	,
//     }).$extends(withAccelerate());
//     try{
//       const body = await c.req.json();
//       prisma.post.update({
//         where: {
//           id: body.id,
//           authorid:Number( authorid)
        
//         },
//         data: {
//           title: body.title,
//           content: body.content
//         }
//       });

//     }catch(e){
//       return c.text(`not updated info or ${e}`);
//     }
    
  
   
//   });





//   postroute.get('/bulk',async (c) => {
//     const authorid = c.get('userid')
//     const prisma = new PrismaClient({
//         datasourceUrl: c.env.DATABASE_URL,
//       }).$extends(withAccelerate())
//       try{
//           if(authorid){
//             const allpost = await prisma.post.findMany()
//           return c.json(allpost)
//           }
          
//       }catch(e){
//         return c.text(`invalid or ${e}`)
//       }
//   })
  


import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt';

export const postroute = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userid: string;
    }
}>();

// Middleware to verify JWT token
postroute.use('*', async (c, next) => {
    const authheader = c.req.header('authorization') || '';
    try {
        const usertoken = await verify(authheader, c.env.JWT_SECRET) as { id: string };
        if (usertoken) {
            c.set('userid', usertoken.id);
            await next();
        }
    } catch (e) {
        return c.json({ error: 'Unauthorized' }, 401);
    }
});

// Create a new post
postroute.post('/post', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();
        const authorid = c.get('userid');

        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                ispublished: body.ispublished || false, // Default to false if not provided
                authorid: Number(authorid),
            },
        });

        return c.json({ message: 'Post created successfully', post });
    } catch (e) {
        return c.json({ error: 'Invalid post input', details: e }, 400);
    }
});

// Update a post
postroute.put('/update', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();
        const authorid = c.get('userid');

        const updatedPost = await prisma.post.update({
            where: {
                id: body.id,
                authorid: Number(authorid),
            },
            data: {
                title: body.title,
                content: body.content,
                ispublished: body.ispublished,
            },
        });

        return c.json({ message: 'Post updated successfully', post: updatedPost });
    } catch (e) {
        return c.json({ error: 'Failed to update post', details: e }, 400);
    }
});

// Fetch all posts
postroute.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const allPosts = await prisma.post.findMany();
        return c.json(allPosts);
    } catch (e) {
        return c.json({ error: 'Failed to fetch posts', details: e }, 500);
    }
});