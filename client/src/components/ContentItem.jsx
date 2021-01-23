import { Flex, Menu, MenuButton, MenuList } from '@chakra-ui/core';
import {
  ScContentItem,
  ScMenuButton,
  ScMenuItem,
} from 'components/StyledComponents';
import Folder from 'icons/Folder';
import Options from 'icons/Options';
import File from 'icons/File';

import { createMenuItems } from 'utils/createMenuItems';

const ContentItem = ({ store, isDir, children }) => {
  const Icon = isDir ? <Folder /> : <File />;

  const openDir = (e) => (isDir ? store.getContent(e) : () => null);
  const cursor = isDir ? 'pointer' : 'default';
  const menuItems = createMenuItems(isDir, store, children);

  return (
    <ScContentItem>
      <Flex minW='0' flexGrow='1' cursor={cursor} onClick={(e) => openDir(e)}>
        <Flex
          boxSizing='border-box'
          p='5px 10px'
          minH='40px'
          h='2vmax'
          minW='45px'
          w='2vmax'
        >
          {Icon}
        </Flex>
        <Flex
          align='center'
          flexGrow='1'
          minW='0'
          whiteSpace='nowrap'
          overflow='hidden'
          textOverflow='ellipsis'
          title={children}
        >
          {children}
        </Flex>
      </Flex>
      <Menu>
        <MenuButton as={ScMenuButton} rightIcon={Options}></MenuButton>
        <MenuList bg='gray.500' border='none'>
          {menuItems.map(({ name, ...props }) => (
            <ScMenuItem {...props}>{name}</ScMenuItem>
          ))}
        </MenuList>
      </Menu>
    </ScContentItem>
  );
}

export default ContentItem;
