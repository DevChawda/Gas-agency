import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Define your Zod schema for validation
const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(18, 'Must be at least 18'),
});

type FormValues = z.infer<typeof schema>;

const YourFormComponent = () => {
  // Example of partial default values (can be dynamically fetched or predefined)
  const partialDefaultValues: Partial<FormValues> = {
    name: 'John Doe',
    // You can leave out some fields here and they'll be optional
  };

  // Ensure the default values meet the expectations of react-hook-form's `defaultValues` type
  const defaultValues: FormValues = {
    name: partialDefaultValues.name || '',  // Provide a fallback for `name`
    email: partialDefaultValues.email || '',  // Provide a fallback for `email`
    age: partialDefaultValues.age ?? 18, // Provide a fallback for `age`
  };

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormValues>({
    defaultValues, // Pass the default values to react-hook-form
  });

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          {...register('name')}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          {...register('email')}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="age">Age</label>
        <input
          id="age"
          type="number"
          {...register('age')}
        />
        {errors.age && <p>{errors.age.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default YourFormComponent;
    