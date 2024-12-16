/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import YouTube, { YouTubeProps } from 'react-youtube';
import moment from 'moment';

import { Playlist } from '@/@types/playlist';
import Container from '@/components/Container';
import Loader from '@/components/Loader';
import { Typography } from '@/components/Typography';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useIsMobile } from '@/hooks/useMobile';
import { cn } from '@/lib/utils';
import { fetchPlaylist } from '@/redux/slices/playlistSlice';
import { formatDuration, formatViews } from '@/utils/common';

const Video = () => {
  const dispatch = useAppDispatch();

  const { playlists } = useAppSelector((state) => {
    return {
      playlists: state?.playlist?.playlist,
    };
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const url = searchParams?.get('playlist');
  const videoId = searchParams?.get('videoIndex');
  const isMobile = useIsMobile();
  const [videoPlaying, setVideoPlaying] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (!playlists?.length && !videoPlaying) {
      dispatch(fetchPlaylist({ id: url || '' }));
    } else {
      if (videoId) {
        setVideoPlaying(playlists[+videoId]);
      } else {
        setVideoPlaying(playlists[0]);
      }
      setIsLoading(false);
    }
  }, [playlists, url]);

  const handleClick = (playlist: Playlist, idx: number) => {
    setVideoPlaying(playlist);
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set('videoIndex', idx.toString());
    setSearchParams(updatedParams);
  };

  const opts: YouTubeProps['opts'] = {
    height: isMobile ? '220' : '564',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <Container className='bg-transparent mb-10 backgroundGradient'>
      {isLoading ? (
        <div className='flex justify-center items-center h-screen'>
          <Loader />
        </div>
      ) : (
        <div className='md:flex gap-5 w-full items-start mt-20'>
          <div className='md:w-[70%]'>
            <div className='w-full flex flex-col items-center'>
              <YouTube
                videoId={videoPlaying?.video_id}
                id={videoPlaying?.video_id}
                key={videoPlaying?.video_id}
                className={'w-full'}
                iframeClassName={'w-full'}
                opts={opts}
                onEnd={() => {
                  const nextVideoIndex =
                    (playlists.findIndex(
                      (video) => video.id === videoPlaying.id,
                    ) +
                      1) %
                    playlists.length;
                  setVideoPlaying(playlists[nextVideoIndex]);
                  const updatedParams = new URLSearchParams(searchParams);
                  updatedParams.set('videoIndex', nextVideoIndex.toString());
                  setSearchParams(updatedParams);
                }}
              />
            </div>
            <Typography className='text-sm md:!text-2xl font-semibold mt-2'>
              {videoPlaying?.video_title}
            </Typography>
            <div className='flex gap-2 mt-1'>
              <Typography variant='subheading' className='text-xs md:text-lg'>
                {' '}
                {formatViews(Number(videoPlaying?.views))} views
              </Typography>
              <Typography
                className='text-grayText text-xs md:text-lg'
                variant='subheading'
              >
                |
              </Typography>
              <Typography
                className='text-grayText text-xs md:text-lg'
                variant='subheading'
              >
                {moment(videoPlaying?.created_at).fromNow()}
              </Typography>
            </div>
          </div>
          <div className='md:w-[30%] overflow-auto flex gap-5 flex-col mt-5 md:mt-0'>
            {playlists?.map((playlist, idx) => {
              const displayText =
                playlist?.video_title?.length < 50
                  ? playlist?.video_title
                  : `${playlist?.video_title?.slice(0, 50)}...`;

              return (
                <div
                  key={`video-${idx}`}
                  onClick={() => handleClick(playlist, idx)}
                  className={cn(
                    'w-full p-2 cursor-pointer rounded-lg bg-white text-black flex gap-3 items-center',
                    {
                      'border-l-[5px] border-[#C41208]':
                        playlist.id === videoPlaying.id,
                    },
                  )}
                >
                  <div className='relative h-fit w-2/5'>
                    {!isImageLoaded && (
                      <div
                        className={
                          'animate-pulse bg-gray-400 rounded-lg h-[72px] mt-2 w-full'
                        }
                      />
                    )}
                    <img
                      src={playlist?.thumbnail_url}
                      className={`rounded-lg h-[72px] w-full ${isImageLoaded ? '' : 'hidden'}`}
                      alt=''
                      onLoad={() => setIsImageLoaded(true)}
                    />

                    <p className='absolute bottom-1 right-1 bg-gray-800 text-white font-semibold px-1.5 rounded-[4px] text-xs'>
                      {formatDuration(playlist?.duration)}
                    </p>
                  </div>
                  <div className='w-4/5'>
                    {isImageLoaded ? (
                      <Typography
                        variant='subheading'
                        className='!leading-5 text-sm md:text-xl'
                      >
                        {displayText}
                      </Typography>
                    ) : (
                      <div
                        className={
                          'animate-pulse bg-gray-400 rounded-lg h-6 mt-2 w-full'
                        }
                      />
                    )}

                    <div className='flex gap-2'>
                      {isImageLoaded ? (
                        <Typography className='text-xs md:text-sm'>
                          {formatViews(Number(playlist?.views))} views
                        </Typography>
                      ) : (
                        <div
                          className={
                            'animate-pulse bg-gray-400 rounded-lg h-4 mt-2 w-full'
                          }
                        />
                      )}
                      <Typography className='text-grayText text-xs md:text-sm'>
                        |
                      </Typography>
                      {isImageLoaded ? (
                        <Typography className='text-grayText text-xs md:text-sm'>
                          {moment(playlist?.created_at).fromNow()}
                        </Typography>
                      ) : (
                        <div
                          className={
                            'animate-pulse bg-gray-400 rounded-lg h-4 mt-2 w-full'
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Container>
  );
};

export default Video;
