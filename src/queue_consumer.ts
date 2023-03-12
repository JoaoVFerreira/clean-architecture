import amqp from 'amqplib';
import { checkout } from '@src/Checkout';

async function init() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue('checkout', { durable: true });
  await channel.consume('checkout', async (msg: any) => {
    const input = JSON.parse(msg.content.toString());
    try {
      const output = await checkout(input);
      console.log(output);
    } catch (error: any) {
      console.log(error.message);
    }
    channel.ack(msg);
  });
}

init();
