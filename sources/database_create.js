import mysql from 'mysql'
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
dotenv.config({ path: '../.env' });

/**
 * Connect to the MY_SQL database
 */
const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
})

export {connection, prisma}