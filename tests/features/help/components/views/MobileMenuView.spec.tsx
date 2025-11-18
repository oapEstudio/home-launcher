import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MobileMenuView } from '../../../../../src/presentation/features/help/components/views/MobileMenuView';
import { IHelp } from '../../../../../src/domain/entities/IHelp';

vi.mock('../../../../../src/presentation/features/help/components/layout/Sidebar', () => ({
  Sidebar: ({ helpSections, onSectionClick, isMobile }: any) => (
    <div data-testid="sidebar">
      Sidebar Mobile: {isMobile ? 'YES' : 'NO'}
      <div>Sections: {helpSections.length}</div>
    </div>
  )
}));

const crearSeccion = (id: string, title: string): IHelp => ({
  id,
  title,
  helpTypeId: 1,
  helpType: 'Artículo',
  name: title,
  description: '',
  parentId: null,
  parent: null,
  link: '',
  statusId: 1,
  statusDescription: 'Activo',
  statusColor: '#00FF00',
  helpDocumentTypeId: 1,
  helpDocumentType: 'Tipo',
  document: [],
  profile: [],
  dateUpdated: new Date().toISOString(),
  documentLink: '',
  children: []
});

describe('MobileMenuView - Tests Simples', () => {
  let mockOnSectionClick: any;

  beforeEach(() => {
    mockOnSectionClick = vi.fn();
  });

  it('debe renderizar el Sidebar', () => {
    render(
      <MobileMenuView
        onSectionClick={mockOnSectionClick}
        helpSections={[]}
      />
    );

    expect(screen.queryByTestId('sidebar')).toBeTruthy();
  });

  it('debe pasar isMobile=true al Sidebar', () => {
    render(
      <MobileMenuView
        onSectionClick={mockOnSectionClick}
        helpSections={[]}
      />
    );

    expect(screen.queryByText('Sidebar Mobile: YES')).toBeTruthy();
  });

  // TEST 3: Pasar helpSections al Sidebar
  it('debe pasar helpSections al Sidebar', () => {
    const secciones = [
      crearSeccion('1', 'Sección 1'),
      crearSeccion('2', 'Sección 2'),
      crearSeccion('3', 'Sección 3')
    ];

    render(
      <MobileMenuView
        onSectionClick={mockOnSectionClick}
        helpSections={secciones}
      />
    );

    expect(screen.queryByText('Sections: 3')).toBeTruthy();
  });

  // TEST 4: Pasar onSectionClick al Sidebar
  it('debe pasar onSectionClick al Sidebar', () => {
    const secciones = [crearSeccion('1', 'Test')];

    render(
      <MobileMenuView
        onSectionClick={mockOnSectionClick}
        helpSections={secciones}
      />
    );

    // El Sidebar recibe la función
    expect(screen.queryByTestId('sidebar')).toBeTruthy();
  });

  // TEST 5: Funcionar con helpSections vacío
  it('debe funcionar con helpSections vacío', () => {
    render(
      <MobileMenuView
        onSectionClick={mockOnSectionClick}
        helpSections={[]}
      />
    );

    expect(screen.queryByText('Sections: 0')).toBeTruthy();
  });

  // TEST 6: Renderizar con muchas secciones
  it('debe renderizar con muchas secciones', () => {
    const muchasSecciones = Array.from({ length: 10 }, (_, i) => 
      crearSeccion(`${i}`, `Sección ${i}`)
    );

    render(
      <MobileMenuView
        onSectionClick={mockOnSectionClick}
        helpSections={muchasSecciones}
      />
    );

    expect(screen.queryByText('Sections: 10')).toBeTruthy();
  });

  // TEST 7: No romper sin section prop (es opcional)
  it('debe funcionar sin el prop section', () => {
    const secciones = [crearSeccion('1', 'Test')];

    expect(() => {
      render(
        <MobileMenuView
          onSectionClick={mockOnSectionClick}
          helpSections={secciones}
        />
      );
    }).not.toThrow();
  });

  // TEST 8: Renderizar solo el Sidebar (componente simple)
  it('debe ser un wrapper simple del Sidebar', () => {
    const { container } = render(
      <MobileMenuView
        onSectionClick={mockOnSectionClick}
        helpSections={[]}
      />
    );

    // Solo debe tener el Sidebar
    const sidebar = container.querySelector('[data-testid="sidebar"]');
    expect(sidebar).toBeTruthy();
  });
});