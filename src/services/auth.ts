export const getToken = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const response = await fetch("http://localhost:3000/api/v1/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) throw new Error();
  return response.json();
};
