import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Host from "./host.astro";

/**
 * Render an Astro block component to an HTML string via the Astro Container API.
 *
 * The component is rendered through a host wrapper so that block components
 * which `return null` behave as they do inside `blocks-renderer.astro`.
 */
export async function renderComponent(
  // biome-ignore lint/suspicious/noExplicitAny: accepts any Astro component
  Component: any,
  props: Record<string, unknown> = {}
): Promise<string> {
  const container = await AstroContainer.create();
  const html = await container.renderToString(Host, { props: { component: Component, props } });
  return stripDevAttributes(html);
}

/** Astro injects source-map attributes in dev; they are noise for assertions. */
function stripDevAttributes(html: string): string {
  return html.replace(/\s+data-astro-source-(file|loc)="[^"]*"/g, "");
}

/** Collapse whitespace so assertions are not coupled to template indentation. */
export function normalize(html: string): string {
  return html.replace(/\s+/g, " ").trim();
}

/** Strip all tags so assertions can target rendered text (e.g. Shiki token spans). */
export function textContent(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}
