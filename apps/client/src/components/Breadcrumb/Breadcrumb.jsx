import {
  Breadcrumb as BreadcrumbChakra,
  BreadcrumbItem,
  Icon,
  Flex,
} from '@chakra-ui/core';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Container } from '../Container';
import { useBreadcrumb } from './useBreadcrumb';

const ScBreadcrumb = styled(BreadcrumbChakra)({
  '& > ol': {
    padding: 0,
  },
  display: 'flex',
});

export const Breadcrumb = () => {
  const { breadcrumbs, isLastBreadcrumb } = useBreadcrumb();

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
          {breadcrumbs.map(({ path, name }, i) => (
            <BreadcrumbItem key={i}>
              {isLastBreadcrumb(i) ? (
                <div>{name}</div>
              ) : (
                <Link to={path}>{name}</Link>
              )}
            </BreadcrumbItem>
          ))}
        </ScBreadcrumb>
      </Container>
    </Flex>
  );
};
