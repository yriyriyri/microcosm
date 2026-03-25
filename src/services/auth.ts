import { authClient } from "./authClient";

export interface IMe {
  user_id: string;
  username: string;
}

export async function Login(username: string, password: string) {
  return authClient.post("/auth/login", { username, password });
}

export async function Register(
  username: string,
  email: string,
  password: string
) {
  return authClient.post("/auth/register", { username, email, password });
}

export async function Me(accessToken?: string) {
  const result = await authClient.get<IMe>("/auth/me", {
    headers: accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : undefined,
  });

  if (result.status === 200) return result.data;
  throw new Error(`get me error: ${JSON.stringify(result.data)}`);
}