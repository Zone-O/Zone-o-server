import {connection, prisma} from './database_create.js'
import bcrypt from 'bcryptjs'

const hash = async password => {
    const salt = await bcrypt.genSalt(10)
    password = await bcrypt.hash(password, salt)
    return password
  }


export const createFirstUser = async () => {
    // const users = await prisma.User.findMany({
    //     where: {
    //     username: 'root'
    //     }
    // })
    // if (users.length == 0) {
    //     const user = await prisma.User.create({
    //     data: {
    //         username: 'root',
    //         email: 'zoneo_2025@labeip.epitech.eu ',
    //         password: await hash('zoneo_2025'),
    //         createdAt: Date.now(),
    //         lastLogin: Date.now(),
    //         school: 'Epitech',
    //         favories: []
    //     }
    //     })
    // }
}

export const GetUsers = async () => {
    const users = await prisma.User.findMany({})
    return users
}