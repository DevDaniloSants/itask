import express from 'express';
import 'dotenv/config';
import {
    CreateUserController,
    GetUserByIdController,
} from './src/controllers/index.js';

import {
    GetUserByEmailRepository,
    GetUserByIdRepository,
    PostgresCreateUserRepository,
} from './src/repositories/index.js';

import {
    CreateUserUseCase,
    GetUserByIdUseCase,
} from './src/use-cases/index.js';

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/', async (request, response) => {
    const createUserRepository = new PostgresCreateUserRepository();
    const getUserByEmailRepository = new GetUserByEmailRepository();
    const createUserUseCase = new CreateUserUseCase(
        createUserRepository,
        getUserByEmailRepository,
    );
    const createUserController = new CreateUserController(createUserUseCase);

    const { statusCode, body } = await createUserController.execute(request);

    response.status(statusCode).send(body);
});

app.get('/:id', async (request, response) => {
    const getUserByIdRepository = new GetUserByIdRepository();
    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);
    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

    const { statusCode, body } = await getUserByIdController.execute(request);

    response.status(statusCode).send(body);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
