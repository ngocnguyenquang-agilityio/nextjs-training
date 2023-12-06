import React, { ReactElement } from 'react';
import { render, fireEvent } from '@testing-library/react';

// Components
import { TechTable } from '.';

describe('TechTable Component', () => {
  jest.mock(
    'next/link',
    () =>
      ({ children, ...rest }: { children: ReactElement }) =>
        React.cloneElement(children, { ...rest })
  );

  test('Should render successfully', () => {
    const comp = render(<TechTable />);
    expect(comp).toBeTruthy();
  });

  test('Should match snapshot', () => {
    const comp = render(<TechTable />);
    expect(comp).toMatchSnapshot();
  });

  test('Should click delete button', async () => {
    const comp = render(<TechTable />);
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    const button = comp.queryByTestId('delete-5') as HTMLButtonElement;
    await fireEvent.click(button);
    expect(alertMock.mock.calls.length).toBe(1);
  });

  test('Should able to click correct edit button', async () => {
    const comp = render(<TechTable />);
    const button = comp.queryByTestId('edit-5') as HTMLLinkElement;
    await fireEvent.click(button);
    expect(button.getAttribute('href')).toBe('/edit-tech/5');
  });
});
