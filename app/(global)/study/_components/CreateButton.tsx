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
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import ControlledInput from "../../../../components/molecules/controlledInput";
import { Separator } from "@/components/ui/separator";
import EmptyState from "./EmptyState";
import DragAndDrop from "./DragAndDrop";
import { MagicWandIcon } from "@radix-ui/react-icons";
import { useCreateStudy } from "../hooks/useCreateStudy";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ControlledSelect from "@/components/molecules/controlledSelect";
import { language } from "@/local-data/language";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";
import LiveRecordButton from "./LiveRecordButton";

export default function CreateButton({
  setShowCards,
  showCards, // Accept flipped state from HomePage
}: {
  setShowCards?: any;
  showCards?: any;
}) {
  const { onSubmit, form, setselectedFiles, loading, open, setOpen } =
    useCreateStudy();
  const [value, setValue] = useState<number[]>([1]);
  useEffect(() => {
    form.setValue("duration", value);
    form.setValue("language", "hausa");
  }, []);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          onClick={() => {
            setOpen(true);
          }}
          className="bg-black hover:bg-slate-900 font-bold"
        >
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
        <Tabs defaultValue="pdfs" className="w-full mt-4">
          <TabsList className="w-full">
            <TabsTrigger value="pdfs" className="w-full">
              PDF
            </TabsTrigger>
            <TabsTrigger value="audios" className="w-full">
              AUDIO
            </TabsTrigger>
          </TabsList>
          <TabsContent value="pdfs">
            <Form {...form}>
              <form className="space-y-4 my-4">
                <ControlledInput name="subject" label="Subject" />
                <ControlledSelect
                  name="language"
                  label="Select Preferred Language"
                  values={language}
                />
                <div className="flex items-center justify-center ">
                  <div className="space-y-2 w-full">
                    <FormLabel className="font-normal">
                      Select Learning Duration
                    </FormLabel>
                    <Slider
                      defaultValue={[1]}
                      value={value}
                      max={10}
                      min={1}
                      step={1}
                      onValueChange={(value) => {
                        setValue(value);
                      }}
                    />{" "}
                    <span className="text-center text-muted-foreground mt-2">
                      {value && `${value} week`}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div
                      onClick={() => {
                        if (value[0] > 1) {
                          const number = value[0] - 1;
                          setValue([number]);
                        }
                      }}
                      className="h-6 w-6 border hover:bg-slate-100 rounded-full flex items-center justify-center"
                    >
                      <MinusIcon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div
                      className="h-6 w-6 border hover:bg-slate-100 rounded-full flex items-center justify-center"
                      onClick={() => {
                        if (value[0] < 10) {
                          const number = value[0] + 1;
                          setValue([number]);
                        }
                      }}
                    >
                      <PlusIcon className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
                <DragAndDrop type={"pdf"} setselectedFiles={setselectedFiles} />
                <div className="space-y-4 ">
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button
                        loading={loading}
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
          </TabsContent>
          <TabsContent value="audios">
            <Form {...form}>
              <form className="space-y-4 my-4">
                <LiveRecordButton
                  setShowCards={setShowCards}
                  showCards={showCards}
                />
                {/* <div className="space-y-4 ">
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
                </div> */}
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
