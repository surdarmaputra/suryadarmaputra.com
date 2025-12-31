import fs from 'fs/promises';

import { getFileExtensionFromUrl, getTextFromProperties } from '~/libs/notion';

import { CAMPAIGNS_FILE } from '../../constants';
import { Campaign, CampaignIcon, CampaignType } from '../../types';

type CampaignJson = {
  id: string;
  title: string;
  properties: {
    date?: { start?: string | null; end?: string | null } | null;
    order?: number | null;
    message?: unknown;
    icon?: { name?: CampaignIcon | string | null } | null;
    type?: { name?: string | null } | null;
    internal_link?: unknown;
    external_link?: string | null;
    thumbnail?: Array<{ file?: { url?: string | null } | null }> | null;
  };
};

function toDateOrNull(value?: string | null): Date | null {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function compareNullableNumber(a?: number | null, b?: number | null): number {
  const aIsNull = a === null || a === undefined;
  const bIsNull = b === null || b === undefined;
  if (aIsNull && bIsNull) return 0;
  if (aIsNull) return 1; // nulls last
  if (bIsNull) return -1;
  return (a as number) - (b as number);
}

function compareNullableDate(a?: Date | null, b?: Date | null): number {
  const aIsNull = !a;
  const bIsNull = !b;
  if (aIsNull && bIsNull) return 0;
  if (aIsNull) return 1; // nulls last
  if (bIsNull) return -1;
  return (a as Date).getTime() - (b as Date).getTime();
}

export async function getCampaigns(): Promise<Campaign[]> {
  const fileContent: Buffer = await fs.readFile(CAMPAIGNS_FILE);
  const campaigns: CampaignJson[] = JSON.parse(fileContent.toString());

  const mapped = campaigns.map((campaign) => {
    const startDate =
      toDateOrNull(campaign.properties?.date?.start) ?? new Date(0);
    const endDate = toDateOrNull(campaign.properties?.date?.end);
    const order = campaign.properties?.order ?? null;

    const thumbnailExtension = getFileExtensionFromUrl(
      campaign.properties?.thumbnail?.[0]?.file?.url ?? undefined,
    );
    const thumbnailUrl = thumbnailExtension
      ? `/images/campaigns/${campaign.id}-0.${thumbnailExtension}`
      : null;
    const thumbnailPlaceholderUrl = thumbnailExtension
      ? `/images/campaigns/${campaign.id}-0-placeholder.png`
      : null;

    const title = campaign.title as string;
    const message = getTextFromProperties(campaign.properties, 'message');
    const icon =
      (campaign.properties?.icon?.name as CampaignIcon | undefined) ?? null;
    const type = (campaign.properties?.type?.name as CampaignType) || null;
    const internal = getTextFromProperties(
      campaign.properties,
      'internal_link',
    );
    const external = campaign.properties?.external_link ?? null;

    return {
      id: campaign.id,
      title,
      message,
      type,
      icon,
      startDate,
      endDate,
      order,
      thumbnailUrl,
      thumbnailPlaceholderUrl,
      link: { internal, external },
      isHighlighted: true,
    } satisfies Campaign;
  });

  return mapped.sort((a, b) => {
    const byOrder = compareNullableNumber(a.order, b.order);
    if (byOrder !== 0) return byOrder;
    const byStart = compareNullableDate(a.startDate, b.startDate);
    if (byStart !== 0) return byStart;
    return compareNullableDate(a.endDate ?? null, b.endDate ?? null);
  });
}
