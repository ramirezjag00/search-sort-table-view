import User from '@customtypes/user'

class ApiClient {
  private static readonly users: User[] = [
    {
      name: 'Matthew',
      age: 20,
      // TODO: ADDITIONAL TEST DATA
      // foo: 'Foo',
      // bar: 'Bar',
      // fizz: 'Fizz',
      // buzz: 'Buzz',
    },
    {
      name: 'Alexander',
      age: 25,
      // TODO: ADDITIONAL TEST DATA
      // foo: 'Foo',
      // bar: 'Bar',
      // fizz: 'Fizz',
      // buzz: 'Buzz',
    },
    {
      name: 'Samuel',
      age: 22,
      // TODO: ADDITIONAL TEST DATA
      // foo: 'Foo',
      // bar: 'Bar',
      // fizz: 'Fizz',
      // buzz: 'Buzz',
    },
  ]

  public static async fetchUsers(): Promise<User[]> {
    return Promise.resolve(ApiClient.users)
  }
}

export default ApiClient
