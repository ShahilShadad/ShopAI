import "dotenv/config";
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg";
import { faker } from "@faker-js/faker"

import { reviewsData } from "@/lib/mockData/reviews"
import { randomDateLastMonths } from "@/lib/mockData/dateHelpers"
import { postsData } from "@/lib/mockData/posts";
import { products } from "@/lib/mockData/products"

const { Pool } = pg

const pool = new Pool({
  connectionString: process.env.DIRECT_URL,
})

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
})

async function generateMockData() {
    const userData = await prisma.user.findFirst()

    if (!userData) {
        throw new Error("Usuario no encontrado en la base de datos")
    }

    await prisma.comment.deleteMany()
    await prisma.post.deleteMany()
    await prisma.socialMediaAccount.deleteMany()
    await prisma.contentGenerated.deleteMany()
    await prisma.review.deleteMany()
    await prisma.sale.deleteMany()
    await prisma.product.deleteMany()

    const apps = ["Instagram", "Facebook", "TikTok"]
    //Para channels
    const createdSocialAccounts = []

    for (const app of apps) {
        const socialAccount = await prisma.socialMediaAccount.create({
            data: {
                platform: app,
                userName: faker.internet.username(),
                profilePicture: faker.image.avatar(),
                followers: faker.number.int({ min: 300, max: 50000 }),
                totalPosts: postsData.length,
                userId: userData.id,
                createdAt: randomDateLastMonths(2),
            }

        })
        createdSocialAccounts.push(socialAccount)


        for (let i=0; i<postsData.length; i++){
            const actualPost = postsData[i]

            const post = await prisma.post.create({
                data: {
                    title: actualPost.title,
                    content: actualPost.content,
                    image: actualPost.image,
                    likes: actualPost.likes,
                    totalComments: actualPost.comments.length,
                    shares: actualPost.shares,
                    impressions: actualPost.impressions,
                    socialMediaId: socialAccount.id,
                    createdAt: randomDateLastMonths(3),
                },
            })

            for (const comment of actualPost.comments) {
                await prisma.comment.create({
                    data: {
                        content:comment,
                        postId: post.id,
                        createdAt: post.createdAt,
                    }
                })
            }
        }
    }

    const channels = [
        "Website",
        "Google Ads",
        ...createdSocialAccounts.map(account => account.platform)
    ]

    //PRODUCTOS MOCK
    for(let i = 0; i < products.length; i++){
        const product = await prisma.product.create({
            data: {
                name: products[i].name,
                category: products[i].category,
                price: products[i].price,
                image: products[i].image,
                createdAt: randomDateLastMonths(6),
                userId: userData.id
            }
        })

        //VENTAS MOCK
        for(let j=0; j<10; j++){
            const quantity = faker.number.int({ min: 1, max: 10 })
            const totalSelled = Number((product.price * quantity).toFixed(2))
            await prisma.sale.create({
                data: {
                    quantity,
                    totalSelled,
                    channel: faker.helpers.arrayElement(channels),
                    productId: product.id,
                    userId: userData.id,
                    createdAt: randomDateLastMonths(3)
                }
            })
        }

        for (let k = 0; k < 10; k++) {
            const reviewType = faker.helpers.arrayElement([
                ...reviewsData.positive,
                ...reviewsData.neutral,
                ...reviewsData.negative,
            ])

            await prisma.review.create({
                data: {
                    content: reviewType.content,
                    rating: reviewType.rating,
                    userId: userData.id,
                    productId: product.id,
                    createdAt: randomDateLastMonths(3),
                }
            })
        }
    }
}

generateMockData()
.then(async ()=>{
    await prisma.$disconnect()
})
.catch(async (error)=>{
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
})
