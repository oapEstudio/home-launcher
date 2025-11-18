import React from 'react';
import { render, screen } from '../../test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { useHomePage } from '../../../src/presentation/features/home/hooks/useHomePage';
import { HomePage } from '../../../src/presentation/features/home/HomePage';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

vi.mock('../../../src/presentation/components/widgets/carousel/Carousel', () => ({
  Carousel: ({ slides }: any) => (
    <div data-testid="carousel" data-count={slides?.length}>{slides?.[0]?.title}</div>
  )
}));

vi.mock('../../../src/presentation/components/widgets/relevant-applications/RelevantApplications', () => ({
  default: ({ items }: any) => (
    <div data-testid="relevant">{items?.length} items</div>
  )
}));

vi.mock('../../../src/presentation/features/home/hooks/useHomePage', () => ({
  useHomePage: vi.fn(),
}));

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const makeCarouselItem = (id: number) => ({
    notificationTypeId: id,
    slideName: `s${id}`,
    title: `Title ${id}`,
    description: `Desc ${id}`,
    imagenLink: `https://example.com/${id}.png`,
    buttonText: 'Go',
    buttonLink: '#',
    dateUpdated: new Date(),
  });

  it('renders Carousel and RelevantApplications when not loading', () => {
    (useHomePage as any).mockReturnValue({
      resultHighlighted: { data: [{ title: 'HL', description: 'd', link: '#', hierarchyIndex: 1 }], count: 1 },
      loadingHighlighted: false,
      resultCarousel: { data: [makeCarouselItem(1), makeCarouselItem(2)], count: 2 },
      loadingCarousel: false,
    });

    renderWithRouter(<HomePage />);

    const carousel = screen.getByTestId('carousel') as HTMLElement;
    expect(carousel.getAttribute('data-count')).toBe('2');
    expect(screen.getByText('Title 1')).toBeTruthy();

    const relevant = screen.getByTestId('relevant') as HTMLElement;
    expect(relevant.textContent || '').toContain('1 items');
  });

  it('shows skeleton instead of Carousel while loadingCarousel', () => {
    (useHomePage as any).mockReturnValue({
      resultHighlighted: { data: [{ title: 'HL', description: 'd', link: '#', hierarchyIndex: 1 }], count: 1 },
      loadingHighlighted: false,
      resultCarousel: null,
      loadingCarousel: true,
    });

    renderWithRouter(<HomePage />);

    expect(screen.queryByTestId('carousel')).toBeNull();
  });

  it('shows skeleton instead of RelevantApplications while loadingHighlighted', () => {
    (useHomePage as any).mockReturnValue({
      resultHighlighted: null,
      loadingHighlighted: true,
      resultCarousel: { data: [makeCarouselItem(1)], count: 1 },
      loadingCarousel: false,
    });

    renderWithRouter(<HomePage />);

    expect(screen.getByTestId('carousel')).toBeTruthy();
    expect(screen.queryByTestId('relevant')).toBeNull();
  });
});