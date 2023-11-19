export const getToken = async ({
  username,
  password,
}: {
  username?: string;
  password?: string;
}) => {
  const response = await fetch("http://localhost:3000/api/v1/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) throw new Error("Error obtaining token");
  return response.json();
};

export const refreshToken = async ({
  refresh_token,
}: {
  refresh_token: string;
}) => {
  const response = await fetch(
    "http://localhost:3000/api/v1/auth/refresh-token",
    {
      method: "POST",
      body: JSON.stringify({
        refresh_token,
      }),
      headers: { "Content-Type": "application/json" },
    },
  );

  if (!response.ok) throw new Error("Error refreshing token");
  return await response.json();
};
