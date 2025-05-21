export type CurrentTrack = {
  album: {
    images: {
      url: string;
    }[];
  };
  name: string;
  artists: {
    name: string;
  }[];
};
