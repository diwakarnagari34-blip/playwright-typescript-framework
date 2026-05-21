export const config = {
  baseUrl: process.env.BASE_URL || 'https://staging.example.com',
  apiUrl: process.env.API_URL || 'https://api.staging.example.com',
  timeout: 30000,
  retryCount: 2,
  screenshotOnFailure: true,
};

export const users = {
  admin: {
    username: process.env.ADMIN_USER || 'admin@example.com',
    password: process.env.ADMIN_PASS || 'admin123',
  },
  standard: {
    username: process.env.STD_USER || 'user@example.com',
    password: process.env.STD_PASS || 'user123',
  },
};
