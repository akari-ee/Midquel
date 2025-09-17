import { LoaderCircleIcon } from "lucide-react";
import { Skeleton } from "~/components/ui/skeleton";

export function SkeletonLoading() {
  return (
    <div className="grow w-full flex justify-center px-5">
      <Skeleton className="w-full h-dvh" />
    </div>
  );
}

export function SpinnerLoading() {
  return (
    <div className="flex justify-center items-center h-dvh w-full">
      <LoaderCircleIcon className="animate-spin text-[#a6a6a6]" size={24} />
    </div>
  );
}
