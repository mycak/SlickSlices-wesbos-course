import { BsFillPersonFill as icon } from 'react-icons/bs';

export default {
  name: 'person',
  title: 'Slice masters',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Person name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Tell us something about that person!',
    },
    {
      name: 'image',
      title: 'Pizza image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};
