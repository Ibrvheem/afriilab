import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReactNode } from "react";
import { Orbit } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full lg:grid lg:h-screen lg:grid-cols-2 xl:min-h-[800px] font-raleway">
      <div className="flex items-start justify-between flex-col container py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Orbit className="h-6 w-6 text-primary" />
          <span className="font-bold">StudyLabs</span>
        </Link>
        {children}
        <div></div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="https://cdn.dribbble.com/userupload/16954621/file/original-76e6c95cfce672a914243c6b4dea77ba.gif"
          alt="Image"
          width="2920"
          height="2080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
