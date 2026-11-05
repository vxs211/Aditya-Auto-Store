export interface GoogleReview {
  author: string;
  rating: number;
  text: string;
  // How long ago, as Google shows it, for example "3 months ago".
  time: string;
}

// TODO(owner): copy real reviews from your Google Business Profile: the customer's name, star rating, text and
// "time ago". Also set the summary (rating and number of reviews, as Google shows them) and the link that opens
// the "write a review" box (Business Profile > Get more reviews > Share review form). Reviews are never made up
// here, so the home page section stays hidden until `items` has at least one review.
export const GOOGLE_REVIEWS = {
  count: null as number | null,
  items: [] as GoogleReview[],
  rating: null as number | null,
  writeReviewUrl: null as string | null,
};
