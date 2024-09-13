import ButtonApp from '@/components/ButtonApp'
import { StepsArray } from '@/store/RegisterSteps'
import '@/css/index.css'
import { useRegisterUsersStore } from '@/store/RegisterUser'

const RegisterStep1 = ({ currentStep, nextStep }) =>{

  const { email, setEmail } = useRegisterUsersStore();

  return (
    <div className="p-8 max-w-md w-full flex justify-center items-center flex-col">
      {/* Image */}
      <div className="flex justify-center mb-6">
        <img 
            src="src\assets\images\corp\main_logo.png" 
            alt="Statue" 
            className="h-16 w-16 rounded-[var(--border-radius-3)] object-cover"
        />
      </div>
      
      {/* Titre */}
      <h1 className="text-xl font-semibold text-center mb-4 w-[80%]">
          Créez un compte pour sauvegarder vos réponses
      </h1>
      
      {/* Étoiles de notation */}
      <div className="flex flex-col items-center mb-6 w-[100%]">
        <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
            <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-gray-400"
            >
                <polygon points="12 2 15 8 21 9 17 14 18 21 12 18 6 21 7 14 3 9 9 8 12 2" />
            </svg>
            ))}
        </div>
        <p className="text-sm text-gray-500">
            noté 4.98/5 - 4324 notes
        </p>
      </div>

      {/* Formulaire Email */}
      <div className="mb-4 w-[100%]">
          <label className="block text-gray-700 mb-1" htmlFor="email">
              Votre email
          </label>
          <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Entrez votre email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
          />
      </div>

      {/* Bouton "Suivant" */}
      <div className="mb-6 w-[100%]">
          <ButtonApp 
              onClick={nextStep}
              disabled={currentStep === StepsArray.length - 1}
              color='primary'
              size='large'
          >
              Next
          </ButtonApp>
      </div>

      {/* Séparateur "ou" */}
      <div className="flex items-center justify-center mb-6 w-[100%]">
          <span className="bg-gray-300 h-px w-full"></span>
          <span className="px-4 text-gray-500">ou</span>
          <span className="bg-gray-300 h-px w-full"></span>
      </div>

      {/* Connexion avec Google et Apple */}
      <div className="space-y-3">
          <ButtonApp action='google'>Continue with Google</ButtonApp>
          <ButtonApp action='apple'>Continue with Apple</ButtonApp>
          <ButtonApp variant='text'>
              J'ai déjà un compte
          </ButtonApp>
      </div>
  </div>
  )
}

export default RegisterStep1