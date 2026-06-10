import { sweData } from '../data/sweData';
import { resourceData } from '../data/resourceData';

function domainOf(url) {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return 'other';
  }
}

// Extract all unique resources from sweData, grouped by domain bucket
export function getSweResources() {
  const seen = new Set();
  const leetcode = [];
  const youtube = [];
  const tools = [];

  for (const phase of sweData) {
    for (const week of (phase.weeks || [])) {
      for (const day of (week.days || [])) {
        for (const res of (day.resources || [])) {
          if (!res.url || seen.has(res.url)) continue;
          seen.add(res.url);

          const domain = domainOf(res.url);
          if (domain === 'leetcode.com') {
            leetcode.push(res);
          } else if (domain === 'youtube.com' || domain === 'youtu.be') {
            youtube.push(res);
          } else {
            tools.push(res);
          }
        }
      }
    }
  }

  const buckets = [];
  if (leetcode.length) buckets.push({ label: 'LeetCode Problems', links: leetcode });
  if (youtube.length) buckets.push({ label: 'Video Explanations', links: youtube });
  if (tools.length) buckets.push({ label: 'Tools & Platforms', links: tools });
  return buckets;
}

// GTME resources come straight from resourceData — already categorised
export function getGtmeResources() {
  return resourceData.map(section => ({
    label: section.category,
    links: section.links
  }));
}
