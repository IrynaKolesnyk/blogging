import type { ImageData } from '../../../shared/types';
import reducer, {
  fetchImageById,
  fetchImages,
  uploadImages,
} from '../imageSlice';

describe('imageSlice reducer', () => {
  const initialState = {
    images: [],
    imageMap: {},
    loading: false,
    error: null,
  };

  it('should handle initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle uploadImages.fulfilled', () => {
    const images: ImageData[] = [
      { imageId: '1', name: 'cat.png' },
      { imageId: '2', name: 'dog.png' },
    ];

    const action = {
      type: uploadImages.fulfilled.type,
      payload: images,
    };

    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.images).toEqual(images);
  });

  it('should handle fetchImages.rejected', () => {
    const action = {
      type: fetchImages.rejected.type,
      payload: 'Fetch failed',
    };

    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Fetch failed');
  });

  it('should handle fetchImageById.fulfilled', () => {
    const action = {
      type: fetchImageById.fulfilled.type,
      payload: { imageId: '123', imageUrl: 'http://imageUrl.com/url' },
    };

    const state = reducer(initialState, action);
    expect(state.imageMap['123']).toBe('http://imageUrl.com/url');
  });
});
