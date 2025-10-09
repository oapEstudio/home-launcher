import { ArrowRightIcon } from "@mui/x-date-pickers";
import type { NavItem } from "./types";

export function MenuList({
  items,
  level,
  onLeaf,
  onOpenChildren,
}: {
  items: NavItem[];
  level: number;
  onLeaf: (href?: string) => void;
  onOpenChildren: (item: NavItem, li: HTMLLIElement, level: number) => void;
}) {
  return (
    <ul className="menu-list" role="menu">
      {items.map((it) => {
        const hasChildren = !!it.items?.length;
        return (
          <li
            key={it.id}
            className="menu-item"
            role="menuitem"
            tabIndex={0}
            onClick={(e) => {
              const li = e.currentTarget as HTMLLIElement;
              hasChildren ? onOpenChildren(it, li, level) : onLeaf(it.href);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                hasChildren ? onOpenChildren(it, e.currentTarget as HTMLLIElement, level) : onLeaf(it.href);
              }
            }}
          >
            <span className="label">{it.label}</span>
            {hasChildren && (
              <span className="chevron" aria-hidden="true">
                <ArrowRightIcon />
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
