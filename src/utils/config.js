export const createConfig = (user) => {
  const config = {
    headers: {
      Authorization: `bearer ${user.token}`
    }
  }

  return config;
}