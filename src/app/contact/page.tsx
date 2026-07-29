import type { Metadata } from "next";
import { ProsePage } from "@/components/site/ProsePage";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "How to reach PromptGo about a prompt that stopped working, a correction, a takedown request, an advertising question or a suggestion for the directory.",
  path: "/contact",
});

/**
 * Contact page.
 *
 * Present partly because it is the right thing to have and partly because
 * advertising networks look for one during review. A directory with no visible
 * way to reach its operator reads as abandoned or evasive, and that judgement
 * is made by a human reviewer rather than by a crawler.
 *
 * The address is assembled at render rather than written as a mailto link, so
 * a naive scraper collecting addresses from the markup does not get a clean
 * one. Anyone reading the page can still see and copy it.
 */
export default function ContactPage() {
  const inbox = ["hello", site.url.replace(/^https?:\/\//, "").replace(/^www\./, "")].join("@");

  return (
    <ProsePage
      title="Contact"
      path="/contact"
      updated="29 July 2026"
      intro={`Every prompt on ${site.name} is written and tested by a person, so there is a person to write back to. Reach us at ${inbox} and expect a reply within a few working days.`}
    >
      <h2>A prompt stopped working</h2>
      <p>
        This is the message we most want to receive. Models change, and a prompt that held a
        constraint reliably in July can start ignoring it after an update. Tell us which prompt,
        which model, and roughly what it did instead. That is enough for us to reproduce it,
        and pages that need a fix are corrected before they are quietly left to rot.
      </p>

      <h2>Something on a page is wrong</h2>
      <p>
        Corrections are welcome and we would rather hear about a factual error than have it sit
        there. If a claim in an article is wrong, a cited source no longer says what we say it
        says, or a linked specification has moved, send the page and the problem. Every page
        carries a last reviewed date so you can see how stale it might be before you write.
      </p>

      <h2>Suggesting a prompt</h2>
      <p>
        We add prompts where there is a real job being done badly, not to fill a keyword gap. The
        useful version of this message describes the task you are stuck on and what you have
        already tried, rather than naming a topic. If you have a prompt that works, send it and
        say what it got wrong before you fixed it, since that is the part we would publish.
      </p>

      <h2>Copyright and takedown</h2>
      <p>
        If you believe material on this site infringes your copyright, write to the address above
        with the page URL, a description of the work you say it infringes, and your contact
        details. We will review it and remove anything we cannot justify keeping. We would rather
        take a page down and argue about it afterwards than leave a disputed one up.
      </p>

      <h2>Advertising and commercial enquiries</h2>
      <p>
        This site is supported by display advertising and nothing else. There is no sponsored
        placement, no paid inclusion in the directory and no affiliate arrangement behind any
        recommendation, so enquiries about buying a link or a mention will be declined. Questions
        about the advertising itself, including how to report a broken or inappropriate ad, are
        welcome and are answered by a person.
      </p>

      <h2>Privacy requests</h2>
      <p>
        Requests about your own data, including access, correction and deletion, go to the same
        address. Note that nothing you type into a prompt panel ever reaches us, so there is
        usually less to request than people expect. What we do hold, and how long for, is set out
        on the privacy page.
      </p>
    </ProsePage>
  );
}
