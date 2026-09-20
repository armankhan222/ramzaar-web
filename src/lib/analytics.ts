/* ————————————————————————————————————————————————————————————
   ANALYTICS (brief §42)
   ————————————————————————————————————————————————————————————
   Events funnel into window.dataLayer when a tag manager is
   present. To wire GA4 / Meta Pixel later, forward from `track`.
   Primary conversion: whatsapp_click.
   ———————————————————————————————————————————————————————————— */

export type AnalyticsEvent =
  | 'hero_cta_click'
  | 'whatsapp_click'
  | 'phone_click'
  | 'email_click'
  | 'instagram_click'
  | 'portfolio_interaction'
  | 'faq_open'
  | 'scroll_50'
  | 'scroll_75'
  | 'scroll_90';

type Payload = Record<string, string | number | boolean | undefined>;

export function track(event: AnalyticsEvent, payload?: Payload): void {
  const data = { event, ...payload };

  if (typeof window !== 'undefined') {
    const w = window as unknown as { dataLayer?: unknown[] };
    if (Array.isArray(w.dataLayer)) w.dataLayer.push(data);
  }

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.info('[analytics]', data);
  }
}

/** Fires scroll_50 / scroll_75 / scroll_90 once each, then removes itself. */
export function initScrollTracking(): void {
  if (typeof window === 'undefined') return;

  const milestones = [50, 75, 90] as const;
  const fired = new Set<number>();

  const onScroll = (): void => {
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return;

    const pct = (window.scrollY / scrollable) * 100;
    for (const m of milestones) {
      if (pct >= m && !fired.has(m)) {
        fired.add(m);
        track(`scroll_${m}` as AnalyticsEvent);
      }
    }
    if (fired.size === milestones.length) {
      window.removeEventListener('scroll', onScroll);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
