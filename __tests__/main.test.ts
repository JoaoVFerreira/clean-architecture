import axios from 'axios';

describe('Main entrypoint', () => {
  it('should not make an order with CPF invalid', async () => {
    const input = {
      cpf: '987.654.321-01',
    };
    const response = await axios.post('http://localhost:3000/checkout', input);
    expect(response.status).toBe(422);
    const output = response.data;
    expect(output.message).toBe('Invalid cpf');
  });

  it('should make an order with 3 products', async () => {
    const input = {
      cpf: '987.654.321-00',
      items: [
        { idProduct: 1, quantity: 1 },
        { idProduct: 2, quantity: 1 },
        { idProduct: 3, quantity: 3 },
      ],
    };
    const response = await axios.post('http://localhost:3000/checkout', input);
    const output = response.data;
    expect(output.total).toBe(6090);
  });

  it('should not make an order with a product that does not exist', async () => {
    const input = {
      cpf: '987.654.321-00',
      items: [{ idProduct: 4, quantity: 1 }],
    };
    const response = await axios.post('http://localhost:3000/checkout', input);
    expect(response.status).toBe(422);
    const output = response.data;
    expect(output.message).toBe('Product not found');
  });

  it('should make an order with 3 products with coupon discount', async () => {
    const input = {
      cpf: '987.654.321-00',
      items: [
        { idProduct: 1, quantity: 1 },
        { idProduct: 2, quantity: 1 },
        { idProduct: 3, quantity: 3 },
      ],
      coupon: 'VALE20',
    };
    const response = await axios.post('http://localhost:3000/checkout', input);
    const output = response.data;
    expect(output.total).toBe(4872);
  });

  it('should not aplly a coupon discount if coupon is expired', async () => {
    const input = {
      cpf: '987.654.321-00',
      items: [
        { idProduct: 1, quantity: 1 },
        { idProduct: 2, quantity: 1 },
        { idProduct: 3, quantity: 3 },
      ],
      coupon: 'VALE20_EXPIRED',
    };
    const response = await axios.post('http://localhost:3000/checkout', input);
    const output = response.data;
    expect(output.total).toBe(6350);
  });

  it('should make an order with quantity negative', async () => {
    const input = {
      cpf: '987.654.321-00',
      items: [{ idProduct: 1, quantity: -3 }],
    };
    const response = await axios.post('http://localhost:3000/checkout', input);
    expect(response.status).toBe(422);
    const output = response.data;
    expect(output.message).toBe('Quantity must be positive');
  });

  it('should make an order with duplicated product', async () => {
    const input = {
      cpf: '987.654.321-00',
      items: [
        { idProduct: 1, quantity: 1 },
        { idProduct: 1, quantity: 1 },
      ],
    };
    const response = await axios.post('http://localhost:3000/checkout', input);
    expect(response.status).toBe(422);
    const output = response.data;
    expect(output.message).toBe('Duplicated product');
  });

  it('should make an order and calculate freight', async () => {
    const input = {
      cpf: '987.654.321-00',
      items: [{ idProduct: 1, quantity: 1 }],
    };
    const response = await axios.post('http://localhost:3000/checkout', input);
    const output = response.data;
    expect(output.total).toBe(1030);
  });

  it('Deve fazer um pedido calculando o frete', async () => {
    const input = {
      cpf: '987.654.321-00',
      items: [{ idProduct: 3, quantity: 1 }],
    };
    const response = await axios.post('http://localhost:3000/checkout', input);
    const output = response.data;
    expect(output.total).toBe(40);
  });
});
