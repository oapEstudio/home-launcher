import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';
import type { INotificationCommon } from '../../../../domain/entities/INotificationCommon';
import type { NotificationGroups } from '../../../components/widgets/nav-bar-launcher/components/NotificationBell';
import type { NotificationItem } from '../../../components/widgets/nav-bar-launcher/components/NotificationBellRows';

dayjs.extend(utc);
dayjs.extend(tz);

type MapOptions = {
  
  tz?: string;
  
  now?: Date;
  
  coerceHttps?: boolean;
};

const DEFAULT_TZ = 'America/Argentina/Buenos_Aires';

const normalizeUrl = (href: string, coerce: boolean) => {
  if (!href) return href;
  if (!coerce) return href;
  return /^https?:\/\//i.test(href) ? href : `https://${href}`;
};


export function mapCommonToGroups(
  list: INotificationCommon[],
  opts: MapOptions = {}
): NotificationGroups {
    
  const useTz = opts.tz ?? (dayjs.tz() ? DEFAULT_TZ : undefined);
  const nowD = opts.now ? dayjs(opts.now) : dayjs();
  const now = useTz ? nowD.tz(useTz) : nowD;

  const sorted = [...list].sort((a, b) => {
    const ad = dayjs(a.dateUpdated);
    const bd = dayjs(b.dateUpdated);
    return bd.valueOf() - ad.valueOf();
  });

  const groups: NotificationGroups = { today: [], yesterday: [], others: [] };

  for (const n of sorted) {

    const raw = dayjs(n.dateUpdated);
    const d = useTz ? raw.tz(useTz) : raw;


    const item: NotificationItem = {
      id: `${n.notificationCommonTypeId}-${n.name}-${d.valueOf()}`,
      notificationTypeId: n.notificationCommonTypeId,
      title: n.title || n.name,
      description: n.description,
      read: n.read,
      ...(n.buttonText && n.buttonLink
        ? {
            cta: {
              title: n.buttonText,
              href: normalizeUrl(n.buttonLink, !!opts.coerceHttps),
            },
          }
        : {}),
    };

    if (d.isSame(now, 'day')) {
      groups.today.push(item);
    } else if (d.isSame(now.clone().subtract(1, 'day'), 'day')) {
      groups.yesterday.push(item);
    } else {
      groups.others.push(item);
    }
  }

  return groups;
}
