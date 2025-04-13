import { CardComponent } from "@/components/Card";
import { LogoComponent } from "@/components/Logo";

export default function Home() {
  return (
    <main className="min-h-screen h-[30rem] w-full">
      <div className="relative w-full h-full z-10">
        <LogoComponent />
        <CardComponent />
      </div>
    </main>
  );
}
