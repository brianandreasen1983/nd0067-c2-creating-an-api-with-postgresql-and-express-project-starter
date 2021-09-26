import supertest from 'supertest';
import app from '../../server';

const userId = 41;
const request = supertest(app)

// describe('Orders Endpoint Responses', () => {
//     // TODO: Write a test to get the users current order by their user id
//     it('gets the users current order based on their user id.', async () => {
//         // TODO: Write the body of the test.
//     })
// })