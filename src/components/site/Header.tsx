import { buildNavData } from "@/lib/nav";
import { searchCategoryNames } from "@/lib/search";
import { HeaderClient } from "./HeaderClient";

/**
 * Server boundary for the header. Navigation data is derived here and passed
 * down as plain props so the client bundle never imports the prompt registry.
 */
export function Header() {
  const nav = buildNavData();
  return <HeaderClient {...nav} categoryNames={searchCategoryNames} />;
}
