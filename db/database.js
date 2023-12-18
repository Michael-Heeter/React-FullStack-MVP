import pg from "pg"
import { config } from "dotenv"
import { exit, env } from "process"

config()

const database_pool = new pg.Pool({
    connectionString: env.database_connection_string
})

try {
    await database_pool.connect()
} catch (err) {
    console.log(err)
    exit(1)
}

export default database_pool