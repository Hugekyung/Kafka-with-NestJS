import { Kafka } from 'kafkajs';

export const initializeKafka = async () => {
  // Kafka Admin Client to create topics
  const kafka = new Kafka({
    clientId: 'kafka-admin-client',
    brokers: ['localhost:9092'],
  });
  const admin = kafka.admin();
  await admin.connect();
  const topics = await admin.listTopics();

  const requiredTopics = ['order.created', 'message.created'];
  const topicsToCreate = requiredTopics.filter(
    (topic) => !topics.includes(topic),
  );

  if (topicsToCreate.length > 0) {
    await admin.createTopics({
      topics: topicsToCreate.map((topic) => ({ topic, numPartitions: 1 })),
    });
    console.log(`Topics created: ${topicsToCreate.join(', ')}`);
  }
  await admin.disconnect();
};
