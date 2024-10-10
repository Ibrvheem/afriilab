"use client";
import ControlledInput from "@/components/molecules/controlledInput";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion"; // Import framer-motion
import { useRouter } from "next/navigation";

export default function Page() {
  const form = useForm({});
  const [isSubmitting, setIsSubmitting] = useState(false); // Track the submit state
  const { replace } = useRouter();

  const handleSubmit = (data: any) => {
    setIsSubmitting(true);
    replace("/personalize");
    setTimeout(() => {
      // Simulate form submission
      console.log(data);
      // You can redirect or handle the form submission logic here
    }, 1000); // Adjust timeout as necessary
  };

  return (
    <>
      <div className="relative rounded-xl">
        <motion.div
          className="relative mx-auto grid w-[400px]"
          initial={{ opacity: 1 }}
          animate={{ opacity: isSubmitting ? 0 : 1 }} // Animate fade-out on submit
          transition={{ duration: 0.8 }} // Duration of the fade-out animation
        >
          <Card className="p-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Create Account</h1>
              <p className="text-balance text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur.
              </p>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="grid gap-4">
                  <ControlledInput name="email" label="Email" />
                  <ControlledInput
                    name="password"
                    label="Password"
                    type="password"
                  />
                  <Link href={"/personalize"}>
                    <Button type="submit" className="w-full">
                      Sign Up
                    </Button>
                  </Link>
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
              Have an account?{" "}
              <Link href="/login" className="font-bold text-primary">
                Sign in 🚀
              </Link>
            </div>
          </Card>
        </motion.div>
        <BorderBeam size={250} duration={12} delay={9} />
      </div>
    </>
  );
}
