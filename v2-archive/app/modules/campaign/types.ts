export const CAMPAIGN_ICON = {
  rocket: 'rocket',
  pencil: 'pencil',
  star: 'star',
  new: 'new',
} as const;

export type CampaignIcon = (typeof CAMPAIGN_ICON)[keyof typeof CAMPAIGN_ICON];

export const CAMPAIGN_TYPE = {
  landing_highlight: 'landing_highlight',
} as const;

export type CampaignType = (typeof CAMPAIGN_TYPE)[keyof typeof CAMPAIGN_TYPE];

export type CampaignLink = {
  internal?: string | null;
  external?: string | null;
};

export type Campaign = {
  id: string;
  title: string;
  message?: string | null;
  type: CampaignType | null;
  icon?: CampaignIcon | null;
  startDate: Date;
  endDate?: Date | null;
  order?: number | null;
  thumbnailUrl?: string | null;
  thumbnailPlaceholderUrl?: string | null;
  link: CampaignLink;
  isHighlighted?: boolean;
};
