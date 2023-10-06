import {randomUUID} from "node:crypto"
import { sql } from "./db.js"

export class databasepostgres {
async list(search){
    let videos

    if (search){
        videos  = await sql`select * from videos where title iLike ${'%' +search+ '%'}`
    }
    else{
        videos  = await sql `select * from videos`
    }
    return videos
}

    async create(video){
        const videoId = randomUUID()
        const { title, description, duration } = video
       
        await sql`insert into videos (Id, title, description, duration) VALUES (${videoId}, ${title}, ${description}, ${duration})`
    }
    async update(id, { title, description, duration } ){
    
    
       await sql`update videos set title = ${title}, description =  ${description}, duration =  ${duration} WHERE id =  ${id}`
    }

    async delete(id) {
       
    await sql`delete from videos where id = ${id}`
    }
}    


