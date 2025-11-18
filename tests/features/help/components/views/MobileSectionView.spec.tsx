import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { MobileSectionView } from '../../../../../src/presentation/features/help/components/views/MobileSectionView';
import { IHelp } from '../../../../../src/domain/entities/IHelp';

vi.mock('../../../../../src/presentation/features/help/components/content/SectionContent', () => ({
  SectionContent: ({ section }: any) => (
    <div data-testid="section-content">
      {section ? `Section: ${section.title}` : 'No section'}
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
      id: 'hijo-1',
      title: 'Hijo',
      helpTypeId: 2,
      helpType: 'Artículo',
      name: 'Hijo',
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

describe('MobileSectionView - Tests Simples', () => {
  let mockOnBackToMenu: any;

  beforeEach(() => {
    mockOnBackToMenu = vi.fn();
  });

  it('debe renderizar SectionContent', () => {
    const seccion = crearSeccion('1', 'Mi Sección', true);

    render(
      <MobileSectionView
        section={seccion}
        onBackToMenu={mockOnBackToMenu}
      />
    );

    expect(screen.queryByTestId('section-content')).toBeTruthy();
  });

  it('debe renderizar botón de volver', () => {
    const seccion = crearSeccion('1', 'Test', true);

    render(
      <MobileSectionView
        section={seccion}
        onBackToMenu={mockOnBackToMenu}
      />
    );

    expect(screen.queryByText('VOLVER AL MENÚ ANTERIOR')).toBeTruthy();
  });

  it('debe llamar onBackToMenu al hacer click', () => {
    const seccion = crearSeccion('1', 'Test', true);

    render(
      <MobileSectionView
        section={seccion}
        onBackToMenu={mockOnBackToMenu}
      />
    );

    const boton = screen.getByText('VOLVER AL MENÚ ANTERIOR');
    fireEvent.click(boton);

    expect(mockOnBackToMenu).toHaveBeenCalled();
  });

  it('debe mostrar el contenido de la sección', () => {
    const seccion = crearSeccion('1', 'Mi Sección Móvil', true);

    render(
      <MobileSectionView
        section={seccion}
        onBackToMenu={mockOnBackToMenu}
      />
    );

    expect(screen.queryByText('Section: Mi Sección Móvil')).toBeTruthy();
  });

  it('debe mostrar mensaje cuando section es null', () => {
    render(
      <MobileSectionView
        section={null}
        onBackToMenu={mockOnBackToMenu}
      />
    );

    expect(screen.queryByText('No hay artículos o documentos disponibles en esta sección.')).toBeTruthy();
  });

  it('debe mostrar mensaje cuando section es undefined', () => {
    render(
      <MobileSectionView
        section={undefined}
        onBackToMenu={mockOnBackToMenu}
      />
    );

    expect(screen.queryByText('No hay artículos o documentos disponibles en esta sección.')).toBeTruthy();
  });

  it('debe mostrar mensaje cuando no tiene hijos', () => {
    const seccion = crearSeccion('1', 'Sección Vacía', false); // Sin hijos

    render(
      <MobileSectionView
        section={seccion}
        onBackToMenu={mockOnBackToMenu}
      />
    );

    expect(screen.queryByText('No hay artículos o documentos disponibles en esta sección.')).toBeTruthy();
  });

  it('NO debe mostrar mensaje cuando tiene hijos', () => {
    const seccion = crearSeccion('1', 'Sección con Hijos', true); // Con hijos

    render(
      <MobileSectionView
        section={seccion}
        onBackToMenu={mockOnBackToMenu}
      />
    );

    expect(screen.queryByText('No hay artículos o documentos disponibles en esta sección.')).toBeNull();
  });

  it('debe mostrar mensaje con children array vacío', () => {
    const seccion = {
      ...crearSeccion('1', 'Test', false),
      children: [] // Explícitamente vacío
    };

    render(
      <MobileSectionView
        section={seccion}
        onBackToMenu={mockOnBackToMenu}
      />
    );

    expect(screen.queryByText('No hay artículos o documentos disponibles en esta sección.')).toBeTruthy();
  });

  it('debe mostrar botón siempre, incluso sin sección', () => {
    render(
      <MobileSectionView
        section={null}
        onBackToMenu={mockOnBackToMenu}
      />
    );

    expect(screen.queryByText('VOLVER AL MENÚ ANTERIOR')).toBeTruthy();
  });

  it('debe pasar la sección correcta a SectionContent', () => {
    const seccion1 = crearSeccion('1', 'Primera Sección', true);
    const seccion2 = crearSeccion('2', 'Segunda Sección', true);

    const { rerender } = render(
      <MobileSectionView
        section={seccion1}
        onBackToMenu={mockOnBackToMenu}
      />
    );

    expect(screen.queryByText('Section: Primera Sección')).toBeTruthy();

    rerender(
      <MobileSectionView
        section={seccion2}
        onBackToMenu={mockOnBackToMenu}
      />
    );

    expect(screen.queryByText('Section: Segunda Sección')).toBeTruthy();
  });

});