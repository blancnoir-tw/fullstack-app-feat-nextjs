import NextImage from 'next/image'
import NextLink from 'next/link'
import {
  Box,
  List,
  ListItem,
  ListIcon,
  Divider,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/layout'
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from 'react-icons/md'
import { usePlaylist } from '../lib/hooks'

const navMenu = [
  { name: 'Home', icon: MdHome, route: '/' },
  { name: 'Search', icon: MdSearch, route: '/search' },
  { name: 'Your library', icon: MdLibraryMusic, route: '/library' },
]

const musicMenu = [
  { name: 'Create Playlist', icon: MdPlaylistAdd, route: '/' },
  { name: 'Favorites', icon: MdFavorite, route: '/favorites' },
]

const Sidebar = () => {
  const { playlists } = usePlaylist()
  return (
    <Box
      width="100%"
      height="calc(100vh - 100px)"
      bg="black"
      paddingX="5px"
      color="gray"
    >
      <Box paddingY="20px" height="100%">
        <Box width="120px" marginBottom="20px" paddingX="20px">
          <NextImage src="/logo.svg" height={60} width={120} />
        </Box>
        <Box marginBottom="20px">
          <List spacing={2}>
            {navMenu.map((menu) => (
              <ListItem key={menu.name} paddingX="20px" fontSize="16px">
                <LinkBox>
                  <NextLink href={menu.route} passHref>
                    <LinkOverlay>
                      <ListIcon
                        as={menu.icon}
                        color="white"
                        marginRight="20px"
                      />
                      {menu.name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box marginY="20px">
          <List spacing={2}>
            {musicMenu.map((menu) => (
              <ListItem key={menu.name} paddingX="20px" fontSize="20px">
                <LinkBox>
                  <NextLink href={menu.route} passHref>
                    <LinkOverlay>
                      <ListIcon
                        as={menu.icon}
                        color="white"
                        marginRight="20px"
                      />
                      {menu.name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider color="gray.800" />
        <Box height="66%" overflowY="auto" marginY="20px">
          <List spacing={2}>
            {playlists.map((playlist) => (
              <ListItem key={playlist.id} paddingX="20px">
                <LinkBox>
                  <NextLink
                    href={{
                      pathname: '/playlist/[id]',
                      query: { id: playlist.id },
                    }}
                    passHref
                  >
                    <LinkOverlay>{playlist.name}</LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  )
}

export default Sidebar
