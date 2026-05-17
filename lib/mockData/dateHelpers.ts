import { faker } from "@faker-js/faker"

export function randomDateLastMonths(months: number) {
  const now = new Date()

  const pastDate = new Date()
  pastDate.setMonth(now.getMonth() - months)

  return faker.date.between({
    from: pastDate,
    to: now,
  })
}