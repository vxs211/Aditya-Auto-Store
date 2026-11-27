import { existsSync } from "node:fs";
import { join } from "node:path";

import { ReviewShowcase } from "@/components/home/review-showcase";
import { Container } from "@/components/ui/container";
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

// Placeholder reviews until real ones are copied from Google; avatars are illustrations, not real customers.
const SAMPLE_REVIEWS = [
  {
    author: "Amit Patil",
    avatar: "/review-avatars/indian-1.svg",
    photo: "/vehicles/activa.png",
    rating: 5,
    role: "Activa rider, Pune",
    tags: ["Activa", "Leg guard"],
    text: "The guard fits my Activa neatly and feels solid on everyday rides.",
  },
  {
    author: "Priya Sharma",
    avatar: "/review-avatars/indian-2.svg",
    rating: 5,
    role: "Scooter owner, Jaipur",
    tags: ["Footrest", "Packaging"],
    text: "The footrest arrived well packed and looks great on my scooter.",
  },
  {
    author: "Rahul Mehta",
    avatar: "/review-avatars/indian-3.svg",
    photo: "/vehicles/Chetak.png",
    rating: 5,
    role: "Chetak owner, Ahmedabad",
    tags: ["Chetak", "Bumper"],
    text: "Good finish on the stainless steel bumper and a straightforward fit.",
  },
  {
    author: "Neha Kulkarni",
    avatar: "/review-avatars/indian-4.svg",
    photo: "/vehicles/Access.png",
    rating: 4,
    role: "Access rider, Mumbai",
    tags: ["Access", "Fitment"],
    text: "The team helped me find the right accessories for my Access.",
  },
  {
    author: "Harpreet Singh",
    avatar: "/review-avatars/indian-5.svg",
    rating: 5,
    role: "Scooter owner, Ludhiana",
    tags: ["Scooter guard", "Mounting"],
    text: "Sturdy parts and a clean look on my daily commute.",
  },
  {
    author: "Anjali Nair",
    avatar: "/review-avatars/indian-6.svg",
    photo: "/vehicles/activa.png",
    rating: 5,
    role: "Activa rider, Kochi",
    tags: ["Floor mat", "Easy to clean"],
    text: "The floor mat fits neatly and is easy to clean after a rainy ride.",
  },
  {
    author: "Vikram Reddy",
    avatar: "/review-avatars/indian-7.svg",
    rating: 4,
    role: "Daily rider, Hyderabad",
    tags: ["Selection", "Guidance"],
    text: "Helpful guidance when I was choosing accessories for my scooter.",
  },
  {
    author: "Kavita Rao",
    avatar: "/review-avatars/indian-8.svg",
    photo: "/vehicles/Access.png",
    rating: 5,
    role: "Access rider, Bengaluru",
    tags: ["Finish", "Fitment"],
    text: "The finish looks neat and the parts suit my scooter nicely.",
  },
  {
    author: "Manish Joshi",
    avatar: "/review-avatars/indian-9.svg",
    photo: "/vehicles/Chetak.png",
    rating: 5,
    role: "Chetak owner, Nagpur",
    tags: ["Bumper", "Packaging"],
    text: "The bumper was packed securely and fitted without trouble.",
  },
  {
    author: "Sneha Menon",
    avatar: "/review-avatars/indian-10.svg",
    rating: 4,
    role: "Scooter owner, Chennai",
    tags: ["Accessories", "Daily use"],
    text: "A useful selection of accessories for daily scooter use.",
  },
];

// Drop a real photo at public/review-avatars/photos/indian-N.jpg (same N as the illustration) and it replaces the
// illustration automatically.
function withRealPhoto(avatar: string | undefined) {
  const match = avatar?.match(/indian-(\d+)\.svg$/);
  if (!match) return avatar;
  const photo = `/review-avatars/photos/indian-${match[1]}.jpg`;
  return existsSync(join(process.cwd(), "public", photo)) ? photo : avatar;
}

export function GoogleReviews() {
  const { count, rating } = GOOGLE_REVIEWS;
  const isSample = GOOGLE_REVIEWS.items.length === 0;
  const reviews = isSample
    ? SAMPLE_REVIEWS.map((review) => ({ ...review, avatar: withRealPhoto(review.avatar) }))
    : GOOGLE_REVIEWS.items.map((review) => ({
        author: review.author,
        rating: review.rating,
        role: review.time,
        tags: ["Google review", review.time],
        text: review.text,
      }));

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-24" data-reveal>
      <Container className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-8 sm:gap-10">
        <div className="grid justify-items-center gap-3 text-center">
          <p className="text-label font-medium tracking-[0.2em] text-muted-foreground uppercase">
            Our customers
          </p>
          <SectionHeading
            align="center"
            title={isSample ? "Our success stories" : "What customers say on Google"}
          />
          <p className="max-w-xl text-body text-muted-foreground">
            {isSample
              ? "Sample reviews and illustrated profiles for preview only."
              : "Real riders share how our accessories fit and hold up every day."}
          </p>
          {rating !== null && count !== null && (
            <div className="flex flex-wrap items-center justify-center gap-3 rounded-full bg-muted px-5 py-3">
              <GoogleG className="size-6" />
              <Stars rating={rating} />
              <p className="font-semibold text-foreground">
                {rating.toFixed(1)} <span className="text-muted-foreground">|</span> {count} reviews
              </p>
            </div>
          )}
        </div>

        {reviews.length === 0 ? (
          <p className="text-center text-body text-muted-foreground">
            Customer reviews will appear here soon.
          </p>
        ) : (
          <ReviewShowcase reviews={reviews} />
        )}
      </Container>
    </section>
  );
}
