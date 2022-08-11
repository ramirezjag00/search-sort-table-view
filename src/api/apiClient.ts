import User from '@customtypes/user'

class ApiClient {
  private static readonly users: User[] = [
    {
      name: 'Matthew',
      age: 20,
      // TODO: ADDITIONAL TEST DATA
      // foo: Math.random().toString(36).slice(2, 7),
      // bar: Math.random().toString(36).slice(2, 7),
      // fizz: Math.random().toString(36).slice(2, 7),
      // buzz: Math.random().toString(36).slice(2, 7),
    },
    {
      name: 'Alexander',
      age: 25,
      // TODO: ADDITIONAL TEST DATA
      // foo: Math.random().toString(36).slice(2, 7),
      // bar: Math.random().toString(36).slice(2, 7),
      // fizz: Math.random().toString(36).slice(2, 7),
      // buzz: Math.random().toString(36).slice(2, 7),
    },
    {
      name: 'Samuel',
      age: 22,
      // TODO: ADDITIONAL TEST DATA
      // foo: Math.random().toString(36).slice(2, 7),
      // bar: Math.random().toString(36).slice(2, 7),
      // fizz: Math.random().toString(36).slice(2, 7),
      // buzz: Math.random().toString(36).slice(2, 7),
    },
  ]
  // TODO: ADDITIONAL TEST DATA
  // .concat(
  //   ...Array.from(Array(50).keys()).map(() => {
  //     return {
  //       name: Math.random().toString(36).slice(2, 7),
  //       age: Math.floor(Math.random() * 100),
  //       foo: Math.random().toString(36).slice(2, 7),
  //       bar: Math.random().toString(36).slice(2, 7),
  //       fizz: Math.random().toString(36).slice(2, 7),
  //       buzz: Math.random().toString(36).slice(2, 7),
  //     }
  //   }),
  // )

  public static async fetchUsers(): Promise<User[]> {
    return Promise.resolve(ApiClient.users)
  }
}

export default ApiClient
