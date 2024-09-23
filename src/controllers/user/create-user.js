import { ZodError } from 'zod';

import { createUserSchema } from '../../schemas/index.js';
import { badRequest, created, serverError } from '../helpers/index.js';

export class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            // validar os campos
            await createUserSchema.parseAsync(params);

            if (!params) {
                return badRequest({ message: 'Request body is required.' });
            }

            // chamar o meu useCase
            const createdUser = await this.createUserUseCase.execute(params);

            return created(createdUser);
        } catch (error) {
            // tratar possíveis erros
            console.error(error);
            if (error instanceof ZodError) {
                return badRequest({ message: error.errors[0].message });
            }

            return serverError();
        }
    }
}
