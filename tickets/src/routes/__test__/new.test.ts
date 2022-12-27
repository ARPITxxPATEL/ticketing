import request from 'supertest';
import { app } from '../../app';

it('has a route handler listening to /api/tickets for post requests', async () => {
  const response = await request(app).post('/api/tickets').send({});

  expect(response.statusCode).not.toEqual(404);
});

it('can only be accessed if only user is signed in', async () => {});

it('return error if invalid title is provided', async () => {});

it('return error if invalid price is provided', async () => {});

it('create tickets with valid inputs', async () => {});
