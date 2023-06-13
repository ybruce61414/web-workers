import { faker } from '@faker-js/faker'

export const _genRandomRawData = size => {
  const res = []

  for (let i = 0; i < size; i++) {
    const item = {
      order: i + 1,
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      mail: faker.internet.email(),
    }
    res.push(item)
  }
  return res
}

