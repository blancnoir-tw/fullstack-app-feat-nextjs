import { Box, Flex, Text } from '@chakra-ui/react'
import { useStoreState } from 'easy-peasy'
import Player from './Player'

const PlayerBar = () => {
  const songs = useStoreState((state: any) => state.activeSongs)
  const activeSong = useStoreState((state: any) => state.activeSong)

  return (
    <Box height="100px" width="100vw" bg="gray.900" padding="10px">
      <Flex align="cetner">
        {activeSong && (
          <Box padding="20px" color="white" width="30%">
            <Text fontSize="lg">{activeSong.name}</Text>
            <Text fontSize="sm">{activeSong.artist.name}</Text>
          </Box>
        )}
        <Box width="40%">
          {activeSong && <Player songs={songs} activeSong={activeSong} />}
        </Box>
      </Flex>
    </Box>
  )
}

export default PlayerBar
