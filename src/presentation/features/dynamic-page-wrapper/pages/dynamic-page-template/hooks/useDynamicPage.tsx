import { useEffect, useMemo, useState } from "react";
import type { IDynamicPage } from "../../../../../../domain/entities/IDynamicPage";
import { ID_SECTION_ITEM_MENU } from "../../../shared/constants/constants";
import type { ISectionPage } from "../components/section-page/SectionPage";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetDynamicPageByTitle } from "../../../hooks/useGetDynamicPageByTitle";
import { eTypeElement, type IElementDynamicPage } from "../components/element-dynamic-page/ElementDynamicPage";
import { urlOrDataUrlToFile } from "../../../../../utils/urlToFile";

export function useDynamicPage(init?: IDynamicPage){
  const { fetchById, loading } = useGetDynamicPageByTitle();
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const [pagesProps, setPagesProps] = useState<ISectionPage[]>([{
    elements: [],
    id: ID_SECTION_ITEM_MENU.toString(),
    backgroundColor: '',
    order: 0
  }]);
  const [hasMenu, setHasMenu] = useState<boolean>(true);
  const { title, mode } = useParams<{ title: string, mode: string }>();
  const pageTitle = useMemo(() => (title ? title : undefined), [title]);
  const [isRedirecting, setIsRedirecting] = useState(false);


  useEffect(() => {
    if (!pageTitle) return; 
    
    setIsRedirecting(false); 

    (async () => {
      try {
        const pageById = await fetchById(pageTitle);
        
        const menuExists = pageById.hasMenu;
        setHasMenu(menuExists);
        
        // Redirigir según tenga menú o no
        const currentPath = location.pathname;
        
        if (menuExists && currentPath.startsWith('/pages-with-menu/')) {
          setIsRedirecting(true); 
          navigate(`/pages/${pageTitle}`, { replace: true });
          return; 
        } 
        // Si NO TIENE menú y está en ruta CON menú → redirigir a ruta SIN menú
        else if (!menuExists && currentPath.startsWith('/pages/')) {
          setIsRedirecting(true); 
          navigate(`/pages-with-menu/${pageTitle}`, { replace: true });
          return; 
        }
        
        setPagesProps(() => {
          const MENU_ID = ID_SECTION_ITEM_MENU.toString();
          const menuElements: IElementDynamicPage[] = [];
          const normalSections: ISectionPage[] = [];
          
          for (const s of pageById.sections) {
            const mapped = (s.elements ?? []).map((e: any): IElementDynamicPage => {
              const type = e.type?.toString() as eTypeElement;              
              const file = e.fileUrl ? urlOrDataUrlToFile(e.fileUrl) : null;
              return {
                ...e,
                id: String(e.id),
                type,
                file, 
              };
            });
            
            const sectionMenuElems = mapped.filter(el => el.type === eTypeElement.ITEM_MENU);
            const sectionOtherElems = mapped.filter(el => el.type !== eTypeElement.ITEM_MENU);
            
            if (sectionMenuElems.length) menuElements.push(...sectionMenuElems);
            
            if (sectionOtherElems.length) {
              normalSections.push({
                id: String(s.id),
                order: s.order,
                backgroundColor: s.backgroundColor ?? '',
                elements: sectionOtherElems,
              });
            }
          }
          
          const menuSection: ISectionPage = {
            id: MENU_ID,
            order: 0,
            backgroundColor: '',
            elements: menuElements,
          };
          
          return [menuSection, ...normalSections];
        });
      } catch (e: any) {
        const is404Error = 
          e?.response?.status === 404 || 
          e?.message?.includes('404') || 
          e?.message?.toLowerCase().includes('not found') ||
          e?.message?.toLowerCase().includes('no se encontró') ||
          e?.message?.toLowerCase().includes('recurso solicitado');
          
        if (is404Error) {
          setIsRedirecting(true); 
          navigate('/404', { replace: true });
        }
      }
    })();
  }, [pageTitle, fetchById, navigate, location]);
  
  return {
    hasMenu,
    pagesProps,
    loading: loading || isRedirecting, 
    isRedirecting
  }
}