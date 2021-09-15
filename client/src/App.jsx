import { Flex } from '@chakra-ui/core';
import { BreadcrumbRouter } from 'components/BreadcrumbRouter';
import { Container } from 'components/Container';
import { ContentBox } from 'components/ContentBox';

const App = () => (
  <>
    <BreadcrumbRouter />
    <Flex bg='gray.700' flexDir='column' color='gray.200' flexGrow='1'>
      <Container>
        <ContentBox />
      </Container>
    </Flex>
  </>
);

export default App;
