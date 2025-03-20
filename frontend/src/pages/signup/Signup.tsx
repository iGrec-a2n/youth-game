import React from "react";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { InputPassword, InputText } from "../../components/input/Input";
import "./Singup.scss"

// Schéma de validation avec Zod
const signupSchema = z.object({
  lastName: z.string().min(1, "Le nom est requis"),
  firstName: z.string().min(1, "Le prénom est requis"),
  username: z.string().min(3, "Le pseudo doit avoir au moins 3 caractères"),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit avoir au moins 6 caractères"),
  confirmPassword: z.string().min(6, "La confirmation est requise"),
  country: z.string().min(1, "Le pays est requis"),
  birthDate: z.string().min(1, "La date de naissance est requise"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

// Type des données du formulaire
type SignupFormInputs = z.infer<typeof signupSchema>;

const Signup: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormInputs) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/register", data, {
        headers: { "Content-Type": "application/json" },
      });
      alert(response.data.message);
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      console.error("Erreur lors de l'inscription :", axiosError);
      const errorMessage = (axiosError.response?.data as { message?: string })?.message || "Erreur de connexion.";
      console.log(errorMessage);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Inscription</h2>

        <label>Nom :</label>
        <InputText {...register("lastName")} placeholder="Nom" type="text" required />
        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}

        <label>Prénom :</label>
        <InputText {...register("firstName")} placeholder="Prénom" type="text" required />
        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}

        <label>Pseudo :</label>
        <InputText {...register("username")} placeholder="Pseudo" type="text" required />
        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}

        <label>Email :</label>
        <InputText type="email" {...register("email")} placeholder="Email" required />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <label>Mot de passe :</label>
        <InputPassword {...register("password")} placeholder="Mot de passe" required />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <label>Confirmer le mot de passe :</label>
        <InputPassword {...register("confirmPassword")} placeholder="Confirmer le mot de passe" required />
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}

        <label>Pays :</label>
        <InputText {...register("country")} placeholder="Pays" type="text" required />
        {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}

        <label>Date de naissance :</label>
        <InputText type="date" {...register("birthDate")} placeholder="Date de naissance" required />
        {errors.birthDate && <p className="text-red-500 text-sm">{errors.birthDate.message}</p>}

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-600">
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default Signup;
