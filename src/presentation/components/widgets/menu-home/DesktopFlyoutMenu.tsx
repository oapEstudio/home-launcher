
import type { NavItem } from "./types";
import { MenuList } from "./MenuList";
import { useState } from "react";

type Fly = { level: number; top: number; items: NavItem[]; parentId: string };

export function DesktopFlyoutMenu({ data, onClose }: { data: NavItem[]; onClose: () => void }) {
  const [flyouts, setFlyouts] = useState<Fly[]>([]);

  const onLeaf = (href?: string) => {
    if (!href) return;
    window.open(href, "_blank", "noopener,noreferrer"); // abre en nueva pestaña
    onClose();
  };

  const onOpenChildren = (item: NavItem, li: HTMLLIElement, level: number) => {
    setFlyouts((prev) => {
      const same = prev.find((f) => f.level === level && f.parentId === item.id);
      if (same) return prev.filter((f) => f.level < level); 
      const next = prev.filter((f) => f.level < level);
      next.push({ level, top: li.offsetTop, items: item.items || [], parentId: item.id });
      return next;
    });
  };

  const Chain: React.FC<{ chain: Fly[] }> = ({ chain }) => {
    if (!chain.length) return null;
    const [head, ...rest] = chain;
    return (
      <div className="submenu-panel show" data-top="" style={{ ["--top" as any]: `${head.top}px` } as React.CSSProperties}>
        <div className="menu-panel">
          <MenuList items={head.items} level={head.level + 1} onLeaf={onLeaf} onOpenChildren={onOpenChildren} />
        </div>
        <Chain chain={rest} />
      </div>
    );
  };

  return (
    <div className="flyout-host menu-panel">
      <MenuList items={data} level={0} onLeaf={onLeaf} onOpenChildren={onOpenChildren} />
      <Chain chain={flyouts} />
    </div>
  );
}
