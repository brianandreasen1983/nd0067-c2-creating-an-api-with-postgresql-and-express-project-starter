import Client from '../database'
import bcrypt from 'bcrypt'

export type User = {
    id: number
    firstName: string
    lastName: string
    password: string
}

export class UserStore {
    async index(): Promise<Array<User>> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM users'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`Unable to get users: ${error}`)
        }
    }

    async show(userId: Number): Promise<User> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM users WHERE id=($1)'
            const result = await conn.query(sql)
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Unable to find a user with the id: ${userId}. Error: ${error}`)
        }
    }

    async create(u: User): Promise<User> {
        try {
            const saltRounds = process.env.SALT_ROUNDS
            const pepper = process.env.BCRYPT_PASSWORD
            const conn = await Client.connect()
            const sql = 'INSERT INTO users (firstname, lastname, password) VALUES ($1, $2, $3) RETURNING *'

            const hash = bcrypt.hashSync(
                u.password + pepper, 
                parseInt(saltRounds)
              );

            const result = await conn.query(sql, [u.firstName, u.lastName, hash])
            const user = result.rows[0]
            conn.release()
            return user
        } catch (error) {
            throw new Error(`Unable to create the user: ${u.firstName} ${u.lastName}. Error: ${error}`)
        }
    }

    async authenticate(username: string, password: string): Promise<User | null> {
        const conn = await Client.connect()
        const sql = 'SELECT password FROM users WHERE username=($1)'
        const pepper = process.env.BCRYPT_PASSWORD
        const result = await conn.query(sql, [username])
    
        if(result.rows.length) {
    
          const user = result.rows[0]
        
          if (bcrypt.compareSync(password + pepper, user.password_digest)) {
            return user
          }
        }
    
        return null
      }
}