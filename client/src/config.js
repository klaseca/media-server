const getVariableFromEnv = (key) => {
  const variable = import.meta.env[key];

  if (variable == null) {
    throw new Error(`${key} variable is not defined in env`);
  }

  return variable;
};

export const getConfig = () => ({
  apiUrl: getVariableFromEnv('VITE_API_URL'),
});
