export default {
  isProduction: process.env.NODE_ENV === "production",
  postgresUsername: process.env.POSTGRESQL_USERNAME,
  postgresPassword: process.env.POSTGRESQL_PASSWORD,
};
