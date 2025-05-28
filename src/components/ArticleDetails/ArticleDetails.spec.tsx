import { render, screen } from '@testing-library/react';
import ArticleDetails from './ArticleDetails';
import '@testing-library/jest-dom';
import { mockArticle } from '../../shared/dummyData';

describe('ArticleDetail component', () => {
  it('renders title, author and date', () => {
    render(<ArticleDetails article={mockArticle} userName="Admin" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Title',
    );
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('1/1/2024')).toBeInTheDocument();
  });
  it('renders the image if imageUrl is present', () => {
    render(<ArticleDetails article={mockArticle} userName="Admin" />);
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(mockArticle.imageUrl);
  });

  it('renders content as HTML', () => {
    render(<ArticleDetails article={mockArticle} userName="Admin" />);
    expect(
      screen.getByText('test', { selector: 'strong' }),
    ).toBeInTheDocument();
  });

  it('renders all comments', () => {
    render(<ArticleDetails article={mockArticle} userName="Admin" />);
    expect(screen.getByText('Comments (2)')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('Test comment1')).toBeInTheDocument();
    expect(screen.getByText('Test Author2')).toBeInTheDocument();
    expect(screen.getByText('Test comment')).toBeInTheDocument();
  });
});
