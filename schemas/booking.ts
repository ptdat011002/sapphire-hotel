import { defineField } from 'sanity';

const booking = {
  name: 'booking',
  title: 'Booking',
  type: 'document',
  fields: [
    defineField({
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{ type: 'user' }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'hotelRoom',
      title: 'Hotel Room',
      type: 'reference',
      to: [{ type: 'hotelRoom' }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'checkinDate',
      title: 'Check-in Date',
      type: 'date',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'checkoutDate',
      title: 'Check-out Date',
      type: 'date',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'numberOfDays',
      title: 'Number Of Days',
      type: 'number',
      initialValue: 1,
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'discount',
      title: 'Discount',
      type: 'number',
      initialValue: 0,
      validation: Rule => Rule.required().min(0),
    }),
    defineField({
      name: 'adults',
      title: 'Adults',
      type: 'number',
      initialValue: 1,
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'children',
      title: 'Children',
      type: 'number',
      initialValue: 0,
      validation: Rule => Rule.required().min(0),
    }),
    defineField({
      name: 'totalPrice',
      title: 'Total Price',
      type: 'number',
      validation: Rule => Rule.required().min(0),
    }),
  ],
  preview: {
    select: {
      user: 'user.name',  // Lấy tên người dùng từ tham chiếu
      hotelRoom: 'hotelRoom.name',  // Lấy tên phòng từ tham chiếu
      checkinDate: 'checkinDate',
    },
    prepare(selection: Record<string, any>) {  
      const { user, hotelRoom, checkinDate } = selection;
      
      return {
        title: `${user || 'N/A'} - ${hotelRoom || 'N/A'}`,  // Kiểm tra nếu không có giá trị
        subtitle: `Check-in: ${checkinDate ? new Date(checkinDate).toLocaleDateString() : 'N/A'}`,
      };
    },
  },
  
  
  
};


export default booking;
