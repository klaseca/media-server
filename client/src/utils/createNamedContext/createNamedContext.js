import { createContext, useContext } from 'react';

export const createNamedContext = ({
  name,
  initialValue,
  isNullishAllowed = false,
}) => {
  const names = {
    context: `${name}Context`,
    provider: `${name}Provider`,
    consumer: `${name}Consumer`,
    hook: `use${name}`,
  };

  const Context = createContext(initialValue);

  Context.displayName = names.context;

  const useNamedContext = () => {
    const context = useContext(Context);

    if (isNullishAllowed === false && context == null) {
      throw new Error(
        `${names.hook} has to be used within <${names.context}.Provider>`
      );
    }

    return context;
  };

  return {
    [names.context]: Context,
    [names.provider]: Context.Provider,
    [names.consumer]: Context.Consumer,
    [names.hook]: useNamedContext,
  };
};
