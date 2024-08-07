"use client";
import { StarsBackground } from "@/ui/shooting-background";
import { Card } from "@/components/Card";
import { Logo } from "@/components/Logo";



export default function Home() {

  // use start effect in the background
  return (
    <main className="min-h-screen h-[30rem] w-full">
      <div className="relative w-full h-full z-10">
       
        <Logo />

        <Card />
       
      </div>

      {/* <StarsBackground className="bg-green-800 z-0" /> */}
    </main>
  );
}
