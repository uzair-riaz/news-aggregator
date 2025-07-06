import { Card, CardContent, CardFooter } from "./card";
import { Skeleton } from "./skeleton";

export const SkeletonCard = () => (
  <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
    <CardContent className="flex-grow p-4">
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-1/2 mb-2" />
      <div className="flex items-center gap-2 mb-3 mt-2">
        <Skeleton className="h-4 w-24" />
      </div>
    </CardContent>
    <CardFooter className="flex justify-between items-center p-4">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-24" />
    </CardFooter>
  </Card>
);
