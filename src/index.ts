import express, { Request, Response } from "express"
import knex from "knex"
import cors from 'cors'
import dotenv from "dotenv";
dotenv.config();

export const connection = knex({
	client: "mysql",
	connection: {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}
});

const app = express()

app.use(express.json())

app.use(cors())

app.listen(3003, () => {
    console.log("Server is running in http://localhost:3003");
});

// Função para cadastro de usuários

const createUser = async (name:string, email:string, password:string): Promise<void> => {
    await connection ("labecommerce_users")
    .insert({
        name: name,
        email: email,
        password: password
    })
}

// Endpoint para cadastro de usuários

app.post('/users', async (req: Request, res: Response): Promise<void> => {
    try {
        await createUser(req.body.name, req.body.email, req.body.password)
        res.send("Usuário criado com sucesso").end()
    } catch (error:any) {
        console.log(error.message)
        res.status(500).send(error.message)
    }
})

// Função listar todos os usuários

const getAllUsers = async (): Promise<void> => {
    const response = await connection.raw('SELECT * FROM labecommerce_users')
    return response[0]
}



// Endpoint para listagem de todos os usuários

app.get('/users', async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await getAllUsers()
        res.send(result)
        res.end()
    } catch (error:any) {
        console.log(error.message)
        res.status(500).send(error.message)
    }
})

// Função para cadastro de produtos

const createProduct = async (name:string, price:number, imageUrl:string): Promise<void> => {
    await connection ("labecommerce_products")
    .insert({
        name: name,
        price: price,
        image_url: imageUrl
    })
}

// Endpoint para cadastro de produtos

app.post('/products', async (req: Request, res: Response): Promise<void> => {
    try {
        await createProduct(req.body.name, req.body.price, req.body.image_url)
        res.send("Produto criado com sucesso").end()
    } catch (error:any) {
        console.log(error.message)
        res.status(500).send(error.message)
    }
})

// Função listar todos os produtos

const getAllProducts = async (): Promise<void> => {
    const response = await connection.raw('SELECT * FROM labecommerce_products')
    return response[0]
}



// Endpoint para listagem de todos os usuários

app.get('/users', async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await getAllProducts()
        res.send(result)
        res.end()
    } catch (error:any) {
        console.log(error.message)
        res.status(500).send(error.message)
    }
})

