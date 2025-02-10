"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { updateWorkspaceSchema } from "../schemas";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DottedSeparator } from "@/components/dotted-separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { ArrowLeftIcon, CopyIcon, ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Workspace } from "../types";
import { useUpdateWorkspace } from "../api/use-update-workspace";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteWorkspace } from "../api/use-delete-workspace";
import { toast } from "sonner";
import { useResetInviteCode } from "../api/use-reset-invite-code";

interface UpdateWorkspaceFormProps {
  onCancel?: () => void;
  intialValues: Workspace;
}

type UpdateWorkspaceFormValues = z.infer<typeof updateWorkspaceSchema>;

export const UpdateWorkspaceForm = ({
  onCancel,
  intialValues,
}: UpdateWorkspaceFormProps) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const form = useForm<UpdateWorkspaceFormValues>({
    resolver: zodResolver(updateWorkspaceSchema),
    defaultValues: {
      ...intialValues,
      image: intialValues.imageUrl || "",
    },
  });
  const fullInviteLink = `${window.location.origin}/workspaces/${intialValues.$id}/join/${intialValues.inviteCode}`;

  const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } =
    useUpdateWorkspace();
  const { mutate: deleteWorkspace, isPending: isDeletingWorkspace } =
    useDeleteWorkspace();
  const { mutate: resetInviteCode, isPending: isResettingInviteCode } =
    useResetInviteCode();

  const [DeleteDialog, confirmDelete] = useConfirm(
    "Delete Workspace",
    "Are you sure you want to delete this workspace?",
    "destructive"
  );
  const [ResetDialog, confirmReset] = useConfirm(
    "Reset Invite Code",
    "This will invalidate the current invite code. Are you sure you want to continue?",
    "destructive"
  );

  const handleDelete = async () => {
    const confirmed = await confirmDelete();
    if (!confirmed) return;
    deleteWorkspace(
      { param: { workspaceId: intialValues.$id } },
      {
        onSuccess: () => {
          window.location.href = "/";
        },
      }
    );
  };
  const handleResetInviteCode = async () => {
    const confirmed = await confirmReset();
    if (!confirmed) return;
    resetInviteCode(
      { param: { workspaceId: intialValues.$id } },
      {
        onSuccess: () => {
          router.refresh();
        },
      }
    );
  };
  const onSubmit = (values: UpdateWorkspaceFormValues) => {
    console.log(values);
    const finalValues = {
      ...values,
      image: values.image instanceof File ? values.image : "",
    };
    updateWorkspace(
      { form: finalValues, param: { workspaceId: intialValues.$id } },
      {
        onSuccess: ({ data }) => {
          form.reset();
          router.push(`/workspaces/${data.$id}`);
        },
      }
    );
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
    }
  };
  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText(fullInviteLink).then(() => {
      toast.success("Invite link copied");
    });
  };
  const isPending =
    isUpdatingWorkspace || isDeletingWorkspace || isResettingInviteCode;
  return (
    <div className="flex flex-col gap-y-4">
      <DeleteDialog />
      <ResetDialog />
      <Card className=" w-full h-full border-none shadow-none">
        <CardHeader className=" flex flex-row items-center gap-x-4 p-7 space-y-0">
          <Button
            size="sm"
            variant="secondary"
            onClick={
              onCancel
                ? onCancel
                : () => router.push(`/workspaces/${intialValues.$id}`)
            }
          >
            <ArrowLeftIcon className="size-4 mr-2" />
            Back
          </Button>
          <CardTitle>{intialValues.name}</CardTitle>
        </CardHeader>
        <div className="px-7">
          <DottedSeparator />
        </div>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className=" flex flex-col gap-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workspace Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Entere workspace name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => {
                    return (
                      <div className="flex flex-col gap-y-2">
                        <div className="flex items-center gap-x-5">
                          {field.value ? (
                            <div className=" size-[72px] relative rounded-md overflow-hidden">
                              <Image
                                src={
                                  field.value instanceof File
                                    ? URL.createObjectURL(field.value)
                                    : field.value
                                }
                                alt="Logo"
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <Avatar className=" size-[72px] flex items-center justify-center bg-neutral-100">
                              <AvatarFallback>
                                <ImageIcon className="size-9 text-neutral-400" />
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div className=" flex flex-col">
                            <p className="text-sm">Workspace Icon</p>
                            <p className="text-sm text-muted-foreground">
                              JPG, PNG, SVG or JPEG, max 1mb
                            </p>
                            <input
                              type="file"
                              ref={inputRef}
                              onChange={handleImageChange}
                              className="hidden"
                              disabled={isPending}
                              accept=".jpg, .png, .jpeg, .svg"
                            />
                            {field.value ? (
                              <Button
                                type="button"
                                variant="destructive"
                                size="xs"
                                className="w-fit mt-2"
                                disabled={isPending}
                                onClick={() => {
                                  field.onChange("");
                                  if (inputRef.current) {
                                    inputRef.current.value = "";
                                  }
                                }}
                              >
                                Remove Image
                              </Button>
                            ) : (
                              <Button
                                type="button"
                                variant="tertiary"
                                size="xs"
                                className="w-fit mt-2"
                                disabled={isPending || isDeletingWorkspace}
                                onClick={() => inputRef.current?.click()}
                              >
                                Upload Image
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  }}
                />
              </div>
              <DottedSeparator className="py-7" />
              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  size="lg"
                  variant="secondary"
                  disabled={isPending}
                  onClick={onCancel}
                  className={cn(!onCancel && "invisible")}
                >
                  Cancel
                </Button>
                <Button size="lg" type="submit" disabled={isPending}>
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="w-full h-full border-none shadow-none">
        <CardContent className=" p-7">
          <div className=" flex flex-col">
            <h3 className=" font-bold">Invite Members</h3>
            <p className="text-sm text-muted-foreground">
              Use the link below to invite members to your workspace.
            </p>
            <div className="mt-4">
              <div className=" flex items-center gap-x-2">
                <Input disabled value={fullInviteLink} type="text" />
                <Button
                  onClick={handleCopyInviteLink}
                  variant="secondary"
                  className="size-12"
                >
                  <CopyIcon className="size-5" />
                </Button>
              </div>
            </div>
            <DottedSeparator className="py-7" />
            <Button
              className="mt-6 w-fit ml-auto "
              size="sm"
              variant="destructive"
              type="button"
              disabled={isPending}
              onClick={handleResetInviteCode}
            >
              Reset Invite Link
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full h-full border-none shadow-none">
        <CardContent className=" p-7">
          <div className=" flex flex-col">
            <h3 className=" font-bold">Danger Zone</h3>
            <p className="text-sm text-muted-foreground">
              Deleting a workspace is irreversible. All associated data will be
              lost.
            </p>
            <DottedSeparator className="py-7" />
            <Button
              className="mt-6 w-fit ml-auto "
              size="sm"
              variant="destructive"
              type="button"
              disabled={isPending}
              onClick={handleDelete}
            >
              Delete Workspace
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
