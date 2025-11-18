import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Sidebar } from '../../../../../src/presentation/features/help/components/layout/Sidebar';
import { IHelp } from '../../../../../src/domain/entities/IHelp';

// Helper para crear secciones falsas
const crearSeccion = (id: string, title: string): IHelp => ({
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

describe('Sidebar - Tests Simples', () => {
  let mockOnSectionClick: any;
  let mockOnClose: any;

  beforeEach(() => {
    // Creamos funciones mock antes de cada test
    mockOnSectionClick = vi.fn();
    mockOnClose = vi.fn();
  });

  // TEST 1: Renderizar el título "ÍNDICE"
  it('debe mostrar el título ÍNDICE', () => {
    render(
      <Sidebar
        helpSections={[]}
        onSectionClick={mockOnSectionClick}
        isMobile={false}
      />
    );

    expect(screen.queryByText('ÍNDICE')).toBeTruthy();
  });

  // TEST 2: Mostrar lista de secciones
  it('debe mostrar todas las secciones', () => {
    const secciones = [
      crearSeccion('1', 'Sección 1'),
      crearSeccion('2', 'Sección 2'),
      crearSeccion('3', 'Sección 3')
    ];

    render(
      <Sidebar
        helpSections={secciones}
        onSectionClick={mockOnSectionClick}
        isMobile={false}
      />
    );

    expect(screen.queryByText('Sección 1')).toBeTruthy();
    expect(screen.queryByText('Sección 2')).toBeTruthy();
    expect(screen.queryByText('Sección 3')).toBeTruthy();
  });

  // TEST 3: Llamar onSectionClick cuando haces click
  it('debe llamar onSectionClick al hacer click en una sección', () => {
    const secciones = [crearSeccion('1', 'Mi Sección')];

    render(
      <Sidebar
        helpSections={secciones}
        onSectionClick={mockOnSectionClick}
        isMobile={false}
      />
    );

    const seccionButton = screen.getByText('Mi Sección');
    fireEvent.click(seccionButton);

    expect(mockOnSectionClick).toHaveBeenCalledWith('1');
  });

  // TEST 4: Llamar onClose en mobile al hacer click
  it('debe llamar onClose en mobile cuando haces click', () => {
    const secciones = [crearSeccion('1', 'Sección Mobile')];

    render(
      <Sidebar
        helpSections={secciones}
        onSectionClick={mockOnSectionClick}
        isMobile={true}
        onClose={mockOnClose}
      />
    );

    const seccionButton = screen.getByText('Sección Mobile');
    fireEvent.click(seccionButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  // TEST 5: No llamar onClose en desktop
  it('NO debe llamar onClose en desktop', () => {
    const secciones = [crearSeccion('1', 'Sección Desktop')];

    render(
      <Sidebar
        helpSections={secciones}
        onSectionClick={mockOnSectionClick}
        isMobile={false}
        onClose={mockOnClose}
      />
    );

    const seccionButton = screen.getByText('Sección Desktop');
    fireEvent.click(seccionButton);

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  // TEST 6: Marcar la sección actual como seleccionada
  it('debe marcar la sección actual', () => {
    const secciones = [
      crearSeccion('1', 'Sección A'),
      crearSeccion('2', 'Sección B')
    ];

    const { container } = render(
      <Sidebar
        helpSections={secciones}
        currentSection="1"
        onSectionClick={mockOnSectionClick}
        isMobile={false}
      />
    );

    // Buscamos el botón seleccionado
    const selectedButton = container.querySelector('.Mui-selected');
    expect(selectedButton).toBeTruthy();
    expect(selectedButton?.textContent).toContain('Sección A');
  });

  // TEST 7: Renderizar sin secciones
  it('debe renderizar sin secciones', () => {
    render(
      <Sidebar
        helpSections={[]}
        onSectionClick={mockOnSectionClick}
        isMobile={false}
      />
    );

    expect(screen.queryByText('ÍNDICE')).toBeTruthy();
    // No debe haber botones de sección
    const { container } = render(
      <Sidebar
        helpSections={[]}
        onSectionClick={mockOnSectionClick}
        isMobile={false}
      />
    );
    
    const listItems = container.querySelectorAll('.MuiListItemButton-root');
    expect(listItems.length).toBe(0);
  });

  // TEST 8: Manejar onClose undefined sin errores
  it('debe manejar onClose undefined sin errores', () => {
    const secciones = [crearSeccion('1', 'Sección')];

    render(
      <Sidebar
        helpSections={secciones}
        onSectionClick={mockOnSectionClick}
        isMobile={true}
        // No pasamos onClose
      />
    );

    const seccionButton = screen.getByText('Sección');
    
    // No debe romper
    expect(() => fireEvent.click(seccionButton)).not.toThrow();
  });

  // TEST 9: Renderizar múltiples secciones con diferentes IDs
  it('debe renderizar cada sección con su ID único', () => {
    const secciones = [
      crearSeccion('abc', 'Primera'),
      crearSeccion('def', 'Segunda'),
      crearSeccion('ghi', 'Tercera')
    ];

    render(
      <Sidebar
        helpSections={secciones}
        onSectionClick={mockOnSectionClick}
        isMobile={false}
      />
    );

    fireEvent.click(screen.getByText('Primera'));
    expect(mockOnSectionClick).toHaveBeenCalledWith('abc');

    fireEvent.click(screen.getByText('Segunda'));
    expect(mockOnSectionClick).toHaveBeenCalledWith('def');

    fireEvent.click(screen.getByText('Tercera'));
    expect(mockOnSectionClick).toHaveBeenCalledWith('ghi');
  });

  // TEST 10: Cambiar sección seleccionada
  it('debe cambiar la sección seleccionada', () => {
    const secciones = [
      crearSeccion('1', 'Opción 1'),
      crearSeccion('2', 'Opción 2')
    ];

    const { rerender, container } = render(
      <Sidebar
        helpSections={secciones}
        currentSection="1"
        onSectionClick={mockOnSectionClick}
        isMobile={false}
      />
    );

    // Primera sección seleccionada
    let selected = container.querySelector('.Mui-selected');
    expect(selected?.textContent).toContain('Opción 1');

    // Cambiar a segunda sección
    rerender(
      <Sidebar
        helpSections={secciones}
        currentSection="2"
        onSectionClick={mockOnSectionClick}
        isMobile={false}
      />
    );

    selected = container.querySelector('.Mui-selected');
    expect(selected?.textContent).toContain('Opción 2');
  });
});