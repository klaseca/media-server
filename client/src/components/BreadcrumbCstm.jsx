import React from 'react';
import { useObserver } from 'mobx-react';
import { useStores } from 'hooks/useStores';
import { Breadcrumb, BreadcrumbItem, Icon, Flex } from '@chakra-ui/core';
import styled from '@emotion/styled';
import Container from './Container';

const ScBreadcrumb = styled(Breadcrumb)({
  '& > ol': {
    padding: 0,
  },
  display: 'flex',
});

export default function BreadcrumbCstm() {
  const { store } = useStores();

  const correctIndex = (index) => (index === 0 ? index + 1 : index);
  const notLastClick = (index) =>
    store.paths.length !== index + 1
      ? store.getDownContent(correctIndex(index))
      : () => null;
  const cursor = (index) =>
    store.paths.length > index + 1 ? 'pointer' : 'default';
  const cursorMain = store.paths.length ? 'pointer' : 'default';

  return useObserver(() => (
    <Flex bg='gray.800'>
      <Container>
        <ScBreadcrumb
          spacing='8px'
          color='gray.300'
          py='15px'
          px={['10px', '10px', '10px', 0]}
          separator={<Icon color='gray.300' name='chevron-right' />}
        >
          <BreadcrumbItem cursor={cursorMain}>
            <div onClick={() => store.getDownContent(0)}>Main</div>
          </BreadcrumbItem>
          {store.paths.map((path, i) => (
            <BreadcrumbItem key={i} cursor={cursor(i)}>
              <div onClick={() => notLastClick(i)}>{path}</div>
            </BreadcrumbItem>
          ))}
        </ScBreadcrumb>
      </Container>
    </Flex>
  ));
}
