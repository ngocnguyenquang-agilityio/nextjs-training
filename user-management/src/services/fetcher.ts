// Libs
import axios, { AxiosError } from 'axios';

// Types
import { User } from '@/interfaces/user';

/**
 * Axios get method
 * @param {string} endpoint
 * @returns
 */
export const fetcher = async (endpoint: string) => {
  try {
    const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + endpoint);

    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const serverError = err as AxiosError;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }

      return { errorMessage: 'An error occurred' };
    }
  }
};

export const createUser = async (endpoint: string, { arg }: { arg: User }) => {
  await axios.post(process.env.NEXT_PUBLIC_API_URL + endpoint, arg);
};

export const editUser = async (endpoint: string, { arg }: { arg: User }) => {
  await axios.put(process.env.NEXT_PUBLIC_API_URL + endpoint, arg);
};
