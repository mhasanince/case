import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';

import type { Feature } from '../features';
import { FeatureShowcase } from './FeatureShowcase';

function createFeature(name: string, title: string): Feature {
  const id = name.toLowerCase();
  return {
    id,
    name,
    title,
    description: `${title} description`,
    icon: `/${id}.svg`,
    illustrationLabel: `${title} illustration`,
    phone: { src: `/${id}.webp`, x: 0, y: 0, width: 365, height: 483 },
    decorations: [],
  };
}

function createFeatures() {
  return [
    createFeature('Scanner', 'Scan with Ease'),
    createFeature('Signature', 'One-Tap Focus'),
    createFeature('Export', 'All-Round Conversion'),
  ];
}

function finishLeaveTransition() {
  fireEvent.transitionEnd(screen.getByRole('tabpanel'));
}

test('shows the first feature in a panel labelled by its selected tab', () => {
  render(<FeatureShowcase features={createFeatures()} />);

  const tabs = screen.getAllByRole('tab');
  expect(tabs.map((tab) => tab.getAttribute('aria-selected'))).toEqual([
    'true',
    'false',
    'false',
  ]);
  expect(screen.getByRole('tabpanel', { name: 'Scanner' })).toHaveTextContent(
    'Scan with Ease',
  );
  expect(
    screen.getByRole('img', { name: 'Scan with Ease illustration' }),
  ).toBeInTheDocument();
});

test('keeps only the selected tab in the tab order', () => {
  render(<FeatureShowcase features={createFeatures()} />);

  const tabs = screen.getAllByRole('tab');
  expect(tabs.map((tab) => tab.tabIndex)).toEqual([0, -1, -1]);
});

test('selects a clicked tab and shows its feature once the previous slide has faded out', async () => {
  const user = userEvent.setup();
  render(<FeatureShowcase features={createFeatures()} />);

  await user.click(screen.getByRole('tab', { name: 'Signature' }));

  expect(screen.getByRole('tab', { name: 'Signature' })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
    'Scan with Ease',
  );

  finishLeaveTransition();

  expect(screen.getByRole('tabpanel', { name: 'Signature' })).toHaveTextContent(
    'One-Tap Focus',
  );
});

test('moves the selection and focus with arrow keys, Home and End', async () => {
  const user = userEvent.setup();
  render(<FeatureShowcase features={createFeatures()} />);

  await user.click(screen.getByRole('tab', { name: 'Scanner' }));
  await user.keyboard('{ArrowRight}');
  expect(screen.getByRole('tab', { name: 'Signature' })).toHaveFocus();
  expect(screen.getByRole('tab', { name: 'Signature' })).toHaveAttribute(
    'aria-selected',
    'true',
  );

  await user.keyboard('{End}');
  expect(screen.getByRole('tab', { name: 'Export' })).toHaveFocus();

  await user.keyboard('{ArrowRight}');
  expect(screen.getByRole('tab', { name: 'Scanner' })).toHaveFocus();

  await user.keyboard('{ArrowLeft}');
  expect(screen.getByRole('tab', { name: 'Export' })).toHaveFocus();

  await user.keyboard('{Home}');
  expect(screen.getByRole('tab', { name: 'Scanner' })).toHaveAttribute(
    'aria-selected',
    'true',
  );
});

test('shows only the last feature when tabs change faster than the fade-out', async () => {
  const user = userEvent.setup();
  render(<FeatureShowcase features={createFeatures()} />);

  await user.click(screen.getByRole('tab', { name: 'Signature' }));
  await user.click(screen.getByRole('tab', { name: 'Export' }));
  finishLeaveTransition();

  expect(screen.getByRole('tabpanel', { name: 'Export' })).toHaveTextContent(
    'All-Round Conversion',
  );
});

test('keeps the current feature when the selection returns to it during the fade-out', async () => {
  const user = userEvent.setup();
  render(<FeatureShowcase features={createFeatures()} />);

  await user.click(screen.getByRole('tab', { name: 'Signature' }));
  await user.click(screen.getByRole('tab', { name: 'Scanner' }));
  finishLeaveTransition();

  expect(screen.getByRole('tabpanel', { name: 'Scanner' })).toHaveTextContent(
    'Scan with Ease',
  );
});
