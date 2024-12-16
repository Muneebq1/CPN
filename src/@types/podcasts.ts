export interface Podcast {
  id: number;
  title: string;
  url: string;
  image: string;
}

export enum EpisodeCarouselType {
  carousel1 = 'carousel1',
  carousel2 = 'carousel2',
  carousel3 = 'carousel3',
}

export interface EpisodesCarousel {
  [EpisodeCarouselType.carousel1]: {
    episodes: HighlightedEpisode[];
    type: EpisodeCarouselType.carousel1;
  };
  [EpisodeCarouselType.carousel2]: {
    episodes: HighlightedEpisode[];
    type: EpisodeCarouselType.carousel2;
  };
  [EpisodeCarouselType.carousel3]: {
    episodes: HighlightedEpisode[];
    type: EpisodeCarouselType.carousel3;
  };
}

export interface HighlightedEpisode {
  id: number;
  vidId: string;
  time: string;
  sort: number;
  title: string;
  description: string;
  small: string;
  large: string;
  duration: string;
  list: number;
  likes: number;
  views: number;
  last: number;
}
