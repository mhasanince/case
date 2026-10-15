import { useEffect, useState } from 'react';

const decodedImages = new Map<string, Promise<void>>();

export function preloadImage(src: string): Promise<void> {
  const cached = decodedImages.get(src);
  if (cached) {
    return cached;
  }

  const image = new Image();
  image.src = src;
  const decoded = image.decode().catch(() => undefined);
  decodedImages.set(src, decoded);
  return decoded;
}

export function useImagesReady(sources: ReadonlyArray<string>): boolean {
  const [readySources, setReadySources] =
    useState<ReadonlyArray<string> | null>(null);

  useEffect(() => {
    let isCurrent = true;
    void Promise.all(sources.map(preloadImage)).then(() => {
      if (isCurrent) {
        setReadySources(sources);
      }
    });

    return () => {
      isCurrent = false;
    };
  }, [sources]);

  return readySources === sources;
}
