import React, { ReactElement } from 'react';
import { render, fireEvent } from '@testing-library/react';

// Components
import { UserTable } from '.';
import useSWR from 'swr';

const mockDataResponse = [
  {
    firstName: 'Tracy',
    lastName: 'Windler',
    dob: '1974-08-01T09:03:58.059Z',
    phone: '702-259-4678',
    entryDate: '2023-12-05T01:43:29.662Z',
    avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/637.jpg',
    id: '1'
  },
  {
    firstName: 'Donny',
    lastName: 'Rosenbaum',
    dob: '2004-10-17T05:20:13.923Z',
    phone: '592-406-8192',
    entryDate: '2023-12-04T20:04:41.338Z',
    avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1244.jpg',
    id: '2'
  },
  {
    firstName: 'Mauricio',
    lastName: 'Prosacco',
    dob: '1986-06-08T15:42:22.143Z',
    phone: '245-329-6808',
    entryDate: '2023-12-04T11:04:56.722Z',
    avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/806.jpg',
    id: '3'
  },
  {
    firstName: 'Darwin',
    lastName: 'Russel',
    dob: '1995-05-02T01:07:17.675Z',
    phone: '851-492-8758',
    entryDate: '2023-12-05T04:47:55.696Z',
    avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/846.jpg',
    id: '4'
  },
  {
    firstName: 'Alvah',
    lastName: 'Wolf',
    dob: '1969-05-08T20:47:20.177Z',
    phone: '832-251-6243',
    entryDate: '2023-12-04T17:43:55.685Z',
    avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/890.jpg',
    id: '5'
  }
];

jest.mock('swr');

const useMockSwr = jest.mocked(useSWR);

jest.mock(
  'next/link',
  () =>
    ({ children, ...rest }: { children: ReactElement }) =>
      React.cloneElement(children, { ...rest })
);

describe('UserTable Component', () => {
  test('Should render successfully', () => {
    useMockSwr.mockReturnValue({
      data: mockDataResponse,
      isLoading: false,
      error: undefined,
      mutate: function (): Promise<unknown> {
        return new Promise<void>(() => {
          return {
            data: mockDataResponse,
            opts: true
          };
        });
      },
      isValidating: false
    });
    const comp = render(<UserTable />);
    expect(comp).toBeTruthy();
  });

  test('Should match snapshot', () => {
    useMockSwr.mockReturnValue({
      data: mockDataResponse,
      isLoading: false,
      error: undefined,
      mutate: function (): Promise<unknown> {
        return new Promise<void>(() => {
          return {
            data: mockDataResponse,
            opts: true
          };
        });
      },
      isValidating: false
    });
    const comp = render(<UserTable />);
    expect(comp).toMatchSnapshot();
  });

  test('Should able to click correct delete button', async () => {
    useMockSwr.mockReturnValue({
      data: mockDataResponse,
      isLoading: false,
      error: undefined,
      mutate: function (): Promise<unknown> {
        return new Promise<void>(() => {
          return {
            data: mockDataResponse,
            opts: true
          };
        });
      },
      isValidating: false
    });
    const comp = render(<UserTable />);
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    const button = comp.queryByTestId('delete-1') as HTMLButtonElement;
    await fireEvent.click(button);
    expect(alertMock.mock.calls.length).toBe(1);
  });

  test('Should able to click correct edit button', async () => {
    useMockSwr.mockReturnValue({
      data: mockDataResponse,
      isLoading: false,
      error: undefined,
      mutate: function (): Promise<unknown> {
        return new Promise<void>(() => {
          return {
            data: mockDataResponse,
            opts: true
          };
        });
      },
      isValidating: false
    });
    const comp = render(<UserTable />);
    const button = comp.queryByTestId('edit-1') as HTMLLinkElement;
    await fireEvent.click(button);
    expect(button.getAttribute('href')).toBe('/edit-user/1');
  });
});
