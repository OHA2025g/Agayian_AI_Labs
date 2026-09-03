"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { ResolvedMarketing } from "@/lib/cms/site";

const KEY = "agrayian-cookie-preference";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("agrayian-cookie-change", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("agrayian-cookie-change", onStoreChange);
  };
}

function getSnapshot() {
  try {
    return localStorage.getItem(KEY) === "accepted";
  } catch {
    return false;
  }
}

function getServerSnapshot() {
  return false;
}

function isGtmId(id: string) {
  return /^GTM-[A-Z0-9]+$/i.test(id);
}

function isGaId(id: string) {
  return /^G-[A-Z0-9]+$/i.test(id);
}

function isMetaPixel(id: string) {
  return /^\d{5,20}$/.test(id);
}

function isLinkedIn(id: string) {
  return /^\d{5,20}$/.test(id);
}

export function ConsentAnalytics({
  marketing,
}: {
  marketing?: ResolvedMarketing;
}) {
  const accepted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (!accepted) return null;

  const gtm = marketing?.googleTagManagerId?.trim();
  const ga = marketing?.gaMeasurementId?.trim();
  const meta = marketing?.metaPixelId?.trim();
  const linkedin = marketing?.linkedinPartnerId?.trim();

  return (
    <>
      <Analytics />
      <SpeedInsights />
      {gtm && isGtmId(gtm) ? (
        <Script
          id="ag-gtm"
          src={`https://www.googletagmanager.com/gtm.js?id=${gtm}`}
          strategy="afterInteractive"
        />
      ) : null}
      {ga && isGaId(ga) ? (
        <>
          <Script
            id="ag-ga"
            src={`https://www.googletagmanager.com/gtag/js?id=${ga}`}
            strategy="afterInteractive"
          />
          <Script id="ag-ga-config" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}');`}
          </Script>
        </>
      ) : null}
      {meta && isMetaPixel(meta) ? (
        <Script id="ag-meta" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${meta}');fbq('track','PageView');`}
        </Script>
      ) : null}
      {linkedin && isLinkedIn(linkedin) ? (
        <Script id="ag-linkedin" strategy="afterInteractive">
          {`_linkedin_partner_id="${linkedin}";window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];window._linkedin_data_partner_ids.push(_linkedin_partner_id);`}
        </Script>
      ) : null}
    </>
  );
}
