// Libs
import axios, { AxiosError } from 'axios';

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
