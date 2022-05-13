import config from 'utils/config';

declare global {
  interface Window {
    gtag: (param1: string, param2: string, param3: object) => void;
  }
}

export const pageview = (url: string) => {
  window.gtag('config', config.gaTrackingID || '', {
    page_path: url,
  });
};

export interface GATrackingEvent {
  action: string;
  category: string;
  label: string;
  value?: number;
}

//https://developers.google.com/analytics/devguides/collection/gtagjs/events
// event tracking
export const gTagEvent= ({ action, category, label, value  }: GATrackingEvent) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
