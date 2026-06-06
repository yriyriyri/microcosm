import { authClient } from "./authClient";
import { VOXL_AUTH_API_URL } from "./env";

export interface UserProfile {
  _id: string;
  username: string;
  bio: string;
}

export async function GetUserProfile(user_id: string) {
  const result = await authClient.get<UserProfile>(`/users/${user_id}/profile`);
  if (result.status == 200) {
    return result.data;
  }
  throw new Error(
    `get user profile for ${user_id} error: ${JSON.stringify(result.data)}`
  );
}

export async function ListUsers() {
  const result = await authClient.get<UserProfile[]>(`/users`);
  if (result.status == 200) {
    return result.data;
  }
  throw new Error(`get users error: ${JSON.stringify(result.data)}`);
}

export async function UploadAvatar(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const result = await authClient.put(`/users/avatar`, formData);
  if (result.status == 200) {
    return;
  }

  throw new Error(`upload avatar error: ${JSON.stringify(result.data)}`);
}

export function MakeUserAvatarUrl(user_id: string) {
  return `${VOXL_AUTH_API_URL}/users/${user_id}/avatar`;
}