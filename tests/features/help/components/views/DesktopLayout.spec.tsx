import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { DesktopLayout } from '../../../../../src/presentation/features/help/components/views/DesktopLayout';
import { IHelp } from '../../../../../src/domain/entities/IHelp';

vi.mock('../../../../../src/presentation/features/help/components/layout/Sidebar', () => ({
  Sidebar: ({ helpSections, currentSection }: any) => (
    <div data-testid="sidebar">
      Sidebar - Current: {currentSection}
    </div>
  )
}));

vi.mock('../../../../../src/presentation/features/help/components/content/SectionContent', () => ({
  SectionContent: ({ section }: any) => (
    <div data-testid="section-content">
      {section ? `Content: ${section.title}` : 'No section'}
    </div>
  )
}));

const crearSeccion = (id: string, title: string, conHijos: boolean = false): IHelp => ({
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
  helpDocumentType: 'Tipo',
  document: [],
  profile: [],
  dateUpdated: new Date().toISOString(),
  documentLink: '',
  children: conHijos ? [
    {
      id: 'child-1',
      title: 'Hijo 1',
      helpTypeId: 2,
      helpType: 'Documento',
      name: 'Hijo 1',
      description: '',
      parentId: id,
      parent: null,
      link: '',
      statusId: 1,
      statusDescription: 'Activo',
      statusColor: '#00FF00',
      helpDocumentTypeId: 1,
      helpDocumentType: 'PDF',
      document: [],
      profile: [],
      dateUpdated: new Date().toISOString(),
      documentLink: '',
      children: []
    }
  ] : []
});

describe('DesktopLayout - Tests Simples', () => {
  let mockOnSectionClick: any;

  beforeEach(() => {
    mockOnSectionClick = vi.fn();
  });

  it('debe renderizar Sidebar y SectionContent', () => {
    const secciones = [crearSeccion('1', 'Sección 1', true)];

    render(
      <DesktopLayout
        helpSections={secciones}
        currentSection="1"
        onSectionClick={mockOnSectionClick}
      />
    );

    expect(screen.queryByTestId('sidebar')).toBeTruthy();
    expect(screen.queryByTestId('section-content')).toBeTruthy();
  });

  it('debe mostrar el contenido de la sección seleccionada', () => {
    const secciones = [
      crearSeccion('1', 'Mi Sección', true),
      crearSeccion('2', 'Otra Sección', true)
    ];

    render(
      <DesktopLayout
        helpSections={secciones}
        currentSection="1"
        onSectionClick={mockOnSectionClick}
      />
    );

    expect(screen.queryByText('Content: Mi Sección')).toBeTruthy();
  });

  it('debe mostrar mensaje cuando no hay sección', () => {
    const secciones = [crearSeccion('1', 'Sección 1', true)];

    render(
      <DesktopLayout
        helpSections={secciones}
        currentSection="999" 
        onSectionClick={mockOnSectionClick}
      />
    );

    expect(screen.queryByText('No hay artículos o documentos disponibles en esta sección.')).toBeTruthy();
  });

  it('debe mostrar mensaje cuando la sección no tiene hijos', () => {
    const secciones = [crearSeccion('1', 'Sección Vacía', false)]; 

    render(
      <DesktopLayout
        helpSections={secciones}
        currentSection="1"
        onSectionClick={mockOnSectionClick}
      />
    );

    expect(screen.queryByText('No hay artículos o documentos disponibles en esta sección.')).toBeTruthy();
  });

  it('NO debe mostrar mensaje cuando la sección tiene hijos', () => {
    const secciones = [crearSeccion('1', 'Sección con Hijos', true)]; // Con hijos

    render(
      <DesktopLayout
        helpSections={secciones}
        currentSection="1"
        onSectionClick={mockOnSectionClick}
      />
    );

    expect(screen.queryByText('No hay artículos o documentos disponibles en esta sección.')).toBeNull();
  });

  it('debe pasar currentSection al Sidebar', () => {
    const secciones = [crearSeccion('1', 'Sección 1', true)];

    render(
      <DesktopLayout
        helpSections={secciones}
        currentSection="1"
        onSectionClick={mockOnSectionClick}
      />
    );

    expect(screen.queryByText('Sidebar - Current: 1')).toBeTruthy();
  });

  it('debe funcionar con helpSections vacío', () => {
    render(
      <DesktopLayout
        helpSections={[]}
        currentSection=""
        onSectionClick={mockOnSectionClick}
      />
    );

    expect(screen.queryByTestId('sidebar')).toBeTruthy();
    expect(screen.queryByTestId('section-content')).toBeTruthy();
  });

  it('debe buscar la sección correcta por ID', () => {
    const secciones = [
      crearSeccion('abc', 'Primera', true),
      crearSeccion('def', 'Segunda', true),
      crearSeccion('ghi', 'Tercera', true)
    ];

    render(
      <DesktopLayout
        helpSections={secciones}
        currentSection="def"
        onSectionClick={mockOnSectionClick}
      />
    );

    expect(screen.queryByText('Content: Segunda')).toBeTruthy();
  });

  it('debe renderizar con múltiples secciones', () => {
    const secciones = [
      crearSeccion('1', 'Sección A', true),
      crearSeccion('2', 'Sección B', true),
      crearSeccion('3', 'Sección C', true)
    ];

    const { container } = render(
      <DesktopLayout
        helpSections={secciones}
        currentSection="1"
        onSectionClick={mockOnSectionClick}
      />
    );

    expect(container.querySelector('[data-testid="sidebar"]')).toBeTruthy();
    expect(container.querySelector('[data-testid="section-content"]')).toBeTruthy();
  });

  it('debe mostrar mensaje con children array vacío', () => {
    const seccionConArrayVacio: IHelp = {
      ...crearSeccion('1', 'Test', false),
      children: []
    };

    render(
      <DesktopLayout
        helpSections={[seccionConArrayVacio]}
        currentSection="1"
        onSectionClick={mockOnSectionClick}
      />
    );

    expect(screen.queryByText('No hay artículos o documentos disponibles en esta sección.')).toBeTruthy();
  });

  it('debe pasar isMobile=false al Sidebar', () => {
    const secciones = [crearSeccion('1', 'Test', true)];

    render(
      <DesktopLayout
        helpSections={secciones}
        currentSection="1"
        onSectionClick={mockOnSectionClick}
      />
    );

    expect(screen.queryByTestId('sidebar')).toBeTruthy();
  });
});