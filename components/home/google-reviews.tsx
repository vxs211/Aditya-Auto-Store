import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Highlight } from "@/components/ui/highlight";
import { SectionHeading } from "@/components/ui/section-heading";
import { GOOGLE_REVIEWS } from "@/lib/reviews";

import { ReviewCarousel } from "./review-carousel";

function GoogleG({ className }: { className?: string }) {
  return (
    <svg aria-hidden className={className} viewBox="0 0 48 48">
      <path
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
        fill="#FFC107"
      />
      <path
        d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
        fill="#FF3D00"
      />
      <path
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
        fill="#4CAF50"
      />
      <path
        d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
        fill="#1976D2"
      />
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span aria-label={`${rating} out of 5 stars`} className="flex gap-0.5" role="img">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          aria-hidden
          className={star <= Math.round(rating) ? "size-5 text-[#FBBC04]" : "size-5 text-border"}
          fill="currentColor"
          key={star}
          viewBox="0 0 24 24"
        >
          <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

// Reviews come from lib/reviews, copied from the Google Business Profile. Nothing is shown without them.
export function GoogleReviews() {
  const { count, items, rating, writeReviewUrl } = GOOGLE_REVIEWS;
  if (items.length === 0) return null;

  return (
    <Container>
      <section className="grid gap-10" data-reveal>
        <div className="grid justify-items-center gap-5 text-center">
          <SectionHeading
            align="center"
            title={
              <>
                What customers say on <Highlight>Google</Highlight>
              </>
            }
          />
          {rating !== null && count !== null && (
            <div className="flex flex-wrap items-center justify-center gap-3 bg-muted px-5 py-3">
              <GoogleG className="size-6" />
              <Stars rating={rating} />
              <p className="font-semibold">
                {rating.toFixed(1)} <span className="text-muted-foreground">|</span> {count} reviews
              </p>
            </div>
          )}
        </div>

        <ReviewCarousel>
          {items.map((review) => (
            <li
              className="flex w-[85%] shrink-0 snap-start flex-col gap-4 bg-muted p-6 sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]"
              key={`${review.author}-${review.time}`}
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="flex size-11 shrink-0 items-center justify-center bg-foreground font-heading text-lg text-background"
                >
                  {review.author.charAt(0).toUpperCase()}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-heading text-h4">{review.author}</p>
                  <p className="text-small text-muted-foreground">{review.time}</p>
                </div>
                <GoogleG className="size-6 shrink-0" />
              </div>
              <Stars rating={review.rating} />
              <p className="text-muted-foreground">{review.text}</p>
            </li>
          ))}
        </ReviewCarousel>

        {writeReviewUrl && (
          <div className="flex justify-center">
            <Button
              render={<a href={writeReviewUrl} rel="noopener noreferrer" target="_blank" />}
              size="lg"
            >
              Leave a review on Google
            </Button>
          </div>
        )}
      </section>
    </Container>
  );
}
