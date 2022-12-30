import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

it('has a route handler listening to /api/tickets for post requests', async () => {
  const response = await request(app).post('/api/tickets').send({});

  expect(response.statusCode).not.toEqual(404);
});

it('can only be accessed if only user is signed in', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({});

  expect(response.statusCode).not.toEqual(401);
});

it('return error if invalid title is provided', async () => {
  const response1 = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: '',
      price: 10,
    });

  expect(response1.statusCode).toEqual(400);

  const response2 = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      price: 10,
    });

  expect(response2.statusCode).toEqual(400);
});

it('return error if invalid price is provided', async () => {
  const response1 = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'vdsvsdvdg',
      price: -10,
    });

  expect(response1.statusCode).toEqual(400);

  const response2 = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'csvddger',
    });

  expect(response2.statusCode).toEqual(400);
});

it('create tickets with valid inputs', async () => {
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  const title = 'asncc';

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title,
      price: 20,
    })
    .expect(201);

  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0].price).toEqual(20);
  expect(tickets[0].title).toEqual(title);
});
