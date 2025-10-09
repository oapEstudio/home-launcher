
import type { NavItem } from "./types";
import { MenuList } from "./MenuList";

import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "../../ui/icons";

export function MobileStackMenu({ data, onClose }: { data: NavItem[]; onClose: () => void }) {
  const [stack, setStack] = useState<NavItem[][]>([data]);

  const onLeaf = (href?: string) => {
    if (!href) return;
    window.open(href, "_blank", "noopener,noreferrer"); // abre en nueva pestaña
    onClose();
  };
  const onOpenChildren = (item: NavItem) => setStack((s) => [...s, item.items || []]);
  const back = () => setStack((s) => (s.length > 1 ? s.slice(0, s.length - 1) : s));

  return (
    <div className="stack-strip" style={{ transform: `translateX(${(stack.length - 1) * -100}%)` }}>
      {stack.map((items, idx) => (
        <section className="menu-panel" key={idx}>
          {idx > 0 && (
            <div className="back-row" tabIndex={0} role="button" onClick={back} onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") { e.preventDefault(); back(); }
            }}>
              <span className="chevron"><ArrowRightIcon /></span>
              <span className="label">Volver</span>
            </div>
          )}
          <MenuList
            items={items}
            level={idx}
            onLeaf={onLeaf}
            onOpenChildren={(it, _li) => onOpenChildren(it)}
          />
        </section>
      ))}
    </div>
  );
}
