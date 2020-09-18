import React from 'react';
import { Flex } from '@chakra-ui/core';

export default function Container({ children }) {
  return (
    <Flex
      margin='0 auto'
      w='100%'
      maxW={['100%', '100%', '100%', '960px', '1140px']}
    >
      {children}
    </Flex>
  );
}
