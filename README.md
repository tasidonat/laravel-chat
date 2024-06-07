## Laravel Chat Application with React

A real-time chat application for sending messages, files and voice messages.
The admin user can add new users. At user registration an email will be sent for the user with a temporary new password.
The users can create groups. Only group owner can add or remove users and can delete the whole group.

**Used Technology**

- Laravel
- React
- Tailwind
- Laravel Reverb
- DaisyUI

## Installation

For a production:

```bash
$ composer install
$ npm run build
$ php artisan migrate
```

For a development:

```bash
$ composer install
$ npm run build
$ php artisan migrate --seed
```

**For all the functionality the following services has to run on the server:**

For the websocket sever:

```bash
$ php artisan reverb:start
```

For the Group Delete function:

```bash
$ php artisan queue:listen
```

