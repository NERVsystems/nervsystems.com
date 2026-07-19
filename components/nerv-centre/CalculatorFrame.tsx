'use client';

import { useRef, useEffect } from 'react';

/**
 * Embeds the self-contained TCO calculator (served from /public) and keeps the
 * iframe height synced to its content. The calculator is same-origin, so we can
 * read its document and observe layout changes (e.g. the data table growing as
 * the term slider moves) to avoid an inner scrollbar.
 */
export default function CalculatorFrame({ src }: { src: string }) {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = ref.current;
    if (!iframe) return;
    let ro: ResizeObserver | null = null;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const resize = () => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!doc) return;
        const h = Math.max(
          doc.documentElement?.scrollHeight || 0,
          doc.body?.scrollHeight || 0
        );
        if (h) iframe.style.height = `${h}px`;
      } catch {
        /* cross-origin (shouldn't happen for same-origin file) — keep fallback height */
      }
    };

    const onLoad = () => {
      resize();
      try {
        const doc = iframe.contentDocument;
        if (doc && typeof ResizeObserver !== 'undefined') {
          ro = new ResizeObserver(resize);
          if (doc.documentElement) ro.observe(doc.documentElement);
          if (doc.body) ro.observe(doc.body);
        }
      } catch {
        /* ignore */
      }
      // Catch late layout shifts (fonts, chart render)
      timers.push(setTimeout(resize, 300));
      timers.push(setTimeout(resize, 1200));
    };

    iframe.addEventListener('load', onLoad);
    if (iframe.contentDocument?.readyState === 'complete') onLoad();
    window.addEventListener('resize', resize);

    return () => {
      iframe.removeEventListener('load', onLoad);
      window.removeEventListener('resize', resize);
      timers.forEach(clearTimeout);
      ro?.disconnect();
    };
  }, [src]);

  return (
    <iframe
      ref={ref}
      src={src}
      title="NERV Centre True Cost Calculator"
      className="w-full block bg-tactical-bg"
      style={{ height: '1600px', border: 0 }}
      scrolling="no"
    />
  );
}
