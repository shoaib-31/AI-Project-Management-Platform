"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { registerSchema } from "../schemas";
import { useRegister } from "../api/use-register";

export const SignUpCard = () => {
  const { mutate, isPending } = useRegister();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    mutate({ json: values });
  };
  return (
    <Card className=" w-full h-full md:w-[486px] border-none shadow-none">
      <CardHeader className=" flex items-center justify-center text-center p-7">
        <CardTitle className=" text-2xl">Sign Up</CardTitle>
        <CardDescription>
          By signing up, you agree to our{" "}
          <Link href={"/privacy"}>
            <span className=" text-blue-700 ">Privacy Policy</span>
          </Link>{" "}
          and{" "}
          <Link href={"/terms"}>
            <span className=" text-blue-700 ">Terms of Service</span>
          </Link>
        </CardDescription>
        <DottedSeparator />
        <CardContent className=" w-full p-7">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              action=""
              className=" space-y-4"
            >
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem className=" flex flex-col items-start">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem className=" flex flex-col items-start">
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem className=" flex flex-col items-start">
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isPending} size={"lg"} className=" w-full">
                Register
              </Button>
            </form>
          </Form>
        </CardContent>
        <div className=" px-7 w-full">
          <DottedSeparator />
        </div>
        <CardContent className=" w-full p-7 flex flex-col gap-y-4">
          <Button
            disabled={isPending}
            variant={"secondary"}
            size={"lg"}
            className=" w-full"
          >
            <FcGoogle className=" mr-2 size-5" />
            Login with Google
          </Button>
          <Button
            disabled={isPending}
            variant={"secondary"}
            size={"lg"}
            className=" w-full"
          >
            <FaGithub className=" mr-2 size-5" />
            Login with Github
          </Button>
        </CardContent>
        <div className=" px-7 w-full">
          <DottedSeparator />
        </div>
        <CardContent className=" w-full p-7 flex justify-center items-center">
          Don&apos;t have an account?
          <Link href="/sign-in">
            <span className=" text-blue-700">&nbsp;Sign Up</span>
          </Link>
        </CardContent>
      </CardHeader>
    </Card>
  );
};
