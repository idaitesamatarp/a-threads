/**
 * skenario testing for FilterSearch
 *
 * - FilterSearch component
 *   - should handle category typing correctly
 *   - should change input value when category typing correctly
 */

import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterSearch from './FilterSearch';
import { Provider } from 'react-redux';
import store from '../states';

describe('FilterSearch component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle category typing correctly', async () => {
    // Arrange
    render(
      <Provider store={store}>
        <FilterSearch />
      </Provider>
    );
    const categoryInput = screen.getByTestId('search-category');

    // Action
    await userEvent.type(categoryInput, 'redux');

    // Assert
    expect(categoryInput).toHaveValue('redux');
  });

  it('should change input value when category typing correctly', async () => {
    // Arrange
    render(
      <Provider store={store}>
        <FilterSearch />
      </Provider>
    );
    const categoryInput = screen.getByTestId('search-category');

    // Action
    await userEvent.type(categoryInput, 'redux');
    fireEvent.change(categoryInput, { target: { value: 'redux' } });

    // Assert
    expect(categoryInput.value).toBe('redux');
  });
});
