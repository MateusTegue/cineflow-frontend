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

    const response = await fetch(`${backendUrl}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error en la autenticación');
    }

    return response.json();
  }
};
