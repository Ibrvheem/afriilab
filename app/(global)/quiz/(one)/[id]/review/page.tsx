"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { review } from "../../../services";
import axios from "axios";

export default function page() {
  const [review, setReview] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getReview() {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://demo-app-775818477993.us-central1.run.app/evaluate_performance?email=i.aliyu019@gmail.com&subject=Biology"
        );
        setReview(response.data); // Make sure to set response.data to the state
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    getReview(); // Call the function here
  }, []);
  console.log(review);
  return (
    <div className="flex h-[80vh] w-full items-center justify-center">
      {loading ? (
        <Card className="w-[450px] h-[450px] flex flex-col items-center justify-center">
          <CardHeader>
            <CardTitle className="text-lg text-center">
              Generating Your Review 🥳
            </CardTitle>
            <CardDescription>
              Review will be ready in less than a minute!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </CardContent>
        </Card>
      ) : (
        <Card className="w-[450px] h-[450px] flex flex-col items-center justify-center">
          <CardHeader>
            <CardTitle className="text-lg text-center">
              Here is your review 🥳
            </CardTitle>
            <CardDescription>Your review is ready</CardDescription>
          </CardHeader>
          <CardContent>
            {review?.cards?.map((card) => {
              return card.Overall;
            })}
          </CardContent>
          <CardFooter>
            <Button>Do another Quiz</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
