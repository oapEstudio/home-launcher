import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { SectionContent } from '../../../../../src/presentation/features/help/components/content/SectionContent';
import { IHelp } from '../../../../../src/domain/entities/IHelp';
import { HELP_ARTICLE, HELP_DOCUMENT } from '../../../../../src/presentation/features/help/contants/helps';

vi.mock('../../../../../src/presentation/features/help/components/common/ArticleItem', () => ({
  ArticleItem: ({ item }: any) => <div>Article: {item.title}</div>
}));

vi.mock('../../../../../src/presentation/features/help/components/common/DocumentItem', () => ({
  DocumentItem: ({ item }: any) => <div>Document: {item.title}</div>
}));

const createMockHelp = (id: string, title: string, helpTypeId: number): IHelp => ({
  id,
  helpTypeId,
  helpType: helpTypeId === HELP_ARTICLE ? 'Artículo' : 'Documento',
  name: title,
  title,
  description: `Descripción de ${title}`,
  parentId: null,
  parent: null,
  link: '',
  statusId: 1,
  statusDescription: 'Activo',
  statusColor: '#00FF00',
  helpDocumentTypeId: 1,
  helpDocumentType: 'Tipo 1',
  document: [],
  profile: [],
  dateUpdated: new Date().toISOString(),
  documentLink: '',
  children: []
});

describe('SectionContent', () => {
  it('debe mostrar mensaje cuando no hay sección seleccionada', () => {
    render(<SectionContent section={null} />);
    
    expect(screen.queryByText('Selecciona una sección del menú')).toBeTruthy();
  });

  it('debe mostrar mensaje cuando section es undefined', () => {
    render(<SectionContent section={undefined} />);
    
    expect(screen.queryByText('Selecciona una sección del menú')).toBeTruthy();
  });

  it('debe renderizar el título de la sección', () => {
    const mockSection = createMockHelp('1', 'Mi Sección de Ayuda', HELP_ARTICLE);
    
    render(<SectionContent section={mockSection} />);
    
    expect(screen.queryByText('Mi Sección de Ayuda')).toBeTruthy();
  });

  it('debe renderizar artículos correctamente', () => {
    const article1 = createMockHelp('2', 'Artículo 1', HELP_ARTICLE);
    const article2 = createMockHelp('3', 'Artículo 2', HELP_ARTICLE);
    
    const mockSection: IHelp = {
      ...createMockHelp('1', 'Sección Principal', HELP_ARTICLE),
      children: [article1, article2]
    };
    
    render(<SectionContent section={mockSection} />);
    
    expect(screen.queryByText('Article: Artículo 1')).toBeTruthy();
    expect(screen.queryByText('Article: Artículo 2')).toBeTruthy();
  });

  it('debe renderizar documentos correctamente', () => {
    const document1 = createMockHelp('2', 'Documento 1', HELP_DOCUMENT);
    const document2 = createMockHelp('3', 'Documento 2', HELP_DOCUMENT);
    
    const mockSection: IHelp = {
      ...createMockHelp('1', 'Sección con Documentos', HELP_ARTICLE),
      children: [document1, document2]
    };
    
    render(<SectionContent section={mockSection} />);
    
    expect(screen.queryByText('Document: Documento 1')).toBeTruthy();
    expect(screen.queryByText('Document: Documento 2')).toBeTruthy();
  });

  it('debe renderizar artículos y documentos mezclados', () => {
    const article = createMockHelp('2', 'Mi Artículo', HELP_ARTICLE);
    const document = createMockHelp('3', 'Mi Documento', HELP_DOCUMENT);
    
    const mockSection: IHelp = {
      ...createMockHelp('1', 'Sección Mixta', HELP_ARTICLE),
      children: [article, document]
    };
    
    render(<SectionContent section={mockSection} />);
    
    expect(screen.queryByText('Article: Mi Artículo')).toBeTruthy();
    expect(screen.queryByText('Document: Mi Documento')).toBeTruthy();
  });

  it('debe manejar sección sin children', () => {
    const mockSection: IHelp = {
      ...createMockHelp('1', 'Sección Vacía', HELP_ARTICLE),
      children: []
    };
    
    render(<SectionContent section={mockSection} />);
    
    expect(screen.queryByText('Sección Vacía')).toBeTruthy();
    expect(screen.queryByText(/Article:/)).toBeNull();
    expect(screen.queryByText(/Document:/)).toBeNull();
  });

  it('debe ignorar children con helpTypeId desconocido', () => {
    const article = createMockHelp('2', 'Artículo válido', HELP_ARTICLE);
    const unknown = createMockHelp('3', 'Tipo desconocido', 999);
    
    const mockSection: IHelp = {
      ...createMockHelp('1', 'Sección con tipos mixtos', HELP_ARTICLE),
      children: [article, unknown]
    };
    
    render(<SectionContent section={mockSection} />);
    
    expect(screen.queryByText('Article: Artículo válido')).toBeTruthy();
    expect(screen.queryByText('Tipo desconocido')).toBeNull();
  });
});