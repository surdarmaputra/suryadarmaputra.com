export type CampaignIcon = 'rocket' | 'pencil' | 'star' | 'new';

export type CampaignType = string;

export type CampaignLink = {
  internal?: string | null;
  external?: string | null;
};

export interface Campaign {
  id: string;
  title: string;
  message?: string | null;
  type: CampaignType;
  icon?: CampaignIcon | null;
  date: Date;
  thumbnailUrl?: string | null;
  thumbnailPlaceholderUrl?: string | null;
  link: CampaignLink;
  isHighlighted?: boolean;
}
