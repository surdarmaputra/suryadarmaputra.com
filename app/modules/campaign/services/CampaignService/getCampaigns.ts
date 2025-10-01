import fs from 'fs/promises';

import { getFileExtensionFromUrl, getTextFromProperties } from '~/libs/notion';

import { CAMPAIGNS_FILE } from '../../constants';
import { Campaign, CampaignIcon } from '../../types';

export async function getCampaigns(): Promise<Campaign[]> {
  const fileContent: Buffer = await fs.readFile(CAMPAIGNS_FILE);
  const campaigns = JSON.parse(fileContent.toString());

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return campaigns.map((campaign: Record<string, any>) => {
    const date = new Date(campaign.properties.date);
    const thumbnailExtension = getFileExtensionFromUrl(
      campaign.properties.thumbnail?.[0]?.file?.url,
    );
    const thumbnailUrl = thumbnailExtension
      ? `/images/campaigns/${campaign.id}-0.${thumbnailExtension}`
      : null;
    const thumbnailPlaceholderUrl = thumbnailExtension
      ? `/images/campaigns/${campaign.id}-0-placeholder.png`
      : null;

    const title = campaign.title as string;
    const message = getTextFromProperties(campaign.properties, 'message');
    const icon = campaign.properties.icon?.name as CampaignIcon | null;
    const type = campaign.properties.type?.name || '';
    const internal = getTextFromProperties(
      campaign.properties,
      'internal_link',
    );
    const external = campaign.properties.external_link;

    return {
      id: campaign.id,
      title,
      message,
      type,
      icon,
      date,
      thumbnailUrl,
      thumbnailPlaceholderUrl,
      link: { internal, external },
      isHighlighted: true,
    } as Campaign;
  });
}
