export const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3232,
  publicDirs: JSON.parse(process.env.PUBLIC_DIRS),
};
