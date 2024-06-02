import { useQuery } from "react-query";
import * as apiClient from "../api-client";

const MyBookings = () => {
  const { data: hotels, isLoading } = useQuery(
    "fetchMyBookings",
    apiClient.fetchMyBookings
  );

  if (!hotels || hotels.length === 0 || isLoading) {
    return <span>No bookings found</span>;
  }
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">My Bookings</h1>
      {hotels.map((hotel) => (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5">
          <div className="lg:w-full lg:h[250px]">
            <img
              src={hotel.imageUrls[0]}
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
            <div className="hotel-info">
              <h1 className="text-2xl font-bold">{hotel.name}</h1>
              <h1 className="text-sm">
                {hotel.city}, {hotel.country}
              </h1>
            </div>

            {hotel.bookings.map((booking) => (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <div className="flex gap-2">
                    <span className="text-md font-bold">Dates:</span>
                    <span>
                      {new Date(booking.checkIn).toDateString()} -{" "}
                      {new Date(booking.checkOut).toDateString()}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-md font-bold">Guests:</span>
                    <span className="text-md">
                      {booking.adultCount} Adults, {booking.childCount} Children
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
