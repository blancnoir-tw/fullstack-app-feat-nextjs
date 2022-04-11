import GradientLayout from '../../components/GradientLayout'
import SongTable from '../../components/SongsTable'
import { validateToken } from '../../lib/auth'
import prisma from '../../lib/prisma'
import type { PlaylistWithSongs } from '../../types/playlist'

type Props = {
  playlist: PlaylistWithSongs
}

const getBackgroundColor = (id) => {
  const colors = [
    'red',
    'green',
    'blue',
    'orange',
    'purple',
    'gray',
    'teal',
    'yellow',
  ]

  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)]
}

const PlaylistPage = ({ playlist }: Props) => {
  const color = getBackgroundColor(playlist.id)

  return (
    <GradientLayout
      color={color}
      title={playlist.name}
      subtitle="playlist"
      description={`${playlist.songs.length} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <SongTable songs={playlist.songs} />
    </GradientLayout>
  )
}

export const getServerSideProps = async ({ query, req }) => {
  const { id } = validateToken(req.cookies.TRAX_ACCESS_TOKEN)
  const [playlist] = await prisma.playlist.findMany({
    where: { id: +query.id, userId: +id },
    include: {
      songs: {
        include: {
          artist: { select: { name: true, id: true } },
        },
      },
    },
  })

  return { props: { playlist } }
}

export default PlaylistPage
