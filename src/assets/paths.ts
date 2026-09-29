const publicAsset = (fileName: string) => `${import.meta.env.BASE_URL}assets/${fileName}`;

export const assetPaths = {
  logo: publicAsset('armoury-quest-logo.svg'),
  mark: publicAsset('armoury-quest-mark.svg'),
  pdf: publicAsset('pdf-acrobat-icon.svg')
} as const;
