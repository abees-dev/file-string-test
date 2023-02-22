import amqplib, { Channel } from 'amqplib';
import nodemailer, { Transporter } from 'nodemailer';
import { redis } from 'src/utils/redis';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

export class RabbitMQ {
  private static instance: RabbitMQ;
  private channel: Channel;
  private transporter: Transporter;

  private constructor() {
    this.transporter = this.createTransporter();
  }
  public static getInstance(): RabbitMQ {
    if (!RabbitMQ.instance) {
      RabbitMQ.instance = new RabbitMQ();
    }
    return RabbitMQ.instance;
  }

  createTransporter() {
    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      service: 'gmail',
      port: 465,
      // secure: true,
      auth: {
        user: 'abeesdevop@gmail.com',
        pass: 'yewpxzcjxrtmzere',
      },
    });
  }

  public async connect() {
    try {
      const amqpServer = 'amqp://52.77.254.139:5672';
      const connection = await amqplib.connect(amqpServer);
      this.channel = await connection.createChannel();
      console.log('Connecting to RabbitMQ');
      this.sendMail();
    } catch (error) {
      console.log(error);
    }
  }

  public async consumeFromQueue(queueName: string, callback: (data: any) => void) {
    await this.channel.assertQueue(queueName);
    this.channel.consume(queueName, (message) => {
      if (message) {
        callback(JSON.parse(message.content.toString()));
      }
      this.channel.ack(message);
    });
  }

  public async publishToQueue<T = any>(queueName: string, data: T) {
    await this.channel.assertQueue(queueName);
    this.channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), {
      persistent: true,
    });
  }

  async sendMail() {
    this.consumeFromQueue('send-mail', async (data) => {
      const __dirname = path.resolve();
      const filePath = path.join(__dirname, 'src', 'templates', 'register.html');
      const source = fs.readFileSync(filePath, 'utf-8').toString();
      const template = handlebars.compile(source);

      const code = Buffer.from(Math.random().toString()).toString('base64').substring(0, 22);

      // http://localhost:3000/auth/login?verify=progressing&code=MC41OTk4NTMzMTM4NDg0OD&email=abeesdevjs@gmail.com
      const replacements = {
        email: data.email,
        url: `${process.env.FRONTEND_URL}/auth/login?verify=progressing&code=${code}&email=${data.email}`,
      };
      const htmlToSend = template(replacements);

      await redis.set(data.email, code, 'EX', 60 * 10);
      await this.transporter.sendMail({
        from: 'abeesdevop@gmail.com',
        to: data.email,
        subject: 'Activate your account',
        text: `code: ${code}`,
        html: htmlToSend,
      });
      console.log(data);
    });
  }
}
