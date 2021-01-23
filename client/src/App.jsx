import { Flex } from '@chakra-ui/core';
import BreadcrumbCstm from 'components/BreadcrumbCstm';
import Container from 'components/Container';
import ContentBox from 'components/ContentBox';

const App = () => (
  <>
    <BreadcrumbCstm />
    <Flex bg='gray.700' flexDir='column' color='gray.200' flexGrow='1'>
      <Container>
        <ContentBox />
      </Container>
    </Flex>
  </>
);

export default App;
