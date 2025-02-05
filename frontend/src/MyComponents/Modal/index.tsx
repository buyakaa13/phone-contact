import React from 'react';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {Contact} from '../../Model/Contact';

interface ModalProps {
  addContact: (newContact: Contact) => void;
  setIsModalOpen: (open: boolean) => void,
}

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phone: yup
    .string()
    .matches(/^\d{3}-\d{3}-\d{4}$/, "Phone number must be in format 123-456-7890")
    .required("Phone number is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
});

const Modal: React.FC<ModalProps> = ({ setIsModalOpen, addContact }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    addContact(data);
    setIsModalOpen(false);
  };

  const handleClose = () => {
    console.log('CLOSE...')
    setIsModalOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Contact</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Form fields */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              {...register("name")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              {...register("phone")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="123-456-7890"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              {...register("email")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
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

export default Modal;
