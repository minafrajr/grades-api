import mongoose from 'mongoose';
import gradeModel from './gradeModels.js';

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;
db.grades = gradeModel(mongoose);

export { db };
