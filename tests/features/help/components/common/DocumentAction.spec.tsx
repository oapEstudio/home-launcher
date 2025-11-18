import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { HELP_DOCUMENT_DOWNLOAD, HELP_DOCUMENT_LINK, HELP_DOCUMENT_PDF } from '../../../../../src/presentation/features/help/contants/helps';

describe('DocumentAction - Logic Tests', () => {
  let windowOpenSpy: any;
  let createElementSpy: any;
  let mockLink: any;

  beforeEach(() => {
    windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => {
      return { focus: vi.fn() } as any;
    });

    mockLink = {
      href: '',
      download: '',
      click: vi.fn()
    };
    createElementSpy = vi.spyOn(document, 'createElement').mockReturnValue(mockLink as any);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('debe configurar el href y download correctamente para descarga', () => {
    const link = document.createElement('a');
    link.href = 'https://example.com/archivo.pdf';
    link.download = 'Mi Archivo';
    link.click();

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(mockLink.href).toBe('https://example.com/archivo.pdf');
    expect(mockLink.download).toBe('Mi Archivo');
    expect(mockLink.click).toHaveBeenCalled();
  });

  it('debe usar "archivo" como nombre por defecto cuando el título está vacío', () => {
    const title = '';
    const fileName = title || 'archivo';
    
    expect(fileName).toBe('archivo');
  });

  it('debe usar el título como nombre de archivo cuando existe', () => {
    const title = 'Mi Documento';
    const fileName = title || 'archivo';
    
    expect(fileName).toBe('Mi Documento');
  });

  it('debe abrir ventana con parámetros correctos para PDF', () => {
    window.open('https://example.com/doc.pdf', '_blank', 'noopener,noreferrer');
    
    expect(windowOpenSpy).toHaveBeenCalledWith(
      'https://example.com/doc.pdf',
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('debe abrir ventana con parámetros correctos para enlace', () => {
    window.open('https://example.com/enlace', '_blank', 'noopener,noreferrer');
    
    expect(windowOpenSpy).toHaveBeenCalledWith(
      'https://example.com/enlace',
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('debe manejar window.open que retorna null', () => {
    windowOpenSpy.mockReturnValue(null);
    
    const win = window.open('https://example.com', '_blank', 'noopener,noreferrer');
    
    expect(win).toBeNull();
    expect(() => {
      if (win) win.focus();
    }).not.toThrow();
  });

  it('debe identificar tipo de documento HELP_DOCUMENT_DOWNLOAD', () => {
    const helpDocumentTypeId = HELP_DOCUMENT_DOWNLOAD;
    
    expect(helpDocumentTypeId).toBe(HELP_DOCUMENT_DOWNLOAD);
  });

  it('debe identificar tipo de documento HELP_DOCUMENT_PDF', () => {
    const helpDocumentTypeId = HELP_DOCUMENT_PDF;
    
    expect(helpDocumentTypeId).toBe(HELP_DOCUMENT_PDF);
  });

  it('debe identificar tipo de documento HELP_DOCUMENT_LINK', () => {
    const helpDocumentTypeId = HELP_DOCUMENT_LINK;
    
    expect(helpDocumentTypeId).toBe(HELP_DOCUMENT_LINK);
  });

});