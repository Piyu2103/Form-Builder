import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LoadingSpinner from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders with default props', () => {
    const { container } = render(<LoadingSpinner />);
    const spinner = container.firstChild as HTMLElement; // ✅ Cast as HTMLElement

    expect(spinner).toBeInTheDocument();
    expect(spinner.firstChild as HTMLElement).toHaveClass(
      'h-12',
      'w-12',
      'border-blue-500'
    );
  });

  it('renders with custom size', () => {
    const { container } = render(<LoadingSpinner size={6} />);
    const spinner = container.firstChild as HTMLElement; // ✅ Cast as HTMLElement

    expect(spinner.firstChild as HTMLElement).toHaveClass('h-6', 'w-6');
  });

  it('renders with custom color', () => {
    const { container } = render(<LoadingSpinner color="border-red-500" />);
    const spinner = container.firstChild as HTMLElement; // ✅ Cast as HTMLElement

    expect(spinner.firstChild as HTMLElement).toHaveClass('border-red-500');
  });
});
