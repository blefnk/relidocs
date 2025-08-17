import { Suspense } from "react";
import { TweetSkeleton } from "react-tweet";

import United24Banner from "~/ui/components/banners/u24";
import NoiseEffect from "~/ui/components/noise-effect";
import { TweetPageViaCache } from "~/ui/components/react-tweet/rt-via-cache";
import { getRandomTweetId } from "~/ui/components/react-tweet/tweet-ids";
import { RandomYouTube } from "~/ui/components/react-youtube";
import { Hero } from "~/ui/components/sections/hero";
import { HomeFooter, Outro } from "~/ui/components/sections/home-footer";
import { HomeHeader } from "~/ui/components/sections/home-header";
import { TabsSection } from "~/ui/components/sections/tabs-section/mod";

export default function HomePage() {
  const randomTweetId = getRandomTweetId();

  return (
    <main className="relative min-h-screen bg-background font-mono text-foreground">
      <NoiseEffect />
      <div className="scanlines" />
      <div className="container mx-auto max-w-5xl px-4 py-12">
        <HomeHeader />
        <Hero />
        {/* revolutionaries callout */}
        <div className="my-8 rounded-lg border border-dashed border-foreground/20 bg-muted p-6 text-center">
          <p className="mb-2 text-lg">
            before reliverse, there were the revolutionaries and we should always appreciate
            them—the ones who broke and rebuilt the js world.
          </p>
          <p className="mb-4 text-muted-foreground">
            learn their stories, get inspired, and see what it takes to change everything.
          </p>
          <a
            className="brutal-button underline text-base"
            href="https://blefnk.reliverse.org/blog/articles/js-gems"
            rel="noopener noreferrer"
            target="_blank"
          >
            meet the legends
          </a>
        </div>
        <div className="content-grid mb-6 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="h-fit">
            <Suspense fallback={<TweetSkeleton />}>
              <TweetPageViaCache id={randomTweetId} />
            </Suspense>
          </div>
          <div className="h-fit">
            <RandomYouTube className="w-full md:pt-6" />
          </div>
        </div>
        <TabsSection />
        <United24Banner animateGradient={false} />
        <Outro />
        <HomeFooter />
      </div>
    </main>
  );
}
