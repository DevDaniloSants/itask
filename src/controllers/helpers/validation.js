import validator from 'validator';
import { badRequest } from './http.js';

export const invalidResponse = () => {
    badRequest({ message: 'The provided id is invalid' });
};

export const checkIfIdIsValid = (id) => {
    return validator.isUUID(id);
};
