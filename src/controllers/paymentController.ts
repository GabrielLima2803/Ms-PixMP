import { Request, Response } from 'express';
import { Payment } from 'mercadopago';
import { client } from '../config/mercadopago';
import { v4 as uuidv4 } from 'uuid';

const createPayment = async (req: Request, res: Response) => {
  console.log('Iniciando a criação do pagamento');

  console.log('Corpo da requisição:', req.body);

  const requiredFields = ['transaction_amount', 'description', 'email', 'first_name', 'last_name', 'cpf'];
  const missingFields = requiredFields.filter(field => !req.body[field]);

  if (missingFields.length > 0) {
    console.error('Campos ausentes:', missingFields);
    return res.status(400).json({
      message: "Missing required fields",
      error: "bad_request",
      status: 400,
      missingFields: missingFields
    });
  }

  const paymentInstance = new Payment(client);

  const payment_data = {
    transaction_amount: Number(req.body.transaction_amount),
    description: req.body.description,
    payment_method_id: 'pix',
    payer: {
      email: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      identification: {
        type: 'CPF',
        number: String(req.body.cpf)
      }
    }
  };

  console.log('Dados do pagamento:', payment_data);

  const requestOptions = {
    idempotencyKey: uuidv4(),
  };

  console.log('Opções da requisição:', requestOptions);

  try {
    const paymentResult = await paymentInstance.create({ body: payment_data, requestOptions });
    console.log('Resultado do pagamento:', paymentResult);
    res.status(200).json(paymentResult);
  } catch (error) {
    console.error('Erro ao criar pagamento:', error);

    if (error instanceof Error) {
      console.error('Mensagem de erro:', error.message);
      res.status(500).json({
        message: error.message,
        error:  error
      });
    } else {
      console.error('Erro desconhecido:', error);
      res.status(500).json({
        message: "An unknown error occurred",
        error: error
      });
    }
  }
};

export { createPayment };
