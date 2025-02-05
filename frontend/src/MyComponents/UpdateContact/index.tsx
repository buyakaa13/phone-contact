import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {Contact} from '../../Model/Contact';
import { useBookmark } from "@/Context/BookmarkContext";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phone: yup.string().matches(/^\d{3}-\d{3}-\d{4}$/, "Phone format: 123-456-7890"),
  email: yup.string().email("Invalid email").required("Email is required"),
});

const InputField = ({ label, name, register, errors, placeholder }: any) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      {...register(name)}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
      placeholder={placeholder}
    />
    {errors[name] && <p className="text-red-500 text-sm">{errors[name].message}</p>}
  </div>
);

const UpdateContact: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const data = state || {};
  const {updateBookmark} = useBookmark();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: data, 
  });

  const onSubmit = (data: Contact) => {
    console.log("Form Data:", data);
    updateBookmark(data.id, data);
    navigate(-1);
  };

  return (
    <div className="fixed inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Contact</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField label="Name" name="name" register={register} errors={errors} placeholder="Enter your name"/>
          <InputField label="Phone" name="phone" register={register} errors={errors} placeholder="123-456-7890" />
          <InputField label="Email" name="email" register={register} errors={errors} placeholder="Enter your email" />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateContact;
