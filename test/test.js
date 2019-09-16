const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../src/server');
const Category = require('../src/models/category');
const User = require('../src/models/user');
const jwt = require('jsonwebtoken');
const env = require('../src/config/environment');


chai.use(chaiHttp);

describe('categories', () => {
	const categoryName = 'test';
	beforeEach((done) => {
		Category.deleteMany({}).then(() => {
			done();
		});
	});

	it('get all', (done) => {
		chai.request(app)
			.get('/api/category')
			.then(response => {
				expect(response.body).to.be.an('array');
				expect(response.body.length).to.equal(0);
				done();
			});
	});

	describe('create Category', () => {

		it('create', (done) => {
			chai.request(app)
				.get('/api/category')
				.then(response => {
					expect(response.body).to.be.an('array');
					expect(response.body.length).to.equal(0);
					chai.request(app)
						.put('/api/category')
						.send({ name: categoryName })
						.then(response => {
							expect(response).to.have.status(201);
							expect(response.body).to.be.an('object');
							expect(response.body.name).to.equal(categoryName);
							done();
						});
				});
		});

		it('create illegal model Category', (done) => {
			chai.request(app)
				.put('/api/category')
				.send({ title: categoryName })
				.then(response => {
					expect(response).to.have.status(400);
					done();
				});
		});
	});
});

describe('users', () => {

	const user = {
		name: 'shahar',
		email: 'ravidar10@gmail.com',
		password: '1234',
		age: 23
	};

	beforeEach((done) => {
		User.deleteMany({}).then(() => {
			done();
		});
	});

	describe('register --> login e2e', () => {
		it('register & login', (done) => {
			chai.request(app)
				.put('/api/user')
				.send(user)
				.then(response => {
					expect(response).to.have.status(201);
					expect(response.body).to.be.an('object');
					expect(response.body.email).to.equal(user.email);
					chai.request(app)
						.post('/api/user/login')
						.send({
							email: user.email,
							password: user.password
						})
						.then(res1 => {
							chai.request(app).get(`/api/user/me`)
								.set('Authorization', res1.body.token)
								.then(res2 => {
									expect(res2).to.have.status(200);
									expect(res2.body).to.be.an('object');
									expect(res2.body.name).to.equal(user.name);
								});
							done();
						});
				});
		});
	});
});