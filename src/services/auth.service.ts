import axios from "axios";

export interface LoginResponse {
  data: {
    token: string;
    user: {
      id: string;
      email: string;
      username: string;
      firstName: string;
      role: {
        id: string;
        name: string;
      };
      [key: string]: any;
    };
  };
  code: number;
  success: boolean;
  message: string;
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    const { data } = await axios.post<LoginResponse>(`${backendUrl}/auth`, {
      email,
      password,
    });

    return data;
  },
};