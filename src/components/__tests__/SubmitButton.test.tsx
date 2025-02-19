import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SubmitButton from '../SubmitButton';

describe('SubmitButton', () => {
  it('renders in default state', () => {
    render(<SubmitButton isSubmitting={false} text="Submit" />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Submit');
    expect(button).not.toBeDisabled();
  });

  it('renders in submitting state', () => {
    render(<SubmitButton isSubmitting={true} text="Submit" />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Submitting...');
    expect(screen.getByText('Submitting...')).toBeInTheDocument();
  });

  it('renders with custom loading text', () => {
    render(
      <SubmitButton
        isSubmitting={true}
        text="Submit"
        loadingText="Processing..."
      />
    );
    expect(screen.getByText('Processing...')).toBeInTheDocument();
  });

  it('applies correct styles based on state', () => {
    const { rerender } = render(
      <SubmitButton isSubmitting={false} text="Submit" />
    );
    let button = screen.getByRole('button');
    expect(button).toHaveClass('hover:bg-blue-600');
    expect(button).not.toHaveClass('bg-blue-400', 'cursor-not-allowed');

    rerender(<SubmitButton isSubmitting={true} text="Submit" />);
    button = screen.getByRole('button');
    expect(button).toHaveClass('bg-blue-400', 'cursor-not-allowed');
    expect(button).not.toHaveClass('hover:bg-blue-600');
  });
});