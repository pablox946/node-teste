import { fastify } from "fastify"
//import{DataBasememory} from "./database-memory.js"
import { databasepostgres } from "./database-postgres.js"

const server = fastify()

//const database = new DataBasememory()

const database = new databasepostgres()



server.post('/videos', async (request, reply) => {

    const {title, description, duration} = request.body
   

await database.create({
    title,
    description,
    duration
})
return reply.status(201).send()
})


server.get('/videos', async (request) => {
const search = request.query.search
 
const videos = await database.list(search)
return videos
}) 


server.put('/videos/:Id', async (request, reply) => {
const videoId = request.params.Id

const {title, description, duration} = request.body

await database.update(videoId, {
    title,
    description,
    duration,
})
return reply.status(204).send()
}) 

server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
        await database.delete(videoId)

    return reply.status(206).send() 
    }) 

server.listen({
    port: process.env.PORT ?? 3333,

})
