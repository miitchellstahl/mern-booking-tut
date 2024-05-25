import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <div className="flex bg-gray-300 p-5 border rounded-md justify-between gap-6">
        <div className="flex-1">
          <label className="flex flex-col">
            Adults
            <input
              type="number"
              className="border rounded py-2 px-3 font-normal"
              min={1}
              {...register("adultCount", {
                required: "This field is required",
              })}
            />
            {errors.adultCount?.message && (
              <span className="text-red-500 text-sm font-bold">
                {errors.adultCount?.message}
              </span>
            )}
          </label>
        </div>

        <div className="flex-1">
          <label className="flex flex-col">
            Children
            <input
              type="number"
              className="border rounded py-2 px-3 font-normal"
              min={0}
              {...register("childCount", {
                required: "This field is required",
              })}
            />
            {errors.childCount?.message && (
              <span className="text-red-500 text-sm font-bold">
                {errors.childCount?.message}
              </span>
            )}
          </label>
        </div>
      </div>
    </div>
  );
};

export default GuestsSection;
