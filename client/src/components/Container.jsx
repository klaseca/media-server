import { Flex } from '@chakra-ui/core';

export const Container = ({ children }) => {
  return (
    <Flex
      margin='0 auto'
      w='100%'
      maxW={['100%', '100%', '100%', '960px', '1140px']}
    >
      {children}
    </Flex>
  );
};
