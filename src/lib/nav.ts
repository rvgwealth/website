export type NavLink = {
  label: string;
  href: string;
};

// Single source of truth for primary navigation order.
export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Membership", href: "/membership" },
  { label: "Contact", href: "/contact" },
];

export const primaryCta = {
  label: "Attend Free Webinar",
  href: "/webinar",
};
