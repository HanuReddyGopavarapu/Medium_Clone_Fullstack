import { Hono } from 'hono'
import {userroute}  from './routes/user'
import { postroute } from './routes/post';
import {cors} from "hono/cors";


const app = new Hono()
app.use("/*",cors());
app.route("/api/v1/user/",userroute);
app.route("/api/v1/blog/",postroute);



export default app
