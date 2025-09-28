import { FC } from 'react'
import { Input } from '@/components/ui/formui/Input'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { UserType } from '@/types/modelTypes'
import { ErrorSpanMessage } from '@/components/ui/ErrorSpanMessage'
import { Loading } from '@/components/ui/Loading'
import { useAppStore } from '@/stores/appStore'

const formSingUpRules = {
  name: {
    required: { value: true, message: 'Campo requerido' },
  },
  email: {
    required: { value: true, message: 'Campo requerido' },
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'El correo no tiene un formato válido',
    },
  },
  password: {
    required: { value: true, message: 'Campo requerido' },
    validate: (value: string) => {
      if (value.length < 8) {
        return 'La contraseña debe tener al menos 8 caracteres'
      }
      return true
    },
  },
}

export const SignUp: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<UserType & { password_confirmation: string }>()
  const passwordValue = watch('password')
  const passwordConfirmation = {
    required: { value: true, message: 'Campo requerido' },
    validate: (value: string) =>
      value === passwordValue || 'La confirmación de la contraseña no coincide',
  }

  const navigate = useNavigate()
  const { signUp } = useAuthStore()
  const { loading, setLoading } = useAppStore()

  const onSubmit = async (data: UserType) => {
    setLoading({ value: true, type: 'signUp' })
    await signUp(data, navigate)
    setLoading({ value: false, type: 'signUp' })
    reset()
  }

  return (
    <div className="bg-ppl flex h-[80vh] w-full flex-1 items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-w-[20vw] rounded-xl p-16 shadow-inner transition-shadow duration-300 hover:shadow-[inset_0_6px_20px_rgba(99,102,241,0.6)]"
      >
        <div className="space-y-12">
          <div className="border-b border-white/10 pb-12">
            <h2 className="text-2xl">Registrarse</h2>

            <div className="mt-10 grid gap-x-6 gap-y-8">
              <div className="w-full sm:col-span-4">
                <label htmlFor="email" className="block font-medium">
                  Nombre
                </label>
                {errors.name && <ErrorSpanMessage errorMessage={errors.name.message!} />}
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white/5 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                    <Input
                      id="name"
                      name="name"
                      register={register}
                      formRules={formSingUpRules}
                      type="text"
                      placeholder="Tony Montana"
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full sm:col-span-4">
                <label htmlFor="email" className="block font-medium">
                  Correo
                </label>
                {errors.email && <ErrorSpanMessage errorMessage={errors.email.message!} />}
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white/5 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                    <Input
                      id="email"
                      name="email"
                      register={register}
                      formRules={formSingUpRules}
                      type="text"
                      placeholder="gatitofurioso23@gmail.com"
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="password" className="text-md block font-medium">
                  Contraseña
                </label>
                {errors.password && <ErrorSpanMessage errorMessage={errors.password.message!} />}
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white/5 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                    <Input
                      id="password"
                      name="password"
                      register={register}
                      formRules={formSingUpRules}
                      type="password"
                      placeholder="******"
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label htmlFor="password" className="text-md block font-medium">
                  Confirmar contraseña
                </label>
                {errors.password_confirmation && (
                  <ErrorSpanMessage errorMessage={errors.password_confirmation.message!} />
                )}
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white/5 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                    <Input
                      id="password_confirmation"
                      name="password_confirmation"
                      register={register}
                      formRules={{ password_confirmation: passwordConfirmation }}
                      type="password"
                      placeholder="******"
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-x-6 text-sm">
          {loading.value && loading.type == 'signUp' ? (
            <Loading
              svgClasses="!w-[1rem] !h-[1rem] group-hover:text-white group-hover:fill-accent3 duration-300 "
              color="white"
              bgColor="accent3"
            />
          ) : (
            <Button
              type="submit"
              className="group flex cursor-pointer items-center justify-center rounded border border-accent1 bg-sec px-2 py-1 text-center text-accent1 duration-300 hover:bg-accent1 hover:text-sec focus:outline-none"
            >
              Registrarse
            </Button>
          )}
          <Link
            to={'/login'}
            className="w-fit cursor-pointer rounded border border-gray-200 bg-sec px-2 py-1 text-center text-gray-700 duration-300 hover:bg-gray-600 hover:text-gray-200 focus:outline-none"
          >
            Volver
          </Link>
        </div>
      </form>
    </div>
  )
}
