import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { DocumentItem } from '../../../../../src/presentation/features/help/components/common/DocumentItem';
import { IHelp } from '../../../../../src/domain/entities/IHelp';

vi.mock('../../../../../src/presentation/features/help/components/common/DocumentAction', () => ({
  DocumentAction: ({ help }: any) => <button>Action for {help.title}</button>
}));

const createMockHelp = (id: string, title: string): IHelp => ({
  id,
  helpTypeId: 3,
  helpType: 'Documento',
  name: title,
  title,
  description: '',
  parentId: null,
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
});

describe('DocumentItem', () => {
  it('debe renderizar el título del documento', () => {
    const mockItem = createMockHelp('1', 'Manual de Usuario');

    render(<DocumentItem item={mockItem} />);

    expect(screen.queryByText('Manual de Usuario')).toBeTruthy();
  });

  it('debe renderizar el componente DocumentAction con el item correcto', () => {
    const mockItem = createMockHelp('1', 'Guía de Instalación');

    render(<DocumentItem item={mockItem} />);

    expect(screen.queryByText('Action for Guía de Instalación')).toBeTruthy();
  });

  it('debe renderizar diferentes documentos correctamente', () => {
    const mockItem1 = createMockHelp('1', 'Documento A');
    const mockItem2 = createMockHelp('2', 'Documento B');

    const { rerender } = render(<DocumentItem item={mockItem1} />);
    expect(screen.queryByText('Documento A')).toBeTruthy();
    expect(screen.queryByText('Action for Documento A')).toBeTruthy();

    rerender(<DocumentItem item={mockItem2} />);
    expect(screen.queryByText('Documento B')).toBeTruthy();
    expect(screen.queryByText('Action for Documento B')).toBeTruthy();
  });

  it('debe renderizar títulos largos', () => {
    const longTitle = 'Este es un título muy largo para un documento que contiene mucha información';
    const mockItem = createMockHelp('1', longTitle);

    render(<DocumentItem item={mockItem} />);

    expect(screen.queryByText(longTitle)).toBeTruthy();
  });

  it('debe renderizar títulos con caracteres especiales', () => {
    const specialTitle = 'Documento #1: Guía & Tutorial (2024)';
    const mockItem = createMockHelp('1', specialTitle);

    render(<DocumentItem item={mockItem} />);

    expect(screen.queryByText(specialTitle)).toBeTruthy();
  });

  it('debe renderizar múltiples documentos en secuencia', () => {
    const mockItem1 = createMockHelp('1', 'Primer Documento');
    const mockItem2 = createMockHelp('2', 'Segundo Documento');
    const mockItem3 = createMockHelp('3', 'Tercer Documento');

    const { container: container1 } = render(<DocumentItem item={mockItem1} />);
    const { container: container2 } = render(<DocumentItem item={mockItem2} />);
    const { container: container3 } = render(<DocumentItem item={mockItem3} />);

    expect(container1.textContent).toContain('Primer Documento');
    expect(container2.textContent).toContain('Segundo Documento');
    expect(container3.textContent).toContain('Tercer Documento');
  });
});