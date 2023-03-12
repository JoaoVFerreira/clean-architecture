import amqp from 'amqplib';

async function init() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue('checkout', { durable: true });
  await channel.consume('checkout', async (msg: any) => {
    // const input = JSON.parse(msg.content.toString());

    channel.ack(msg);
  });
  channel.sendToQueue('checkout', Buffer.from(JSON.stringify(input)));
}

init();
