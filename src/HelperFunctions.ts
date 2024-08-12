export const createImageUrlKey = (rootSceneIndex: number, path: number[]) => {
  return rootSceneIndex.toString() + ',' + path.toString();
};
