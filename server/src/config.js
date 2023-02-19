export const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3232,
  publicDirs: [
    {
      path: 'path/to/dir',
      alias: 'Your alias to path',
    },
  ],
};
