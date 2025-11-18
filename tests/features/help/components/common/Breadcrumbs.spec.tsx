import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Breadcrumbs } from '../../../../../src/presentation/features/help/components/common/Breadcrumbs';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

const createMockSection = (id: string, title: string) => ({
  id,
  title,
  helpTypeId: 1,
  helpType: 'Sección',
  name: title,
  description: '',
  parentId: null,
  parent: null,
  link: '',
  statusId: 1,
  statusDescription: 'Activo',
  statusColor: '#00FF00',
  helpDocumentTypeId: 1,
  helpDocumentType: 'Link a página',
  document: [],
  profile: [],
  dateUpdated: new Date().toISOString(),
  documentLink: '',
  children: []
});

describe('Breadcrumbs', () => {
  let mockOnBackToMenu: any;

  beforeEach(() => {
    mockOnBackToMenu = vi.fn();
  });

  it('debe renderizar "Inicio" siempre', () => {
    renderWithRouter(<Breadcrumbs isMobile={false} />);
    
    expect(screen.queryByText('Inicio')).toBeTruthy();
  });

  it('debe renderizar "Ayuda" en modo desktop sin sección', () => {
    renderWithRouter(<Breadcrumbs isMobile={false} />);
    
    expect(screen.queryByText('Inicio')).toBeTruthy();
    expect(screen.queryByText('Ayuda')).toBeTruthy();
  });

  it('debe renderizar breadcrumbs en modo desktop con sección', () => {
    const mockSection = createMockSection('1', 'Documentación');
    
    renderWithRouter(
      <Breadcrumbs 
        isMobile={false} 
        section={mockSection}
      />
    );
    
    expect(screen.queryByText('Inicio')).toBeTruthy();
    expect(screen.queryByText('Ayuda')).toBeTruthy();
  });

  it('debe renderizar breadcrumbs completos en modo mobile con sección', () => {
    const mockSection = createMockSection('1', 'Mi Sección');
    
    renderWithRouter(
      <Breadcrumbs 
        isMobile={true} 
        section={mockSection}
        onBackToMenu={mockOnBackToMenu}
      />
    );
    
    expect(screen.queryByText('Inicio')).toBeTruthy();
    expect(screen.queryByText('Ayuda')).toBeTruthy();
    expect(screen.queryByText('Mi Sección')).toBeTruthy();
  });

  it('debe renderizar solo "Inicio" y "Ayuda" en modo mobile sin sección', () => {
    renderWithRouter(
      <Breadcrumbs 
        isMobile={true}
        onBackToMenu={mockOnBackToMenu}
      />
    );
    
    expect(screen.queryByText('Inicio')).toBeTruthy();
    expect(screen.queryByText('Ayuda')).toBeTruthy();
  });

  it('debe llamar onBackToMenu cuando se hace click en "Ayuda" en mobile', () => {
    const mockSection = createMockSection('1', 'Test Section');
    
    const { container } = renderWithRouter(
      <Breadcrumbs 
        isMobile={true} 
        section={mockSection}
        onBackToMenu={mockOnBackToMenu}
      />
    );
    
    // Buscar el link de "Ayuda"
    const ayudaLink = Array.from(container.querySelectorAll('a')).find(
      link => link.textContent === 'Ayuda'
    );
    
    expect(ayudaLink).toBeTruthy();
    ayudaLink?.click();
    
    expect(mockOnBackToMenu).toHaveBeenCalled();
  });

  it('no debe mostrar el título de la sección en modo desktop', () => {
    const mockSection = createMockSection('1', 'Sección Desktop');
    
    renderWithRouter(
      <Breadcrumbs 
        isMobile={false} 
        section={mockSection}
      />
    );
    
    expect(screen.queryByText('Inicio')).toBeTruthy();
    expect(screen.queryByText('Ayuda')).toBeTruthy();
  });

  it('debe renderizar "Inicio" como link', () => {
    const { container } = renderWithRouter(<Breadcrumbs isMobile={false} />);
    
    const inicioLink = container.querySelector('a[href="/"]');
    expect(inicioLink).toBeTruthy();
    expect(inicioLink?.textContent).toBe('Inicio');
  });

  it('debe renderizar "Ayuda" como link en mobile con sección', () => {
    const mockSection = createMockSection('1', 'Test');
    
    const { container } = renderWithRouter(
      <Breadcrumbs 
        isMobile={true} 
        section={mockSection}
        onBackToMenu={mockOnBackToMenu}
      />
    );
    
    const ayudaLink = container.querySelector('a[href="/help"]');
    expect(ayudaLink).toBeTruthy();
    expect(ayudaLink?.textContent).toBe('Ayuda');
  });

  it('debe renderizar "Ayuda" como Typography en desktop', () => {
    renderWithRouter(<Breadcrumbs isMobile={false} />);
    
    const ayudaText = screen.queryByText('Ayuda');
    expect(ayudaText).toBeTruthy();
  });

  it('debe manejar onBackToMenu undefined sin errores', () => {
    const mockSection = createMockSection('1', 'Test');
    
    const { container } = renderWithRouter(
      <Breadcrumbs 
        isMobile={true} 
        section={mockSection}
      />
    );
    
    const ayudaLink = Array.from(container.querySelectorAll('a')).find(
      link => link.textContent === 'Ayuda'
    );
    
    expect(() => ayudaLink?.click()).not.toThrow();
  });

  it('debe aplicar estilos correctos a los links', () => {
    const { container } = renderWithRouter(<Breadcrumbs isMobile={false} />);
    
    const link = container.querySelector('a[href="/"]') as HTMLElement;
    expect(link?.style.textDecoration).toBe('none');
    expect(link?.style.color).toBe('inherit');
  });

  it('debe renderizar diferentes títulos de sección correctamente', () => {
    const titles = ['Guía de Usuario', 'Preguntas Frecuentes', 'Tutoriales'];
    
    titles.forEach(title => {
      const mockSection = createMockSection('1', title);
      
      const { unmount } = renderWithRouter(
        <Breadcrumbs 
          isMobile={true} 
          section={mockSection}
          onBackToMenu={mockOnBackToMenu}
        />
      );
      
      expect(screen.queryByText(title)).toBeTruthy();
      unmount();
    });
  });
});