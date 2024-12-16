export interface Playlist {
  id: number;
  video_id: string;
  video_title: string;
  thumbnail_url: string;
  playlist_id: string;
  created_at: string;
  duration: number;
  thumb: number;
  updated_at: string;
  i: number;
  views?: string;
}

export interface RecentSearch {
  id: number;
  text: string;
  time: string;
}
