import { observer } from 'mobx-react-lite';
import { Breadcrumb, BreadcrumbItem, Icon, Flex } from '@chakra-ui/core';
import styled from '@emotion/styled';
import { Container } from './Container';
import { Link } from 'react-router-dom';
import { useBreadcrumb } from 'hooks/useBreadcrumb';

const ScBreadcrumb = styled(Breadcrumb)({
  '& > ol': {
    padding: 0,
  },
  display: 'flex',
});

const _BreadcrumbRouter = () => {
  const { paths, isLastPath } = useBreadcrumb();

  return (
    <Flex bg='gray.800'>
      <Container>
        <ScBreadcrumb
          spacing='8px'
          color='gray.300'
          py='15px'
          px={['10px', '10px', '10px', 0]}
          separator={<Icon color='gray.300' name='chevron-right' />}
        >
          {paths.map(({ path, name }, i) =>
            isLastPath(i) ? (
              <BreadcrumbItem key={i}>
                <div>{name}</div>
              </BreadcrumbItem>
            ) : (
              <BreadcrumbItem key={i}>
                <Link to={path}>{name}</Link>
              </BreadcrumbItem>
            )
          )}
        </ScBreadcrumb>
      </Container>
    </Flex>
  );
};

export const BreadcrumbRouter = observer(_BreadcrumbRouter);
