export const authenticate = (login, password, users) => {
  return users.some(user => user.username === login && user.email === password)
}


