import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Article from './Article';

const mockArticle = {
  articleId: '123',
  title: 'Title',
  createdAt: '2023-11-01T12:00:00Z',
  imageUrl: 'http://imageUrl.com/url',
  content: '<p>This is the article content.</p>',
  name: 'Tested Name',
  lastUpdatedAt: '2023-11-02T15:30:00Z',
  comments: [],
};

describe('Article component', () => {
  it('renders article with correct title and author', () => {
    render(
      <MemoryRouter>
        <Article {...mockArticle} />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('article-title')).toHaveTextContent('Title');
    expect(screen.getByTestId('article-author')).toHaveTextContent(
      'Tested Name',
    );
  });

  it('renders fallback title if none is provided', () => {
    render(
      <MemoryRouter>
        <Article {...{ ...mockArticle, title: '' }} />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('article-title')).toHaveTextContent(
      'Untitled article',
    );
  });

  it('renders content as HTML', () => {
    render(
      <MemoryRouter>
        <Article {...mockArticle} />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('article-description').innerHTML).toContain(
      'This is the article content.',
    );
  });

  it('links to the correct article detail page', () => {
    render(
      <MemoryRouter>
        <Article {...mockArticle} />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('article-link')).toHaveAttribute(
      'href',
      `/articles/${mockArticle.articleId}`,
    );
  });
});
