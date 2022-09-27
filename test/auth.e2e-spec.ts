import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ApplicationModule } from '../src/app.module';

let api = '/auth/';
describe('Authentication (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApplicationModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('User must be able to sign-up: Positive', () => {
    const randomString = Math.floor(Math.random() + 1) + 'q';
    const email = `unique@${randomString}.com`;
    return request(app.getHttpServer())
      .post(api + 'signup').send({ email, password: '12345' })
      .expect(201)
      .then(res => {
        let { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email)
      });
  });
  it('it should get signup and get current logged user:Positive', async () => {
    const randomString = Math.floor(Math.random() + 1) + 'q';
    const email = `unique@${randomString}.com`;
    const res = await request(app.getHttpServer())
      .post(api + 'signup').send({ email, password: '12345' })
      .expect(201);
    const cookie = res.get('Set-Cookie');
    const { body } = await request(app.getHttpServer())
      .get(api + 'whoAmI').set('Cookie', cookie)
      .expect(200);
    expect(body.email).toEqual(email);
  })
});
