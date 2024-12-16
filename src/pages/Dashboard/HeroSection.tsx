import BookmarkIcon from '@/assets/svgs/BookmarkIcon';
import PlayIcon from '@/assets/svgs/PlayIcon';
import { Typography } from '@/components/Typography';

const HeroSection = () => {
  return (
    <div className='text-white ml-3 md:ml-10 xl:w-[30%] lg:w-2/5 w-2/3 mt-48 md:mt-64 lg:mt-80 2xl:mt-96'>
      <Typography variant='title' className='font-bold'>
        The Breakfast Club
      </Typography>
      <Typography className='mt-2 text-xs md:text-xl'>
        The Worlds Most Dangerous Morning Show, The Breakfast Club, With DJ Envy
        , Jess Hilarious And Charlamagne Tha God!
      </Typography>
      <div className='flex items-center gap-2 mt-4'>
        <div className='md:w-16 w-10 md:h-16 h-10'>
          <PlayIcon width='auto' height='auto' />
        </div>
        <div className='border-2 md:w-16 w-10 md:h-16 h-10 rounded-full p-2 '>
          <BookmarkIcon width='auto' height='auto' />
        </div>
      </div>
    </div>
  );
};
export default HeroSection;
