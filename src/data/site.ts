/**
 * Every string, figure and image reference below is transcribed from the
 * approved Figma v3 home page (node 59885:644). Nothing here is invented.
 *
 * Where the design shows a control whose destination or content was not
 * supplied, the entry carries `demo: true` (or a `missing` note) so the UI can
 * render an honest "not connected in this preview" state instead of a dead
 * link or a fabricated value. Those entries are listed in README → Handoff.
 */

export type Vertical = "tiny-homes" | "adus";

/* ---------------------------------------------------------------- Header */

export const SITE = {
  name: "Dunlop & Butler",
  tagline: "The premier classifieds for tiny homes & ADUs",
  strapline: "Classified Ads For Affordable Living Solution",
  copyright: "© 2026 Dunlop & Butler",
} as const;

export const COUNTRY = {
  code: "US",
  label: "United States",
  flag: "/assets/images/flag-us.png",
} as const;

/** Options for the header's "Categories" scope select. */
export const SEARCH_SCOPES = [
  { value: "all", label: "Categories" },
  { value: "tiny-homes", label: "Tiny Homes" },
  { value: "adus", label: "ADUs" },
] as const;

export type SearchScope = (typeof SEARCH_SCOPES)[number]["value"];

/* ------------------------------------------------------- Category ticker */

export const TICKER_ITEMS = [
  "Sell",
  "Buy",
  "Manufacturers",
  "Contractors",
  "Accessories",
  "Homes on Wheels",
  "Land",
  "Financing",
  "And everything else for downsized living",
] as const;

/* ------------------------------------------------------------ Stats band */

export const STATS = [
  { value: "31.5B", label: "Projected US Tiny Home & ADU market by 2030" },
  { value: "50", label: "States covered at launch" },
  { value: "40+", label: "Searchable categories across both verticals" },
  { value: "180%", label: "Growth in ADU permits since 2020" },
] as const;

/* ---------------------------------------------------- Category directory */

export type DirectoryColumn = {
  id: Vertical;
  title: string;
  icon: string;
  columns: [string[], string[]];
};

export const DIRECTORY: DirectoryColumn[] = [
  {
    id: "tiny-homes",
    title: "Tiny Homes",
    icon: "/assets/icons/house-tiny-home.svg",
    columns: [
      [
        "For Sale",
        "For Rent",
        "Models",
        "Financing",
        "Parts & Suppliers",
        "Interim Solutions",
        "Communities & Villages",
        "On Wheels",
        "Zoning",
        "Land For Sale",
        "AirBnB",
        "Furniture",
      ],
      [
        "Appliances",
        "Miniature Homes",
        "Cabins & Cottages",
        "Affordable Home Solutions",
        "Manufactured Homes",
        "Books",
        "Blogs",
        "Shelters & Advocates",
        "Facebook",
        "Instagram",
        "TikTok",
        "Sheds",
      ],
    ],
  },
  {
    id: "adus",
    title: "ADUs",
    icon: "/assets/icons/house-adu.svg",
    columns: [
      [
        "Contractors",
        "Models",
        "Permits",
        "Developers",
        "Supplies",
        "Repairs",
        "Blogs",
        "Facebook",
        "Instagram",
        "TikTok",
        "Alternative Living Solutions",
      ],
      [
        "Affordable Housing",
        "AirBnB",
        "Inspectors",
        "Feasibility Analysis",
        "Books",
        "Financing",
        "Online Communities",
        "Construction Software",
        "Storage Containers",
        "Storage Units",
        "RVs (Recreational Vehicles)",
      ],
    ],
  },
];

/* ------------------------------------------------- Showcase tabs + cards */

export type ShowcaseTab = {
  id: string;
  label: string;
  /** Set when the design shows the tab but supplied no cards for it. */
  missing?: string;
};

export const SHOWCASE_TABS: ShowcaseTab[] = [
  { id: "tiny-homes", label: "Tiny Homes" },
  {
    id: "adus",
    label: "ADUs",
    missing: "ADU listing cards have not been supplied yet.",
  },
  {
    id: "tiny-home-manufacturers",
    label: "Tiny Home Manufacturers",
    missing: "Manufacturer cards have not been supplied yet.",
  },
  {
    id: "adu-contractors",
    label: "ADU Contractors",
    missing: "Contractor cards have not been supplied yet.",
  },
  { id: "our-book", label: "Our Book" },
];

export type ShowcaseCard = {
  id: string;
  tab: string;
  title: string;
  description: string;
  image: string;
  /** Rendered at 1x in the 4-up grid; intrinsic size of the supplied file. */
  width: number;
  height: number;
  /** Real destination when one was supplied in the Figma annotations. */
  href?: string;
};

export const SHOWCASE_CARDS: ShowcaseCard[] = [
  {
    id: "modern-tiny-home",
    tab: "tiny-homes",
    title: "Modern Tiny Home",
    description: "Clean, compact design built for full-time living.",
    image: "/assets/images/tiny-home-modern.jpg",
    width: 544,
    height: 500,
  },
  {
    id: "tiny-home-interior",
    tab: "tiny-homes",
    title: "Tiny Home Interior",
    description: "Smart layouts that make every square foot count.",
    image: "/assets/images/tiny-home-interior.jpg",
    width: 544,
    height: 500,
  },
  {
    id: "tiny-home-on-wheels",
    tab: "tiny-homes",
    title: "Tiny Home on Wheels",
    description: "Mobile living, built for the open road.",
    image: "/assets/images/tiny-home-on-wheels.jpg",
    width: 544,
    height: 500,
  },
  {
    id: "tiny-home-community",
    tab: "tiny-homes",
    title: "Tiny Home Community",
    description: "Shared living spaces, built around connection.",
    image: "/assets/images/tiny-home-community.jpg",
    width: 544,
    height: 500,
  },
  {
    id: "book-2026",
    tab: "our-book",
    title: "Everything you need to know about tiny homes & ADUs",
    description:
      "The 2026 Edition is the foundation of the Dunlop & Butler movement.",
    image: "/assets/images/book-cover-2026.png",
    width: 900,
    height: 606,
    href: BOOK_URL(),
  },
];

/* ---------------------------------------------------------------- Pricing */

export type PricingTerm = {
  id: string;
  label: string;
  /** Only the 4-month price appears in the design; the others weren't supplied. */
  price?: string;
  period?: string;
};

export const PREMIUM_TERMS: PricingTerm[] = [
  { id: "3m", label: "3 Months" },
  { id: "4m", label: "4 Months", price: "$14.95", period: "/ 4 months" },
  { id: "6m", label: "6 months" },
];

export const BASIC_PLAN = {
  name: "Basic",
  icon: "/assets/icons/plan-basic.svg",
  description:
    "Get your ad live and searchable across all 50 states in minutes.",
  price: "$5",
  period: "one-time / per ad",
  note: "No renewal required",
  features: [
    "Nationwide visibility from day one",
    "Searchable by state, zip, and category",
    "Simple, flat one-time fee",
  ],
} as const;

export const PREMIUM_PLAN = {
  name: "Premium Listing",
  icon: "/assets/icons/plan-premium.svg",
  badge: "Most Popular",
  description:
    "Priority placement and extended visibility, built for sellers who want faster results.",
  note: "Auto-renews unless cancelled",
  features: [
    "Elevated visibility in search results",
    "Highlighted placement within your category",
    "Runs for your selected term — 3, 4, or 6 months",
  ],
} as const;

/* ------------------------------------------------------------------ Book */

/**
 * The only real external destination in the design — supplied as a developer
 * annotation on the "Get the Book" button (node 59885:1004).
 */
export function BOOK_URL() {
  return "https://www.amazon.com/Everything-Need-Know-About-Homes/dp/B0FQ4K4MW1";
}

export const BOOK = {
  title: "Everything you need to know about tiny homes & ADUs",
  subtitle:
    "The 2026 Edition is the foundation of the Dunlop & Butler movement.",
  cta: "Get the Book",
  href: BOOK_URL(),
  cover: "/assets/images/book-cover-2026.png",
} as const;

/* ---------------------------------------------------------------- Footer */

export const FOOTER_MENUS = [
  { title: "About", links: ["About Us", "Affiliates", "Contact Us"] },
  { title: "More", links: ["Privacy Policy", "Terms & Conditions"] },
] as const;
