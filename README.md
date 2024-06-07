## Laravel Chat Application with React

A real-time chat application for sending messages, files and voice messages. Built with Laravel, React, Inertia, Tailwind and Laravel Reverb.

## Installation

For a production:

```bash
$ composer install
$ npm build
$ php artisan migrate
```

For a development:

```bash
$ composer install
$ npm build
$ php artisan migrate --seed
```

**For the app to work you have to run the following command:**

For the websocket sever:

```bash
$ php artisan reverb:start
```

For the Converation Delete function:

```bash
$ php artisan queue:listen
```
