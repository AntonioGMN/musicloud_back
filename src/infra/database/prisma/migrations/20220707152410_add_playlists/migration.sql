-- CreateTable
CREATE TABLE "Playlist" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SongsPlaylist" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "playlistId" INTEGER NOT NULL,
    "songId" INTEGER NOT NULL,

    CONSTRAINT "SongsPlaylist_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongsPlaylist" ADD CONSTRAINT "SongsPlaylist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongsPlaylist" ADD CONSTRAINT "SongsPlaylist_songId_fkey" FOREIGN KEY ("songId") REFERENCES "songs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongsPlaylist" ADD CONSTRAINT "SongsPlaylist_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
