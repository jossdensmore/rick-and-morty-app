import MainBackground from '../components/backgrounds/MainBackground'
import LoginForm from '../components/forms/LoginForm'

export default function LoginPage() {
  return (
    <MainBackground backgroundOpacity form={<LoginForm />} />
  )
}