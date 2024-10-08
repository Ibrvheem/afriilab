import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-1">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary text-lg font-semibold">
            Biology
          </CardTitle>
          <CardDescription className="">
            Answer questions about your completed study
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-1">
            <div className="border text-center h-6 w-6 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-500">
                50
              </span>{" "}
            </div>
            <span className="text-xs font-semibold">Questions Left</span>
          </div>
        </CardContent>

        <CardFooter>
          <Link href={"/quiz/1"}>
            <Button className="" variant={"outline"}>
              Start Quiz
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
