import express, { Application } from 'express';
import userRouter from '../routes/usuario'
import cors from 'cors';
import db from '../db/connection';
class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';

        //Metodos Iniciales
        this.dbConnection();
        this.middlewares();
        //Definir mis rutas
        this.routes();

    }

    //Conectarnos a la base de Datos
    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Base de Datos Online')
        } catch (error) {
            throw new Error('Error en la conexion');

        }
    }

    middlewares() {
        //CORS
        this.app.use(cors())
        //LECTURA DEL BODY
        this.app.use(express.json())
        //CARPETA PUBLICA
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.apiPaths.usuarios, userRouter)
    }

    listen() {
        this.app.listen(4000, () => {
            console.log(`Servidor corriendo en el puerto 4000`)
        })
    }
}

export default Server;