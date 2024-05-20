import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({ listing }) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`}>
        <div className='h-[320px] sm:h-[220px] w-full bg-gray-200 flex items-center justify-center'>
          {/* Placeholder image or other content */}
          <MdLocationOn className='h-12 w-12 text-green-700' />
        </div>
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {listing.name}
          </p>
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-green-700' />
            <p className='text-sm text-gray-600 truncate w-full'>
              {listing.address}
            </p>
          </div>
          <p className='text-sm text-gray-600 line-clamp-2'>
            {listing.description}
          </p>
          <p className='text-slate-500 mt-2 font-semibold '>
            Rs.
            {listing.offer
              ? listing.discountPrice.toLocaleString('en-US')
              : listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'rent' && ' / month'}
          </p>
          <div className='text-slate-700 flex gap-4'>
            <div className='font-bold text-xs'>
              {listing.plot > 1
                ? ` Plot # ${listing.plot}  `
                : ` Plot # ${listing.plot} `}
            </div>
            <div className='font-bold text-xs'>
              {listing.size > 1
                ? ` Size ${listing.size} Sq.Yards `
                : ` Size ${listing.size} Sq.Yards`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
