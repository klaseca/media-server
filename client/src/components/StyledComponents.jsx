import styled from '@emotion/styled';
import { Flex, Button, MenuItem } from '@chakra-ui/core';

export const ScContentItem = styled(Flex)({
  borderRadius: '10px',
  overflow: 'hidden',
  boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
  backgroundColor: '#4A5568',
  alignItems: 'center',
  padding: '5px',
});

export const ScMenuButton = styled(Button)({
  padding: '7px 10px',
  boxSizing: 'border-box',
  minHeight: '40px',
  minWidth: '40px',
  height: '2vmax',
  width: '2vmax',
  cursor: 'pointer',
  background: 'none',
  outline: 'none',
  '&:hover': {
    background: 'none',
  },
  '&:active': {
    background: 'none',
  },
  '&:focus': {
    boxShadow: 'none',
  },
});

export const ScMenuItem = styled(MenuItem)({
  color: '#E2E8F0',
  '&:focus': {
    background: '#4A5568',
  },
  '&:active': {
    background: '#4A5568',
  },
});
