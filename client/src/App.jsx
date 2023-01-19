import { Flex } from '@chakra-ui/core';
import { Breadcrumb } from 'components/Breadcrumb/Breadcrumb';
import { Container } from 'components/Container';
import { ContentBox } from 'components/ContentBox';
import { ApiProvider } from 'contexts/ApiContext';
import { ConfigProvider } from 'contexts/ConfigContext';

const App = () => {
  return (
    <ConfigProvider>
      <ApiProvider>
        <Breadcrumb />
        <Flex bg='gray.700' flexDir='column' color='gray.200' flexGrow='1'>
          <Container>
            <ContentBox />
          </Container>
        </Flex>
      </ApiProvider>
    </ConfigProvider>
  );
};

export default App;
