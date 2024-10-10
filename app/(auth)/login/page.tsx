"use client";
import ControlledInput from "@/components/molecules/controlledInput";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

export default function page() {
  const form = useForm({});
  return (
    <>
      <div className="relative rounded-xl">
        <Card className="relative mx-auto grid w-[400px] gap-6 p-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <Form {...form}>
            <form>
              <div className="grid gap-4">
                <ControlledInput name="email" label="Email" />
                <ControlledInput
                  name="password"
                  label="Password"
                  type="password"
                />
                <Button type="submit" className="w-full">
                  Login
                </Button>

                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2 font-bold"
                >
                  <Image
                    alt="google-icon"
                    src="./icons/google.svg"
                    height={20}
                    width={20}
                  />{" "}
                  Use Google
                </Button>
              </div>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-bold text-primary">
              Sign up 🚀
            </Link>
          </div>
        </Card>
        <BorderBeam size={250} duration={12} delay={9} />
      </div>
    </>
  );
}
