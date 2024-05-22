import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { toast } from "sonner";

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      toast.success("Signed out");
    },
    onError: (error: Error) => {
      toast.success(error.message);
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };
  return (
    <button
      onClick={handleClick}
      className="tex-blue-600 px-3 bg-white font-bold hover:bg-gray-100"
    >
      Sign out
    </button>
  );
};

export default SignOutButton;
