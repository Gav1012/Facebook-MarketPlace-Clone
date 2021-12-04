import React, {useState} from 'react';
import {render, fireEvent} from '@testing-library/react';
import {Router} from 'react-router-dom';
import Login from '../Login';
import '@testing-library/jest-dom';
import {screen, waitFor} from '@testing-library/react';
import {setupServer} from 'msw/node'
import {rest} from 'msw'
import CategoryContext from '../CategoryContext'
import {createMemoryHistory} from "history";
import CreateListing from '../CreateListing'
import userEvent from '@testing-library/user-event';

const authenticate = '/v0/authenticate';
const setVisible = jest.fn();

const server = setupServer(
  rest.post(authenticate, (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({email: 'dcharris@ucsc.edu', accessToken: '12345'}))
  }),
)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// https://stackoverflow.com/questions/32911630/how-do-i-deal-with-localstorage-in-jest-tests
// class LocalStorageMock {
//   constructor() {
//     this.store = {};
//   }

//   clear() {
//     this.store = {};
//   }

//   getItem(key) {
//     return this.store[key] || null;
//   }

//   setItem(key, value) {
//     this.store[key] = String(value);
//   }

//   removeItem(key) {
//     delete this.store[key];
//   }
// }
  
// global.localStorage = new LocalStorageMock;

test('login screen appears and login', async () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <CategoryContext.Provider value={{setVisible}}>
        <Login />
        {/* <CreateListing /> */}
      </CategoryContext.Provider>
    </Router>
  );
  await waitFor(() => screen.getByText("Login Screen"));
  const email = screen.getByTitle('email').querySelector('input');
  const password = screen.getByTitle('password').querySelector('input');
  fireEvent.click(screen.getByTitle('email'));
  fireEvent.change(email, {
    target: {
      value: 'dcharris@ucsc.edu'
    },
  });
  fireEvent.click(screen.getByTitle('password'));
  fireEvent.change(password, {
    target: {
      value: 'cse183'
    },
  });
  fireEvent.click(screen.getByText('Login'));
  await new Promise((r) => setTimeout(r, 1000));
  console.log('history: ', history);
  console.log('storage: ', localStorage);
  expect(history.length).toBe(2);
})

test('login screen appears and login', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <CategoryContext.Provider value={{setVisible}}>
          {/* <Login /> */}
          <CreateListing />
        </CategoryContext.Provider>
      </Router>
    );
    await waitFor(() => {
      expect(screen.getByText('Upload!'));
      fireEvent.click(screen.getByText('Upload!'));
    })
    await waitFor(() => {
      expect(screen.getByTitle('title'));
      fireEvent.click(screen.getByTitle('title'));
      const titleBar = screen.getByTitle('title').querySelector('input');
      fireEvent.change(titleBar, {
        target: {
          value: 'Cool Beans'
        },
      });
    })
    await waitFor(() => {
      expect(screen.getByTitle('title'));
      fireEvent.click(screen.getByTitle('title'));
      const titleBar = screen.getByTitle('title').querySelector('input');
      fireEvent.change(titleBar, {
        target: {
          value: 'Cool Beans'
        },
      });
    })
    await waitFor(() => {
      expect(screen.getByTitle('images'));
      fireEvent.click(screen.getByTitle('images'));
      const titleBar = screen.getByTitle('images');
      fireEvent.change(titleBar, {
        target: {
          value: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Grosser_Panda.JPG'
        },
      });
    })
    expect(screen.getByTestId('categoryX'));
    fireEvent.click(screen.getByTestId('categoryX'));
    fireEvent.change(screen.getByTestId('categoryX').querySelector('input'), {
      target: {
        value: 'Cars'
      },
    });
    // userEvent.selectOptions(screen.getByTestId('categoryX'), {
    //   target: {
    //     value: 'Cars'
    //   },
    // });
    // await waitFor(() => {
    //   expect(screen.getByTestId('categoryX'));
    //   fireEvent.click(screen.getByTestId('categoryX'));
    // })
})

