import { After, AfterAll, BeforeAll } from '@cucumber/cucumber';
import { server } from '../mocks/server.js';
import { resetWorld } from './world.js';
// Establish API mocking before all tests.
BeforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
After(() => {
  server.resetHandlers()
  resetWorld();
});

// Clean up after the tests are finished.
AfterAll(() => server.close());
