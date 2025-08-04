import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '@/constants';
import { PaginationState } from '@tanstack/react-table';

export function getInitialPaginationFromURL(): PaginationState {
  if (typeof window === 'undefined') return { pageIndex: 0, pageSize: 10 };
  const params = new URLSearchParams(window.location.search);
  const pageIndex = parseInt(params.get('page') || '0', DEFAULT_PAGE_INDEX);
  const pageSize = parseInt(params.get('pageSize') || '10', DEFAULT_PAGE_SIZE);
  return { pageIndex, pageSize };
}

export function getInitialSearchFromURL(): string {
  if (typeof window === 'undefined') return '';
  const params = new URLSearchParams(window.location.search);
  return params.get('search') || '';
}
