import React from 'react';
import { Flex, Menu, MenuButton, MenuList } from '@chakra-ui/core';
import {
  ScContentItem,
  ScMenuButton,
  ScMenuItem,
} from 'components/StyledComponents';
import Folder from 'icons/Folder';
import Options from 'icons/Options';
import File from 'icons/File';

import copy from 'clipboard-copy';

export default function FolderItem({ store, isDir, children }) {
  const Icon = isDir ? <Folder /> : <File />;

  const openDir = (e) => (isDir ? store.getContent(e) : () => null);
  const cursor = isDir ? 'pointer' : 'default';
  const copyToClipboard = async () => {
    try {
      const parametr = `${store.paths.join('/')}/${children}`;
      const parametrEncode = encodeURIComponent(parametr);
      await copy(
        `http://${document.location.hostname}:3232/stream/${parametrEncode}`
      );
    } catch (error) {
      throw error;
    }
  };

  const menuItems = isDir
    ? [
        {
          key: 'dz',
          name: 'Download zip',
          as: 'a',
          href: store.downloadLink(children, 'zip'),
        },
      ]
    : [
        {
          key: 'sl',
          name: 'Stream link',
          onClick: copyToClipboard,
        },
        {
          key: 'dl',
          name: 'Download',
          as: 'a',
          href: store.downloadLink(children),
        },
      ];

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
