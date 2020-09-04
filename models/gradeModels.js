import mongoose from 'mongoose';

export default (mongoose) => {
  const gradeSchema = mongoose.Schema({
    name: {
      type: String,
      require: true,
    },
    subject: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    value: {
      type: Number,
      require: true,
      //     validade(value){
      //           if(value<0){
      //                 throw new Error("Valor negativo para nota não permitido")
      //           }
      //     ,}
      min: 0,
    },
    lastModified: {
      type: Date,
      default: Date.now(),
    },
  });

  //definindo o modelo da coleção
  const gradeModel = mongoose.model('grades', gradeSchema, 'grades');

  return gradeModel;
};
