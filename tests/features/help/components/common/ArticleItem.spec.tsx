import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { ArticleItem } from '../../../../../src/presentation/features/help/components/common/ArticleItem';
import { IHelp } from '../../../../../src/domain/entities/IHelp';

vi.mock('../../../../../src/presentation/features/help/components/common/DocumentItem', () => ({
  DocumentItem: ({ item }: any) => <div>Document: {item.title}</div>
}));

vi.mock('../../../../../src/presentation/components/ui/accordion/Accordion', () => ({
  CustomAccordion: ({ title, content }: any) => (
    <div>
      <div>Accordion Title: {title}</div>
      <div>{content}</div>
    </div>
  )
}));

const createMockHelp = (id: string, title: string, description?: string): IHelp => ({
  id,
  helpTypeId: 1,
  helpType: 'Artículo',
  name: title,
  title,
  description: description || '',
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

describe('ArticleItem', () => {
  it('debe renderizar el título del artículo', () => {
    const mockItem = createMockHelp('1', 'Mi Artículo');
    
    render(<ArticleItem item={mockItem} />);
    
    expect(screen.queryByText('Mi Artículo')).toBeTruthy();
  });

  it('debe renderizar la descripción cuando existe', () => {
    const mockItem = createMockHelp('1', 'Artículo con descripción', 'Esta es la descripción del artículo');
    
    render(<ArticleItem item={mockItem} />);
    
    expect(screen.queryByText('Esta es la descripción del artículo')).toBeTruthy();
  });

  it('no debe renderizar el bloque de descripción cuando no existe', () => {
    const mockItem = createMockHelp('1', 'Artículo sin descripción', '');
    
    render(<ArticleItem item={mockItem} />);
    
    const descriptionBox = screen.queryByText('Esta es la descripción del artículo');
    expect(descriptionBox).toBeNull();
  });

  it('debe renderizar documentos hijos cuando existen', () => {
    const document1 = createMockHelp('2', 'Documento 1');
    const document2 = createMockHelp('3', 'Documento 2');
    
    const mockItem: IHelp = {
      ...createMockHelp('1', 'Artículo con documentos'),
      children: [document1, document2]
    };
    
    render(<ArticleItem item={mockItem} />);
    
    expect(screen.queryByText('Document: Documento 1')).toBeTruthy();
    expect(screen.queryByText('Document: Documento 2')).toBeTruthy();
  });

  it('no debe renderizar documentos cuando children está vacío', () => {
    const mockItem: IHelp = {
      ...createMockHelp('1', 'Artículo sin documentos'),
      children: []
    };
    
    render(<ArticleItem item={mockItem} />);
    
    expect(screen.queryByText(/Document:/)).toBeNull();
  });

  it('debe renderizar sin acordeón cuando showAccordion es false', () => {
    const mockItem = createMockHelp('1', 'Artículo sin acordeón');
    
    render(<ArticleItem item={mockItem} showAccordion={false} />);
    
    expect(screen.queryByText('Artículo sin acordeón')).toBeTruthy();
    expect(screen.queryByText('Accordion Title:')).toBeNull();
  });

  it('debe renderizar con acordeón cuando showAccordion es true', () => {
    const mockItem = createMockHelp('1', 'Artículo con acordeón');
    
    render(<ArticleItem item={mockItem} showAccordion={true} />);
    
    expect(screen.queryByText('Accordion Title: Artículo con acordeón')).toBeTruthy();
  });

  it('debe usar showAccordion false por defecto', () => {
    const mockItem = createMockHelp('1', 'Artículo default');
    
    render(<ArticleItem item={mockItem} />);
    
    expect(screen.queryByText('Artículo default')).toBeTruthy();
    expect(screen.queryByText('Accordion Title:')).toBeNull();
  });

  it('debe renderizar artículo completo con descripción y documentos', () => {
    const document1 = createMockHelp('2', 'Guía PDF');
    const document2 = createMockHelp('3', 'Manual DOC');
    
    const mockItem: IHelp = {
      ...createMockHelp('1', 'Artículo Completo', 'Descripción completa del artículo'),
      children: [document1, document2]
    };
    
    render(<ArticleItem item={mockItem} />);
    
    expect(screen.queryByText('Artículo Completo')).toBeTruthy();
    expect(screen.queryByText('Descripción completa del artículo')).toBeTruthy();
    expect(screen.queryByText('Document: Guía PDF')).toBeTruthy();
    expect(screen.queryByText('Document: Manual DOC')).toBeTruthy();
  });

  it('debe renderizar artículo completo dentro de acordeón', () => {
    const document1 = createMockHelp('2', 'PDF en acordeón');
    
    const mockItem: IHelp = {
      ...createMockHelp('1', 'Artículo en Acordeón', 'Descripción en acordeón'),
      children: [document1]
    };
    
    render(<ArticleItem item={mockItem} showAccordion={true} />);
    
    expect(screen.queryByText('Accordion Title: Artículo en Acordeón')).toBeTruthy();
    expect(screen.queryByText('Descripción en acordeón')).toBeTruthy();
    expect(screen.queryByText('Document: PDF en acordeón')).toBeTruthy();
  });
});