import { defineField } from 'sanity';

const review = {
  name: 'review',
  title: 'Review',
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
      name: 'text',
      title: 'Review Text',
      type: 'text',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'userRating',
      title: 'User Rating',
      type: 'number',
      validation: Rule =>
        Rule.required().min(1).max(5).error('Rating must be between 1 and 5'),
    }),
  ],
  // Thêm phần này để định nghĩa cách hiển thị preview
  preview: {
    select: {
      userName: 'user.name', // Lấy trường "name" từ tài liệu user
      roomName: 'hotelRoom.name', // Lấy trường "name" từ tài liệu hotelRoom
      userRating: 'userRating',
    },
    prepare(selection: { userName: any; roomName: any; userRating: any; }) {
      const { userName, roomName, userRating } = selection;
      return {
        title: `${userName || 'Unknown User'} - ${roomName || 'Unknown Room'}`,
        subtitle: `Rating: ${userRating || 'No Rating'}/5`,
      };
    },
  },
};

export default review;
