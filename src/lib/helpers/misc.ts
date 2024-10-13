export function improveSoundcloudArtwork(
  url: string,
  targetSize: 'large' | 'original' | 't500x500' = 't500x500',
) {
  if (url.includes('sndcdn.com/artworks-')) {
    return url.replace(/([tl]\d+x\d+|(?:large|original))(?=\.\w+$)/, targetSize);
  }

  return url;
}