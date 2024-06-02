import { useForm } from "react-hook-form";
import { PaymentIntentResponse, UserType } from "../../types/types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../../contexts/SearchContext";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import * as apiClient from "../../api-client";
import { toast } from "sonner";

type Props = {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse;
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  hotelId: string;
  paymentIntentId: string;
  totalCost: number;
};

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const search = useSearchContext();
  const { hotelId } = useParams();

  const { mutate: bookRoom, isLoading } = useMutation(
    apiClient.createRoomBooking,
    {
      onSuccess: () => {
        toast.success("Sucessfully booked");
      },
      onError: () => {
        toast.error("Error booking hotel");
      },
    }
  );

  const { handleSubmit, register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      hotelId,
      totalCost: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentIntentId,
    },
  });

  const onSubmit = async (formData: BookingFormData) => {
    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });

    if (result.paymentIntent?.status === "succeeded") {
      bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
      navigate("/my-bookings");
    }
  };
  return (
    <div>
      <form
        className="grid grid-cols-1 gap-5 border border-slate-300 rounded-md p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <span className="text-3xl font-bold">Confirm your details</span>
        <div className="grid grid-cols-2 gap-6">
          <label className="text-gray-700 text-sm font-bold flex-1">
            First name
            <input
              className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
              type="text"
              readOnly
              disabled
              {...register("firstName")}
            />
          </label>
          <label className="text-gray-700 text-sm font-bold flex-1">
            Last name
            <input
              className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
              type="text"
              readOnly
              disabled
              {...register("lastName")}
            />
          </label>
          <label className="text-gray-700 text-sm font-bold flex-1">
            Email
            <input
              className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
              type="text"
              readOnly
              disabled
              {...register("email")}
            />
          </label>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Your price summary</h2>
          <div className="bg-blue-200 p-4 rounded-md">
            <div className="font-semibold text-lg">
              Total Cost: ${paymentIntent.totalCost.toFixed(2)}
            </div>
            <div className="text-sm">Includes taxes and charges</div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Payment Details</h3>
          <CardElement
            id="payment-element"
            className="border rounded-md p-2 text-sm"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-md disabled:bg-gray-500"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Confirm Booking"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
