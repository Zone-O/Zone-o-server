const database = require('./database_create')
const bcrypt = require('bcryptjs')
const { use } = require('./server_app')

const hash = async password => {
    const salt = await bcrypt.genSalt(10)
    password = await bcrypt.hash(password, salt)
    return password
  }

async function createFirstUser () {
    const users = await database.prisma.User.findMany({
        where: {
        username: 'root'
        }
    })
    if (users.length == 0) {
        const user = await database.prisma.User.create({
        data: {
            username: 'root',
            email: 'zoneo_2025@labeip.epitech.eu ',
            password: await hash('zoneo_2025'),
            createdAt: Date.now(),
            lastLogin: Date.now(),
            school: 'Epitech',
            favories: []
        }
        })
    }
}

async function GetUsers () {
    const users = await database.prisma.User.findMany({})
    return users
}

module.exports = {createFirstUser, GetUsers}