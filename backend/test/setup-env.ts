process.env.RATE_LIMIT_TTL = '60000';
process.env.RATE_LIMIT_MAX = '100';
process.env.RATE_LIMIT_AUTH_TTL = '60000';
process.env.RATE_LIMIT_AUTH_MAX = '5';
process.env.RATE_LIMIT_STRICT_TTL = '60000';
process.env.RATE_LIMIT_STRICT_MAX = '10';

// Use PostgreSQL for E2E tests (not SQLite)
// The GitHub Actions workflow provides a PostgreSQL service
process.env.NODE_ENV = 'test';
