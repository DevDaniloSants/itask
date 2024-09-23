import express from 'express';
import 'dotenv/config';
import { CreateUserController } from './src/controllers/index.js';
import { PostgresCreateUserRepository } from './src/repositories/index.js';
import { CreateUserUseCase } from './src/use-cases/index.js';

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/', async (request, response) => {
    const createUserRepository = new PostgresCreateUserRepository();
    const createUserUseCase = new CreateUserUseCase(createUserRepository);
    const createUserController = new CreateUserController(createUserUseCase);

    const { statusCode, body } = await createUserController.execute(request);

    response.status(statusCode).send(body);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
