import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createBooking, updateHotelRoom } from 'libs/apis';

const checkout_session_completed = 'checkout.session.completed';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-11-20.acacia',
});

export async function POST(req: Request) {
  const reqBody = await req.text();
  const sig = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new NextResponse(`Webhook Error: ${error.message}`, { status: 500 });
    }
    return new NextResponse('Webhook Error: Unknown error', { status: 500 });
  }

  switch (event.type) {
    case checkout_session_completed:
      const session = event.data.object as Stripe.Checkout.Session;
      if (!session.metadata) {
        return new NextResponse('Metadata is missing', { status: 400 });
      }
      const {
        metadata: {
          adults,
          checkinDate,
          checkoutDate,
          children,
          hotelRoom,
          numberOfDays,
          user,
          discount,
          totalPrice,
        },
      } = session;

      await createBooking({
        adults: Number(adults),
        checkinDate,
        checkoutDate,
        children: Number(children),
        hotelRoom,
        numberOfDays: Number(numberOfDays),
        discount: Number(discount),
        totalPrice: Number(totalPrice),
        user,
      });

      await updateHotelRoom(hotelRoom);

      return NextResponse.json('Booking successful', {
        status: 200,
        statusText: 'Booking Successful',
      });

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json('Event Received', {
    status: 200,
    statusText: 'Event Received',
  });
}
