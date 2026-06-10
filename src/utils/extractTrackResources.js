import { sweData } from '../data/sweData';
import { resourceData } from '../data/resourceData';

function domainOf(url) {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return 'other';
  }
}

// Extract all unique SWE resources, each carrying every day that references it.
// Shape: { title, url, days: [{weekNumber, day, task}] }
export function getSweResources() {
  const resourceMap = new Map(); // url → enriched resource

  for (const phase of sweData) {
    for (const week of (phase.weeks || [])) {
      for (const day of (week.days || [])) {
        for (const res of (day.resources || [])) {
          if (!res.url) continue;

          if (!resourceMap.has(res.url)) {
            resourceMap.set(res.url, { title: res.title, url: res.url, days: [] });
          }

          const entry = resourceMap.get(res.url);
          const alreadyLinked = entry.days.some(
            d => d.weekNumber === week.weekNumber && d.day === day.day
          );
          if (!alreadyLinked) {
            entry.days.push({ weekNumber: week.weekNumber, day: day.day, task: day.task });
          }
        }
      }
    }
  }

  const leetcode = [];
  const youtube = [];
  const tools = [];

  for (const resource of resourceMap.values()) {
    const domain = domainOf(resource.url);
    if (domain === 'leetcode.com') leetcode.push(resource);
    else if (domain === 'youtube.com' || domain === 'youtu.be') youtube.push(resource);
    else tools.push(resource);
  }

  const buckets = [];
  if (leetcode.length) buckets.push({ label: 'LeetCode Problems', links: leetcode });
  if (youtube.length) buckets.push({ label: 'Video Explanations', links: youtube });
  if (tools.length) buckets.push({ label: 'Tools & Platforms', links: tools });
  return buckets;
}

// GTME resources from resourceData — no day card associations available
export function getGtmeResources() {
  return resourceData.map(section => ({
    label: section.category,
    links: section.links.map(link => ({ title: link.title, url: link.url, days: [] }))
  }));
}
