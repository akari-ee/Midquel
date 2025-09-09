export const routeConfig = {
  HOME: { href: "/", label: "Home" },
  FILM: {
    href: "/film",
    label: "Film",
    detail: (slug: string) => `/film/${slug}`,
  },
  ARCHIVES: {
    href: "/archives",
    label: "Archives",
    detail: (slug: string) => `/archives/${slug}`,
  },
  PROFILE: { href: "/profile", label: "Profile" },
} as const;
