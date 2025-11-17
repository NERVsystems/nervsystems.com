// Mock for next-intl middleware functionality

const createMiddleware = (config) => {
  return (request) => {
    // Mock middleware that does nothing in tests
    return undefined;
  };
};

module.exports = createMiddleware;
module.exports.default = createMiddleware;
