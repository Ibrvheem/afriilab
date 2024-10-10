"use client";
import ControlledInput from "@/components/molecules/controlledInput";
import ControlledSelect from "@/components/molecules/controlledSelect";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { language } from "@/local-data/language";

export default function page() {
  const disabilities = [
    {
      value: "none",
      name: "I don't have a disability",
    },
    {
      value: "visualImpairment",
      name: "Visual Impairment",
    },
    {
      value: "cognitiveImpairment",
      name: "Cognitive Impairment",
    },
    {
      value: "hardOfHearing",
      name: "Hard of Hearing",
    },
    {
      value: "mobilityImpairment",
      name: "Mobility Impairment",
    },
    {
      value: "deaf",
      name: "Deaf",
    },
  ];

  const form = useForm({});
  return (
    <>
      <motion.div
        className="relative mx-auto grid w-[400px] rounded-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }} // Animate fade-out on submit
        transition={{ duration: 1 }} // Duration of the fade-out animation
      >
        {" "}
        <Card className="relative mx-auto grid w-[400px] gap-6 p-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">StudyLabs for you.</h1>
            <p className="text-balance text-muted-foreground">
              Help us make StudyLabs personalised for you.
            </p>
          </div>
          <Form {...form}>
            <form>
              <div className="grid gap-4">
                <ControlledSelect
                  name="disability"
                  label="Do you have a disablity"
                  values={disabilities}
                />
                <ControlledSelect
                  name="disability"
                  label="Choose your preferred Language"
                  values={language}
                />
                <Link href={"/study"}>
                  <Button type="submit" className="w-full">
                    Continue
                  </Button>
                </Link>
              </div>
            </form>
          </Form>
        </Card>
        <BorderBeam size={250} duration={12} delay={9} />
      </motion.div>
    </>
  );
}
