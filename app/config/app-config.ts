import { routeConfig } from "./route-config";

export const socialConfig = {
  email: { label: "Email", href: "mailto:hello@email.com" },
  instagram: { label: "Instagram", href: "https://instagram.com" },
  github: { label: "GitHub", href: "https://github.com" },
};

export const appConfig = {
  serviceName: "Midquel",
  serviceDisplayName: "Midquel©",
  serviceDescription:
    "A space to look, slowly and deeply.",
  serviceUrl: "https://recap.com",
  bannerImage:
    "https://framerusercontent.com/images/mUkxezOznrwDZY5wiJqPMLwCVSI.jpg?width=3888&height=5184",
  logoAlt: "Service Logo",
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
    links: [socialConfig.email, socialConfig.instagram, socialConfig.github],
    copyright: `Copyright - ${new Date().getFullYear()} Midquel`,
  },
} as const;
