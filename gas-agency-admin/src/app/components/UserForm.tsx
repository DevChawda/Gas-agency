import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

// Define the type for initialData
interface UserFormData {
  name: string;
  phone: string;
}

// Define the props for UserForm
interface UserFormProps {
  initialData?: UserFormData;  // Optional prop with the shape of UserFormData
  onSubmit: SubmitHandler<UserFormData>;  // Type the onSubmit function handler
}

export function UserForm({ initialData, onSubmit }: UserFormProps) {
  const { register, handleSubmit } = useForm<UserFormData>({
    defaultValues: initialData || { name: '', phone: '' },  // Default to empty values if no initial data
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" {...register("name")} />
      </div>
      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" {...register("phone")} />
      </div>
      <Button type="submit">Save User</Button>
    </form>
  );
}
