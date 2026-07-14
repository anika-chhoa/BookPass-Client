// import { Button } from "@/components/ui/Button";
// import { RatingStars } from "@/components/ui/RatingStars";
// import { CARD_RADIUS } from "@/constants/theme";
// import type { Book } from "../types/book";

// export function BookCard({
//   book,
//   onViewDetails,
// }: {
//   book: Book;
//   onViewDetails?: (id: string) => void;
// }) {
//   return (
//     <div
//       className={`group flex h-full flex-col overflow-hidden bg-surface-container-lowest shadow-sm card-hover ${CARD_RADIUS}`}
//     >
//       <div className="relative w-full aspect-[3/4] overflow-hidden">
//         <img
//           src={book.coverUrl}
//           alt={`Cover of ${book.title}`}
//           className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
//         />
//         <span className="absolute top-2 right-2 rounded-lg bg-tertiary-container/95 px-sm py-xs font-label-sm text-label-sm text-on-tertiary-container backdrop-blur-sm">
//           {book.category}
//         </span>
//       </div>

//       <div className="flex flex-1 flex-col gap-xs p-md">
//         <h3 className="font-headline-md text-body-lg font-semibold text-primary transition-colors group-hover:text-secondary line-clamp-1">
//           {book.title}
//         </h3>
//         <p className="font-label-sm text-label-sm text-on-surface-variant line-clamp-1">
//           by {book.writer}
//         </p>

//         <p className="flex-1 font-body-md text-body text-sm text-on-surface-variant line-clamp-2">
//           {book.description}
//         </p>

//         <RatingStars rating={book.rating} reviewCount={book.reviewCount} />

//         <Button
//           variant="outline"
//           size="sm"
//           fullWidth
//           onClick={() => onViewDetails?.(book.id)}
//         >
//           View Details
//         </Button>
//       </div>
//     </div>
//   );
// }

import { Button } from "@/components/ui/Button";
import { RatingStars } from "@/components/ui/RatingStars";
import { CARD_RADIUS } from "@/constants/theme";
import type { Book } from "../types/book";

export function BookCard({
  book,
  onViewDetails,
}: {
  book: Book;
  onViewDetails?: (id: string) => void;
}) {
  return (
    <div
      className={`group flex h-full flex-col overflow-hidden bg-surface-container-lowest shadow-sm card-hover ${CARD_RADIUS}`}
    >
      <div className="relative w-full aspect-[3/4] overflow-hidden">
        <img
          src={book.coverUrl}
          alt={`Cover of ${book.title}`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute top-2 right-2 rounded-lg bg-tertiary-container/95 px-sm py-xs font-label-sm text-label-sm text-on-tertiary-container backdrop-blur-sm">
          {book.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-xs p-md">
        <h3 className="font-headline-md text-body-lg font-semibold text-primary transition-colors group-hover:text-secondary line-clamp-1">
          {book.title}
        </h3>
        <div className="flex items-center gap-xs">
          <img src={book.writerPhotoUrl} alt={book.writerName} className="w-5 h-5 rounded-full object-cover" />
          <p className="font-label-sm text-label-sm text-on-surface-variant line-clamp-1">
            {book.writerName}
          </p>
        </div>

        <p className="flex-1 font-body-md text-body text-sm text-on-surface-variant line-clamp-2">
          {book.description}
        </p>

        <RatingStars rating={book.rating} reviewCount={book.reviewCount} />

        <Button
          variant="outline"
          size="sm"
          fullWidth
          onClick={() => onViewDetails?.(book.id)}
        >
          View Details
        </Button>
      </div>
    </div>
  );
}