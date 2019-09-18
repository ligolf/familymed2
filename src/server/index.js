require('dotenv').config({
  path: '.env.local'
});

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const epilogue = require('epilogue');
const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
  issuer: `${process.env.REACT_APP_OKTA_ORG_URL}/oauth2/default`,
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new Error('Authorization header is required');

    const accessToken = req.headers.authorization.trim().split(' ')[1];
    await oktaJwtVerifier.verifyAccessToken(accessToken);
    next();
  } catch (error) {
    next(error.message);
  }
});

const database = new Sequelize({
  dialect: 'sqlite',
  storage: './test.sqlite',
});

const Post = database.define('posts', {
  title: Sequelize.STRING,
  body: Sequelize.TEXT,
});

epilogue.initialize({
  app,
  sequelize: database
});

epilogue.resource({
  model: Post,
  endpoints: ['/posts', '/posts/:id'],
});

const Doctors = database.define('doctors', {
  userName: Sequelize.STRING,
  drName: Sequelize.STRING,
  drAddress: Sequelize.STRING,
  drPhone: Sequelize.STRING,
  drEmail: Sequelize.STRING,
  drSpeciality: Sequelize.STRING,
  drNotes: Sequelize.TEXT,
});

epilogue.initialize({
  app,
  sequelize: database
});

epilogue.resource({
  model: Doctors,
  endpoints: ['/doctors', '/doctors/:id'],
});

const Prescriptions = database.define('prescriptions', {
  userName: Sequelize.STRING,
  rxName: Sequelize.STRING,
  drPrescribed: Sequelize.STRING,
  rxDosage: Sequelize.STRING,
  rxUOM: Sequelize.STRING,
  rxFrequency: Sequelize.STRING,
  rxPrescribedDate: Sequelize.DATE,
  rxNextRefill: Sequelize.DATE,
  rxdrNotes: Sequelize.STRING,
  date: Sequelize.DATE
});

epilogue.initialize({
  app,
  sequelize: database
});

epilogue.resource({
  model: Prescriptions,
  endpoints: ['/prescriptions', '/prescriptions/:id'],
});

const History = database.define('history', {
  userName: Sequelize.STRING,
  bloodPressure: Sequelize.STRING,
  stroke: Sequelize.STRING,
  heartAttack: Sequelize.STRING,
  bloodDisorder: Sequelize.STRING,
  cholestrol: Sequelize.STRING,
  diabetes: Sequelize.STRING,
  glaucoma: Sequelize.STRING,
  epilepsy: Sequelize.STRING,
  cancer: Sequelize.STRING,
  Alchol: Sequelize.STRING,
  Psychiatric: Sequelize.STRING,
  suicide: Sequelize.STRING,
  familyHistory: Sequelize.STRING,
  date: Sequelize.DATE
});

epilogue.initialize({
  app,
  sequelize: database
});

epilogue.resource({
  model: History,
  endpoints: ['/history', '/history/:id'],
});

const port = process.env.SERVER_PORT || 3001;

database.sync().then(() => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});