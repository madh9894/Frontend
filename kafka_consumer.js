const kafka = require('./kafka_config');

const consumer = kafka.consumer({ groupId: 'service-group' });

const startKafkaConsumer = async () => {
    try {
        await consumer.connect();

        // Subscribe to topics
        await consumer.subscribe({ topic: 'en2ar', fromBeginning: true });
        await consumer.subscribe({ topic: 'ar2en', fromBeginning: true });
        await consumer.subscribe({ topic: 'text-summarizer', fromBeginning: true });

        console.log('Kafka consumer connected and listening...');

        // Process each message
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const key = message.key?.toString();
                const value = message.value.toString();

                console.log(`Received message on topic ${topic}: ${value}`);

                // Process message based on topic
                if (topic === 'en2ar') {
                    // Add logic for English-to-Arabic translation
                    console.log(`EN2AR Translation: ${value}`);
                } else if (topic === 'ar2en') {
                    // Add logic for Arabic-to-English translation
                    console.log(`AR2EN Translation: ${value}`);
                } else if (topic === 'text-summarizer') {
                    // Add logic for text summarization
                    console.log(`Text Summarization: ${value}`);
                }
            },
        });
    } catch (error) {
        console.error('Error in Kafka consumer:', error);
    }
};

module.exports = startKafkaConsumer;
