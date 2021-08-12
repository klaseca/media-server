import styled from '@emotion/styled';
import { Flex, Button, MenuItem } from '@chakra-ui/core';

export const ScContentItem = styled(Flex)({
  borderRadius: '10px',
  overflow: 'hidden',
  backgroundColor: '#4A5568',
  alignItems: 'center',
  padding: '5px',
  '&:hover': {
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -2px',
  },
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
