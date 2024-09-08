const { MongoClient } = require('mongodb'); // подключаем модуль

async function main() {
  const uri = "mongodb://my_mongo:27017"; // строка подключения к монго
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true }); // создаем клиент монго

  try {
    await client.connect(); // подключаемся к монго
    console.log("Connected to MongoDB");

    const database = client.db('testdb');
    const collection = database.collection('test');

    const doc = { message: "Hello, Docker!" };
    const result = await collection.insertOne(doc); // далее пишем данные в бд в виде json (doc)
    console.log(`Document inserted with _id: ${result.insertedId}`);

    const docs = await collection.find().toArray(); // выводим что в бд
    console.log("Documents in collection:", docs);

  } finally {
    await client.close();
  }
}

main().catch(console.error); // запускаем приложение