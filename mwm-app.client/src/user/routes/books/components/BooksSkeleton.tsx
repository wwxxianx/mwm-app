import { Skeleton } from "@/components/ui/skeleton";

export default function BooksSkeleton() {
    return (
        <>
            {Array(20)
                .fill(0)
                .map((_) => (
                    <div className="w-full h-full flex flex-col items-center gap-2">
                        <Skeleton className="mx-auto min-w-[140px] min-h-[200px] w-full h-full bg-slate-300" />
                        <Skeleton className="h-4 w-[120px] bg-slate-300" />
                        <Skeleton className="h-4 w-[80px] bg-slate-300" />
                    </div>
                ))}
        </>
    );
}
