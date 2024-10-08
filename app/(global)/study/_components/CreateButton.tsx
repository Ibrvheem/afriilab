"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import ControlledInput from "./controlledInput";
import { Separator } from "@/components/ui/separator";
import EmptyState from "./EmptyState";
import DragAndDrop from "./DragAndDrop";
import { MagicWandIcon } from "@radix-ui/react-icons";
import { useCreateStudy } from "../hooks/useCreateStudy";

export default function CreateButton() {
  const { onSubmit, form, setSelectedFile } = useCreateStudy();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-black hover:bg-slate-900 font-bold">
          Create Study
        </Button>
      </SheetTrigger>
      <SheetContent className="font-raleway">
        <SheetHeader>
          <SheetTitle>Create Study</SheetTitle>
          <SheetDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
            laborum nesciunt commodi.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form className="space-y-4 my-4">
            <ControlledInput name="email" label="Subject" />
            <DragAndDrop setSelectedFile={setSelectedFile} />
            <div className="space-y-4 ">
              <SheetFooter>
                <SheetClose asChild>
                  <Button
                    type="submit"
                    className="bg-black"
                    onClick={(e) => {
                      e.preventDefault();
                      onSubmit();
                    }}
                  >
                    Generate Study{" "}
                    <MagicWandIcon className="ml-1 h-4 w-4 text-primary" />
                  </Button>
                </SheetClose>
              </SheetFooter>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
