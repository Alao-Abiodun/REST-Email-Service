import { Kafka, SASLOptions } from "kafkajs";

const { KAFKA_DEFAULT_BROKER, KAFKA_CLIENT_ID, KAFKA_API_KEY: username, KAFKA_SECRET_KEY: password } = process.env;
const sasl = username && password ? { username, password, mechanism: 'plain' } : null
const ssl = !!sasl


const kafka = new Kafka({
    clientId: KAFKA_CLIENT_ID,
    brokers: [String(KAFKA_DEFAULT_BROKER)],
    ssl,
    sasl: String(sasl) as unknown as SASLOptions,
});

const dummyKafka = {
	async producer() {
		// console.log(name, data);
		return true;
	},
    async connect() {
		// console.log(name, data);
		return true;
	},

    async send() {
		// console.log(name, data);
		return true;
	},
};

export const producer = process.env.NODE_ENV === "test" ? dummyKafka : kafka.producer();