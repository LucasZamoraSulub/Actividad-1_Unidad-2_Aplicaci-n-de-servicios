import type IUser from '@/interfaces/IUser'
import { ref, type Ref } from 'vue'

// const url = import.meta.env.VITE_API_URL || 'https://jsonplaceholder.typicode.com'
const url = import.meta.env.VITE_API_URL || 'https://2d55-201-134-180-250.ngrok-free.app'


export default class UserService {
  private users: Ref<IUser[]>
  private user: Ref<IUser>

  constructor() {
    this.users = ref([])
    this.user = ref({}) as Ref<IUser>
  }
 //Son Los getters
  getUsers(): Ref<IUser[]> {
    return this.users
  }
  getUser(): Ref<IUser> {
    return this.user
  }

  async fetchAll(): Promise<void> {
    try {
      const json = await fetch(url + '/users', {
        method: 'GET',
        headers: {
          'ngrok-skip-browser-warning': '0',

          'Content-Type': 'application/json'
        }
      }
      
      )
      const response = await json.json()
      this.users.value = await response
    } catch (error) {
      console.error(error)
    }
  }

  async fetchUser(id: string): Promise<void> {
    try {
      const json = await fetch(url + '/user?email=' + id, {
        method: 'GET',
        headers: {
          'ngrok-skip-browser-warning': '0',
          'Content-Type': 'application/json'

      }})
      const response = await json.json()
      this.user.value = await response
    } catch (error) {
      console.error(error)
    }
  }

  async registerUser(user: IUser): Promise<void> {
    try {
      const json = await fetch(url + '/register', {
        method: 'POST',
        headers: {
          'ngrok-skip-browser-warning': '0',
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(user)
      })
      const response = await json.json()
      this.user.value = await response
    } catch (error) {
      console.log('Error al crear un usuario')
    }
  }

  async loginUser(user: IUser): Promise<void> {
    try {
      const response = await fetch(url + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({ user })
      })

      if (!response.ok) {
        throw new Error('Credenciales inválidas. Por favor, inténtalo de nuevo.')
      }

      const userData = await response.json()
      this.user.value = userData
    } catch (error) {
      console.log('Error al intentar loguearse usuario')
    }
  }
}
