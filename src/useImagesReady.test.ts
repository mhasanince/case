import { renderHook, waitFor } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

import { useImagesReady } from './useImagesReady';

test('reports ready only after every image has been decoded', async () => {
  let finishDecoding = () => {};
  const decode = vi.spyOn(HTMLImageElement.prototype, 'decode').mockReturnValue(
    new Promise<void>((resolve) => {
      finishDecoding = resolve;
    }),
  );
  const sources = ['/pending-phone.webp', '/pending-stamp.webp'];

  const { result } = renderHook(() => useImagesReady(sources));
  expect(result.current).toBe(false);

  finishDecoding();
  await waitFor(() => expect(result.current).toBe(true));

  decode.mockRestore();
});

test('does not wait forever when an image fails to load', async () => {
  const decode = vi
    .spyOn(HTMLImageElement.prototype, 'decode')
    .mockRejectedValue(new Error('broken image'));
  const sources = ['/broken.webp'];

  const { result } = renderHook(() => useImagesReady(sources));

  await waitFor(() => expect(result.current).toBe(true));

  decode.mockRestore();
});
