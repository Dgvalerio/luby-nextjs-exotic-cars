// eslint-disable-next-line import/prefer-default-export
export const slugify = (params: string): string =>
  params.toLowerCase().replace(/ /g, '-');
