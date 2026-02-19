import { prisma } from '@/prisma'
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        const evt = await verifyWebhook(req)

        // Do something with payload
        // For this guide, log payload to console
        const { id } = evt.data
        const eventType = evt.type
        console.log(`Received webhook with ID ${id} and event type of ${eventType}`)

        if (eventType === "user.created") {
            try {
                await prisma.user.create({
                    data: {
                        id: id,
                        username: evt.data.username ?? evt.data.email_addresses?.[0]?.email_address.split("@")[0] ?? `user_${id}`,
                        email: evt.data.email_addresses?.[0]?.email_address,
                    }
                })
                return new Response('User created', { status: 200 })

            } catch (error) {
                console.log(error)
                return new Response('Error: Failed while Creating user', { status: 500 })
            }
        } if (eventType === "user.deleted") {
            try {
                await prisma.user.delete({
                    where: { id: id }
                })
                return new Response('User deleted', { status: 200 })
            } catch (error) {
                console.log(error)
                return new Response('Error: Failed while deleting user', { status: 500 })
            }
        } if (eventType === "user.updated") {
            try {
                await prisma.user.update({
                    where: { id: id },
                    data: {
                        username: evt.data.username ?? evt.data.email_addresses?.[0]?.email_address.split("@")[0] ?? `user_${id}`,
                        email: evt.data.email_addresses?.[0]?.email_address,
                    }
                })
                return new Response('User Updated', { status: 200 })
            } catch (error) {
                console.log(error)
                return new Response('Error: Failed while updating user', { status: 500 })
            }
        }

        return new Response('Webhook received', { status: 200 })
    } catch (err) {
        console.error('Error verifying webhook:', err)
        return new Response('Error verifying webhook', { status: 400 })
    }
}