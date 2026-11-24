import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Highlight } from "@/components/ui/highlight";
import { StarIcon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { GOOGLE_REVIEWS } from "@/lib/reviews";

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
        <StarIcon
          className={star <= Math.round(rating) ? "size-5 text-primary" : "size-5 text-border"}
          fill="currentColor"
          key={star}
        />
      ))}
    </span>
  );
}

const SAMPLE_REVIEWS = [
  {
    author: "Amit P.",
    rating: 5,
    text: "The guard fits my Activa neatly and feels solid on everyday rides.",
    time: "Sample review",
    avatar: "/review-avatars/sample-1.svg",
    photo: "/vehicles/activa.png",
  },
  {
    author: "Priya S.",
    rating: 5,
    text: "The footrest arrived well packed and looks great on my scooter.",
    time: "Sample review",
    avatar: "/review-avatars/sample-2.svg",
  },
  {
    author: "Rahul M.",
    rating: 5,
    text: "Good finish on the stainless steel bumper and a straightforward fit.",
    time: "Sample review",
    avatar: "/review-avatars/sample-3.svg",
  },
  {
    author: "Neha K.",
    rating: 4,
    text: "The team helped me find the right accessories for my Access.",
    time: "Sample review",
    avatar: "/review-avatars/sample-4.svg",
    photo: "/vehicles/Access.png",
  },
  {
    author: "Vikram R.",
    rating: 5,
    text: "Sturdy parts and a clean look on my daily commute.",
    time: "Sample review",
    avatar: "/review-avatars/sample-5.svg",
    photo: "/vehicles/Chetak.png",
  },
  {
    author: "Pooja D.",
    rating: 5,
    text: "The fitting kit matched my scooter and installation was simple.",
    time: "Sample review",
    avatar: "/review-avatars/sample-6.svg",
  },
  {
    author: "Rohan B.",
    rating: 5,
    text: "The scooter guard feels sturdy and fits the mounting points well.",
    time: "Sample review",
    avatar: "/review-avatars/sample-1.svg",
  },
  {
    author: "Anjali N.",
    rating: 5,
    text: "The floor mat fits neatly and is easy to clean after a rainy ride.",
    time: "Sample review",
    avatar: "/review-avatars/sample-2.svg",
    photo: "/vehicles/activa.png",
  },
  {
    author: "Manish J.",
    rating: 4,
    text: "Helpful guidance when I was choosing accessories for my Chetak.",
    time: "Sample review",
    avatar: "/review-avatars/sample-3.svg",
  },
  {
    author: "Kavita R.",
    rating: 5,
    text: "The finish looks neat and the parts suit my scooter nicely.",
    time: "Sample review",
    avatar: "/review-avatars/sample-4.svg",
  },
  {
    author: "Arjun S.",
    rating: 5,
    text: "The bumper was packed securely and fitted without trouble.",
    time: "Sample review",
    avatar: "/review-avatars/sample-5.svg",
    photo: "/vehicles/Access.png",
  },
  {
    author: "Sneha M.",
    rating: 4,
    text: "A useful selection of accessories for daily scooter use.",
    time: "Sample review",
    avatar: "/review-avatars/sample-6.svg",
  },
];

export function GoogleReviews() {
  const { count, rating, writeReviewUrl } = GOOGLE_REVIEWS;
  const isSample = GOOGLE_REVIEWS.items.length === 0;
  const items = isSample ? SAMPLE_REVIEWS : GOOGLE_REVIEWS.items;

  return (
    <Container>
      <section
        className="grid gap-10 rounded-3xl bg-[linear-gradient(180deg,#fff4ec_0%,#fffaf6_55%,#ffffff_100%)] px-4 py-16 sm:px-8"
        data-reveal
      >
        <div className="grid justify-items-center gap-5 text-center">
          <SectionHeading
            align="center"
            title={
              isSample ? (
                "Customer reviews preview"
              ) : (
                <>
                  What customers say on <Highlight>Google</Highlight>
                </>
              )
            }
          />
          {isSample && (
            <p className="text-sm text-muted-foreground">
              Sample reviews and illustrated profiles for preview only.
            </p>
          )}
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

        {items.length === 0 ? (
          <div className="mx-auto grid max-w-md justify-items-center gap-3 rounded-2xl bg-white p-8 text-center shadow-soft">
            <GoogleG className="size-8" />
            <p className="text-base text-muted-foreground">
              Customer reviews will appear here soon.
            </p>
          </div>
        ) : (
          <div className="relative h-[32rem] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_14%,black_86%,transparent)]">
            <div className="grid h-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: Math.min(3, items.length) }, (_, column) => {
                const reviews = [...items.slice(column), ...items.slice(0, column)];
                return (
                  <div
                    key={column}
                    aria-hidden={column > 0 ? true : undefined}
                    className={`overflow-hidden motion-reduce:overflow-y-auto ${column === 1 ? "hidden sm:block" : column === 2 ? "hidden lg:block" : ""}`}
                  >
                    <div
                      className="grid gap-3 focus-within:[animation-play-state:paused] motion-reduce:![animation:none]"
                      style={{
                        animation: `review-flow 120s linear infinite ${column === 1 ? "reverse" : "normal"}`,
                      }}
                    >
                      {[0, 1].map((copy) => (
                        <ul
                          key={copy}
                          aria-hidden={copy === 1 ? true : undefined}
                          className="grid gap-3"
                        >
                          {reviews.map((review) => (
                            <li
                              key={`${review.author}-${review.time}`}
                              className="grid gap-4 rounded-2xl bg-white p-6 shadow-soft"
                            >
                              <Stars rating={review.rating} />
                              <p className="text-base leading-relaxed text-foreground">
                                {review.text}
                              </p>
                              {"photo" in review && typeof review.photo === "string" && (
                                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted">
                                  <Image
                                    alt="Sample scooter image"
                                    className="object-contain"
                                    fill
                                    sizes="100vw"
                                    src={review.photo}
                                  />
                                  <span className="absolute right-2 bottom-2 rounded-full bg-white/90 px-2 py-1 text-xs text-foreground">
                                    Sample image
                                  </span>
                                </div>
                              )}
                              <div className="flex items-center gap-3">
                                <span
                                  aria-hidden="true"
                                  className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/15 text-sm font-semibold text-foreground"
                                >
                                  {"avatar" in review && typeof review.avatar === "string" ? (
                                    <Image
                                      alt=""
                                      className="size-full rounded-full"
                                      height={36}
                                      sizes="100vw"
                                      src={review.avatar}
                                      width={36}
                                    />
                                  ) : (
                                    review.author.charAt(0).toUpperCase()
                                  )}
                                </span>
                                <span className="grid gap-0.5">
                                  <span className="text-sm font-semibold text-foreground">
                                    {review.author}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {review.time}
                                  </span>
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

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
