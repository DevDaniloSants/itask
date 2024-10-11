import express from 'express';
import 'dotenv/config';
import {
    CreateUserController,
    DeleteUserController,
    GetUserByIdController,
} from './src/controllers/index.js';

import {
    DeleteUserRepository,
    GetUserByEmailRepository,
    GetUserByIdRepository,
    PostgresCreateUserRepository,
} from './src/repositories/index.js';

import {
    CreateUserUseCase,
    DeleteUserUseCase,
    GetUserByIdUseCase,
} from './src/use-cases/index.js';

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.post('/api/users/', async (request, response) => {
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

app.get('/api/users/:id', async (request, response) => {
    const getUserByIdRepository = new GetUserByIdRepository();
    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);
    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

    const { statusCode, body } = await getUserByIdController.execute(request);

    response.status(statusCode).send(body);
});

app.delete('/api/users/:userId', async (request, response) => {
    const deleteUserRepository = new DeleteUserRepository();
    const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository);
    const deleteUserController = new DeleteUserController(deleteUserUseCase);

    const { statusCode, body } = await deleteUserController.execute(request);

    response.status(statusCode).send(body);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
