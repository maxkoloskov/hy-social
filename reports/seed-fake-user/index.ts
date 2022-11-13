import fs from 'fs';
import { faker } from '@faker-js/faker';

const COUNT = 1_000_000;
const BATCH_SIZE = 1000;
const OUTPUT_FILENAME = 'insert-fake-users.sql';

function generateUser() {
  const sex = faker.name.sexType();
  const firstName = faker.name.firstName(sex);
  const lastName = faker.name.lastName(sex);
  const email = faker.helpers.unique(faker.internet.email, [firstName, lastName]);
  const password = faker.internet.password(10, true);
  return {
    email,
    password,
    firstName,
    lastName,
  };
}

function createSqlFile() {
  const writeStream = fs.createWriteStream(OUTPUT_FILENAME, {
    flags: 'w',
  });

  const batchCount = Math.ceil(COUNT / BATCH_SIZE);
  const lastBatchSize = COUNT % BATCH_SIZE || BATCH_SIZE;

  for (let b = 0; b < batchCount; ++b) {
    writeStream.write('INSERT INTO user(email, password, firstName, lastName)\nVALUES\n');

    const currentBatchSize = b === batchCount - 1 ? lastBatchSize : BATCH_SIZE;

    for (let i = 0; i < currentBatchSize; ++i) {
      const user = generateUser();

      const values = [user.email, user.password, user.firstName, user.lastName]
        .map((v) => `'${v.replace("'", "''")}'`)
        .join(', ');
      writeStream.write(`(${values})`);

      if (i != currentBatchSize - 1) {
        writeStream.write(',\n');
      }
    }

    writeStream.write(';\n');
  }

  writeStream.end();
}

createSqlFile();
