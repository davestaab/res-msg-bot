import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
    user: 'int-test',
    host: 'db.bit.io',
    database: 'davestaab/msg-bot-test',
    password: process.env.PG_USER_PW,
    port: 5432,
    ssl: true,
});
const start = Date.now();
await client.connect();
try {

    const res = await client.query('SELECT * FROM integration.current_test_status;')
    console.log('running');
    console.table(res.rows);
    console.log('time', Date.now() - start);
} catch (err) {
    console.error(err);
} finally {
    await client.end();
}