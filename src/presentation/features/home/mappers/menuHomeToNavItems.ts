import type { IMenuHome } from "../../../../domain/entities/IMenuHome";
import type { NavItem } from "../../../components/widgets/menu-home/types";

const byOrder = (a: IMenuHome, b: IMenuHome) =>
  (a.orderIndex ?? 0) - (b.orderIndex ?? 0);

export function mapMenuNode(node: IMenuHome): NavItem {
  const href = node.hasLink && node.link ? node.link : undefined;
  const children = (node.children ?? []).slice().sort(byOrder);

  const mapped: NavItem = {
    id: node.id,
    label: node.name,
    ...(href && { href }),
  };

  if (children.length) {
    mapped.items = children.map(mapMenuNode);
  }
  return mapped;
}

export function mapMenuToNavItems(data: IMenuHome | IMenuHome[]): NavItem[] {
  if (Array.isArray(data)) {
    return data.slice().sort(byOrder).map(mapMenuNode);
  }
  return [mapMenuNode(data)];
}