import { Prisma } from '@prisma/client'

const playlistWithSongs = Prisma.validator<Prisma.PlaylistArgs>()({
  include: { songs: true },
})

export type PlaylistWithSongs = Prisma.PlaylistGetPayload<
  typeof playlistWithSongs
>
