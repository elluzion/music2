export function improveSoundcloudArtwork(
  url: string,
  targetSize: 'large' | 'original' | "t200x200" | 't500x500' = 't500x500',
) {
  if (url.includes('sndcdn.com/artworks-')) {
    return url.replace(/([tl]\d+x\d+|(?:large|original|t200x200|t500x500))(?=\.\w+$)/, targetSize);
  }

  return url;
}

export function secondsToString(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}