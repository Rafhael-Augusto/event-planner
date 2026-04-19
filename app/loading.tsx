import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="absolute top-0 left-0 flex items-center justify-center w-screen h-screen">
      <Spinner className="size-20 text-muted-foreground z-10" />

      <div className="absolute top-0 left-0 h-screen w-screen bg-black/40 " />
    </div>
  );
}
