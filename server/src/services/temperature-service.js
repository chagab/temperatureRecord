import redis from "redis";

const client = redis.createClient({
    url: 'redis://localhost:6379'
});

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

export function getTemperaturesFromPinsBetweenDates(pins, startDate, endDate) {
    return Promise.all(pins.map( async pin => {
        const temperatures = await client.lRange(`pin${pin}`, 0, -1);
        return {
            name: pin,
            series: !!temperatures.length ? JSON.parse(temperatures) : []
        };
    }));
}
