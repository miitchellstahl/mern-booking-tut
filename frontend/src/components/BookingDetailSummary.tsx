import { HotelType } from "../types/types";

type Props = {
  numberOfNights: number;
  hotel: HotelType;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

const BookingDetailSummary = ({
  numberOfNights,
  hotel,
  checkIn,
  checkOut,
  adultCount,
  childCount,
}: Props) => {
  return (
    <div className="p-3 border border-slate-300 rounded-md flex flex-col gap-3 h-fit">
      <h2 className="text-lg font-bold">Your Booking Details</h2>
      <div className="flex flex-col pb-3 border-b">
        <span>Location:</span>
        <span className="font-bold">
          {`${hotel?.name}, ${hotel?.city}, ${hotel.country}`}
        </span>
      </div>
      <div className="flex justify-between pb-3 border-b">
        <div className="flex flex-col gap-1">
          <span>Check-in:</span>
          <span className="font-bold">{checkIn.toDateString()}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span>Check-out:</span>
          <span className="font-bold">{checkOut.toDateString()}</span>
        </div>
      </div>
      <div className="flex flex-col pb-3 border-b">
        <span>Total length of stay</span>
        <span className="font-bold">{numberOfNights} nights</span>
      </div>
      <div className="flex flex-col ">
        <span>Guests</span>
        <span className="font-bold">
          {adultCount} adults & {childCount} children
        </span>
      </div>
    </div>
  );
};

export default BookingDetailSummary;
