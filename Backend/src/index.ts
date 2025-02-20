import { Hono } from 'hono'
import {userroute}  from './routes/user'
import { postroute } from './routes/post';


const app = new Hono()
app.route("/api/v1/user/",userroute);
app.route("/api/v1/blog/",postroute);



export default app
