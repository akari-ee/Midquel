import { routeConfig } from "./route-config";

export const appConfig = {
  serviceName: "RECAP",
  serviceDisplayName: "RECAP©",
  serviceDescription:
    "RECAP is a platform for film lovers to share their thoughts and opinions on films.",
  serviceUrl: "https://recap.com",
  bannerImage:
    "https://framerusercontent.com/images/mUkxezOznrwDZY5wiJqPMLwCVSI.jpg?width=3888&height=5184",
  logoAlt: "Recap Logo",
  navItems: [
    routeConfig.HOME,
    routeConfig.FILM,
    routeConfig.ARCHIVES,
    routeConfig.PROFILE,
  ],
  location: {
    city: "Seoul",
    country: "Korea",
  },
  footer: {
    links: [
      { label: "Email", href: "mailto:hello@recap.com" },
      { label: "Instagram", href: "https://instagram.com" },
      { label: "GitHub", href: "https://github.com" },
    ],
    copyright: `Copyright - ${new Date().getFullYear()} RECAP`,
  },
} as const;
