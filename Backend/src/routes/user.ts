import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signupschema } from '@hanu124/medium-common'

export const userroute = new Hono<{
    Bindings: {
        DATABASE_URL: string
    JWT_SECRET:string
    }
}>()

userroute.post('/signup',async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  try{
    const body = await c.req.json();
    const{success} = signupschema.safeParse(body);
    await prisma.user.create({
      data:{
        firstname:body.firstname,
        lastname:body.lastname,
        email:body.email,
        password:body.password
  
      }
    })
    return c.text('User Created!')
  }catch(e){
    return c.text("invalid user input or - " + {e})
  }
})
userroute.post('/signin',async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  try{
    const body = await c.req.json();
    const existinguser = await prisma.user.findUniqueOrThrow({
      where:{

        email:body.email,
        password:body.password
        
        
      }}
    )
    const verifyid = existinguser.id
    if(verifyid){

      const tokenassign = await sign({id:verifyid},c.env.JWT_SECRET)
      return c.text(`welcome user and your token is - ${tokenassign}`)
    }else{
      return c.text('user exists')
    }
  }catch(e){
    return c.text("invalid input or " +{e})
  
  }
  
})
