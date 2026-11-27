import { Container } from "@/components/ui/container";
import { Page } from "@/components/ui/page";
import { PageHero } from "@/components/ui/page-cards";
import { Prose } from "@/components/ui/prose";
import { Skeleton } from "@/components/ui/skeleton";

interface RichTextPageProps {
  body: string;
  title: string;
}

export function RichTextPage({ body, title }: RichTextPageProps) {
  return (
    <Page className="pt-0 md:pt-0">
      <PageHero title={title} />
      <section className="bg-white pb-12 sm:pb-16 lg:pb-24">
        <Container className="max-w-3xl">
          <div className="rounded-2xl bg-white p-6 shadow-card sm:p-10">
            <Prose className="max-w-none prose-h2:text-2xl prose-p:leading-relaxed prose-p:text-foreground/80 prose-a:text-foreground prose-a:underline-offset-4 prose-li:text-foreground/80 prose-strong:text-foreground">
              <div
                // oxlint-disable-next-line react/no-danger -- Page and policy bodies pass through sanitizeShopifyHtml when fetched.
                dangerouslySetInnerHTML={{ __html: body }}
              />
            </Prose>
          </div>
        </Container>
      </section>
    </Page>
  );
}

export function RichTextPageSkeleton() {
  return (
    <Page aria-busy="true">
      <Container className="max-w-2xl">
        <div className="grid gap-5">
          <Skeleton className="h-10 w-3/4" />
          <div className="grid gap-2.5">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </Container>
    </Page>
  );
}
