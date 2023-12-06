import React, { ReactElement } from 'react';
import { render, fireEvent } from '@testing-library/react';

// Components
import { UserTable } from '.';

describe('UserTable Component', () => {
  jest.mock(
    'next/link',
    () =>
      ({ children, ...rest }: { children: ReactElement }) =>
        React.cloneElement(children, { ...rest })
  );

  test('Should render successfully', () => {
    const comp = render(<UserTable />);
    expect(comp).toBeTruthy();
  });

  test('Should match snapshot', () => {
    const comp = render(<UserTable />);
    expect(comp).toMatchSnapshot();
  });

  test('Should able to click correct delete button', async () => {
    const comp = render(<UserTable />);
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    const button = comp.queryByTestId('delete-1') as HTMLButtonElement;
    await fireEvent.click(button);
    expect(alertMock.mock.calls.length).toBe(1);
  });

  test('Should able to click correct edit button', async () => {
    const comp = render(<UserTable />);
    const button = comp.queryByTestId('edit-1') as HTMLLinkElement;
    await fireEvent.click(button);
    expect(button.getAttribute('href')).toBe('/edit-user/1');
  });
});
