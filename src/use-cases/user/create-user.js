import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { EmailIsAlreadyInUseError } from '../../errors/index.js';

export class CreateUserUseCase {
    constructor(createUserRepository, getUserByEmailRepository) {
        this.createUserRepository = createUserRepository;
        this.getUserByEmailRepository = getUserByEmailRepository;
    }
    async execute(createUserParams) {
        // se o e-mail já está em uso
        const userWithProvidedEmail =
            await this.getUserByEmailRepository.execute(createUserParams.email);

        if (userWithProvidedEmail) {
            throw new EmailIsAlreadyInUseError(createUserParams.email);
        }

        // criptografar senha
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

        // gerar um id para o usuário
        const userId = uuidv4();

        // criar o usuário com os dados criptografados e id gerado
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        };

        // chamar o repository
        const createdUser = await this.createUserRepository.execute(user);

        return createdUser;
    }
}
