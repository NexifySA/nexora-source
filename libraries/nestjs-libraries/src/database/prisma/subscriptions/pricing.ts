export interface PricingInnerInterface {
  current: string;
  month_price: number;
  year_price: number;
  channel?: number;
  posts_per_month: number;
  team_members: boolean;
  community_features: boolean;
  featured_by_gitroom: boolean;
  ai: boolean;
  import_from_channels: boolean;
  image_generator?: boolean;
  image_generation_count: number;
  generate_videos: number;
  public_api: boolean;
  webhooks: number;
  autoPost: boolean;
  trial_days?: number;
}
export interface PricingInterface {
  [key: string]: PricingInnerInterface;
}
// Nexpost MVP pricing — Argentina launch (dLocal Go).
// AI deshabilitada en todos los planes hasta definir presupuesto OpenAI.
// FREE = TRIAL conceptual: permite 1 canal por 14 dias para probar la app.
export const pricing: PricingInterface = {
  FREE: {
    current: 'FREE',
    month_price: 0,
    year_price: 0,
    channel: 1,
    image_generation_count: 0,
    posts_per_month: 20,
    team_members: false,
    community_features: false,
    featured_by_gitroom: false,
    ai: false,
    import_from_channels: false,
    image_generator: false,
    public_api: false,
    webhooks: 0,
    autoPost: false,
    generate_videos: 0,
    trial_days: 14,
  },
  STANDARD: {
    current: 'STANDARD',
    month_price: 19,
    year_price: 190,
    channel: 5,
    posts_per_month: 400,
    image_generation_count: 0,
    team_members: false,
    ai: false,
    community_features: false,
    featured_by_gitroom: false,
    import_from_channels: true,
    image_generator: false,
    public_api: true,
    webhooks: 2,
    autoPost: false,
    generate_videos: 0,
  },
  TEAM: {
    current: 'TEAM',
    month_price: 29,
    year_price: 290,
    channel: 10,
    posts_per_month: 1000000,
    image_generation_count: 0,
    community_features: true,
    team_members: true,
    featured_by_gitroom: true,
    ai: false,
    import_from_channels: true,
    image_generator: false,
    public_api: true,
    webhooks: 10,
    autoPost: true,
    generate_videos: 0,
  },
  PRO: {
    current: 'PRO',
    month_price: 49,
    year_price: 487,
    channel: 30,
    posts_per_month: 1000000,
    image_generation_count: 0,
    community_features: true,
    team_members: true,
    featured_by_gitroom: true,
    ai: false,
    import_from_channels: true,
    image_generator: false,
    public_api: true,
    webhooks: 30,
    autoPost: true,
    generate_videos: 0,
  },
  ULTIMATE: {
    current: 'ULTIMATE',
    month_price: 86,
    year_price: 860,
    channel: 100,
    posts_per_month: 1000000,
    image_generation_count: 0,
    community_features: true,
    team_members: true,
    featured_by_gitroom: true,
    ai: false,
    import_from_channels: true,
    image_generator: false,
    public_api: true,
    webhooks: 10000,
    autoPost: true,
    generate_videos: 0,
  },
};
