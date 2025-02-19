import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<
  (typeof client.api.projects)[":projectId"]["$patch"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.projects)[":projectId"]["$patch"]
>;

export const useUpdateProject = () => {
  const query = useQueryClient();
  const router = useRouter();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form, param }) => {
      const response = await client.api.projects[":projectId"].$patch({
        form,
        param,
      });
      if (!response.ok) {
        throw new Error("Failed to update project");
      }
      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Project updated");
      router.refresh();
      query.invalidateQueries({ queryKey: ["projects"] });
      query.invalidateQueries({ queryKey: ["projects", data.$id] });
    },
    onError: () => {
      toast.error("Failed to update project");
    },
  });
  return mutation;
};
