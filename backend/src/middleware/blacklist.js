const blacklisted = [];

const addToken = (token) => {
  blacklisted.push(token);
};

const isTokenBlacklisted = (token) => {
  return blacklisted.includes(token);
};

module.exports = { addToken, isTokenBlacklisted };
