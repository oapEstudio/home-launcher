import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { HelpPage } from '../../../src/presentation/features/help/HelpPage';
import { BrowserRouter } from 'react-router-dom';
import { IHelp } from '../../../src/domain/entities/IHelp';

vi.mock('../../../src/presentation/features/help/components/views/DesktopLayout', () => ({
  DesktopLayout: () => <div>Desktop Layout</div>
}));

vi.mock('../../../src/presentation/features/help/components/views/MobileMenuView', () => ({
  MobileMenuView: () => <div>Mobile Menu View</div>
}));

vi.mock('../../../src/presentation/features/help/components/views/MobileSectionView', () => ({
  MobileSectionView: () => <div>Mobile Section View</div>
}));

vi.mock('../../../src/presentation/features/help/components/common/Breadcrumbs', () => ({
  Breadcrumbs: () => <div>Breadcrumbs</div>
}));

// Mock de los hooks personalizados
vi.mock('../../../src/presentation/features/help/hooks/useResponsive', () => ({
  useResponsive: vi.fn()
}));

vi.mock('../../../src/presentation/features/help/hooks/useGetHelp', () => ({
  useGetHelp: vi.fn()
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn()
  };
});

import { useResponsive } from '../../../src/presentation/features/help/hooks/useResponsive';
import { useGetHelp } from '../../../src/presentation/features/help/hooks/useGetHelp';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

const createMockSection = (id: string, title: string): IHelp => ({
  id,
  helpTypeId: 1,
  helpType: 'Tipo 1',
  name: `Section ${id}`,
  title,
  description: `Descripción de ${title}`,
  parentId: null,
  parent: null,
  link: `/help/${id}`,
  statusId: 1,
  statusDescription: 'Activo',
  statusColor: '#00FF00',
  helpDocumentTypeId: 1,
  helpDocumentType: 'Documento',
  document: [],
  profile: [],
  dateUpdated: new Date().toISOString(),
  documentLink: '',
  children: []
});

describe('HelpPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe renderizar el título correctamente', () => {
    vi.mocked(useResponsive).mockReturnValue({ 
      isMobile: false,
      isTablet: false,
      isDesktop: true
    });
    vi.mocked(useGetHelp).mockReturnValue({
      result: { data: [] },
      loading: false
    } as any);

    renderWithRouter(<HelpPage />);

    expect(screen.getByText('Mesa de ayuda')).toBeTruthy();
    expect(screen.getByText('Encontrá acá todos los recursos de ayuda disponibles')).toBeTruthy();
  });

  it('debe mostrar skeleton mientras está cargando', () => {
    vi.mocked(useResponsive).mockReturnValue({ 
      isMobile: false,
      isTablet: false,
      isDesktop: true
    });
    vi.mocked(useGetHelp).mockReturnValue({
      result: null,
      loading: true
    } as any);

    renderWithRouter(<HelpPage />);

    const skeletons = document.querySelectorAll('.MuiSkeleton-root');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('debe mostrar mensaje cuando no hay secciones disponibles', () => {
    vi.mocked(useResponsive).mockReturnValue({ 
      isMobile: false,
      isTablet: false,
      isDesktop: true
    });
    vi.mocked(useGetHelp).mockReturnValue({
      result: { data: [] },
      loading: false
    } as any);

    renderWithRouter(<HelpPage />);

    expect(screen.getByText('No hay secciones disponibles')).toBeTruthy();
    expect(screen.getByText(/En este momento no tenemos contenido de ayuda disponible/)).toBeTruthy();
    expect(screen.getByText('Regresar al Inicio')).toBeTruthy();
  });

  it('debe renderizar secciones en modo desktop', () => {
    const mockSections: IHelp[] = [
      createMockSection('1', 'Sección 1'),
      createMockSection('2', 'Sección 2')
    ];

    vi.mocked(useResponsive).mockReturnValue({ 
      isMobile: false,
      isTablet: false,
      isDesktop: true
    });
    vi.mocked(useGetHelp).mockReturnValue({
      result: { data: mockSections },
      loading: false
    } as any);

    renderWithRouter(<HelpPage />);

    expect(screen.queryByText('No hay secciones disponibles')).toBeNull();
    expect(screen.getByText('Desktop Layout')).toBeTruthy();
  });

  it('debe renderizar vista mobile menu cuando isMobile es true', () => {
    const mockSections: IHelp[] = [
      createMockSection('1', 'Sección 1')
    ];

    vi.mocked(useResponsive).mockReturnValue({ 
      isMobile: true,
      isTablet: false,
      isDesktop: false
    });
    vi.mocked(useGetHelp).mockReturnValue({
      result: { data: mockSections },
      loading: false
    } as any);

    renderWithRouter(<HelpPage />);

    expect(screen.queryByText('No hay secciones disponibles')).toBeNull();
    expect(screen.getByText('Mobile Menu View')).toBeTruthy();
  });

  it('debe manejar data null correctamente', () => {
    vi.mocked(useResponsive).mockReturnValue({ 
      isMobile: false,
      isTablet: false,
      isDesktop: true
    });
    vi.mocked(useGetHelp).mockReturnValue({
      result: null,
      loading: false
    } as any);

    renderWithRouter(<HelpPage />);

    expect(screen.getByText('No hay secciones disponibles')).toBeTruthy();
  });

  it('debe manejar data undefined correctamente', () => {
    vi.mocked(useResponsive).mockReturnValue({ 
      isMobile: false,
      isTablet: false,
      isDesktop: true
    });
    vi.mocked(useGetHelp).mockReturnValue({
      result: { data: undefined },
      loading: false
    } as any);

    renderWithRouter(<HelpPage />);

    expect(screen.getByText('No hay secciones disponibles')).toBeTruthy();
  });
});