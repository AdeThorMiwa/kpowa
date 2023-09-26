## App Setup

```bash
# clone repo and enter director
$ git clone https://github.com/AdeThorMiwa/kpowa && cd kpowa

# install dependencies
$ yarn install

# add env variables
$ export VITE_SERVER_URL=http://localhost:8009
$ export VITE_EVENT_STREAM_URL=http://localhost:8009/stream

# or you can create a .env file from the .env.sample file and put environment variables there

# start the app in dev mode
$ yarn dev
```

### Learn more on the [Solid Website](https://solidjs.com) and come chat with us on our [Discord](https://discord.com/invite/solidjs)

## Available Scripts

In the project directory, you can run:

### `npm run dev` or `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment

You can deploy the `dist` folder to any static host provider (netlify, surge, now, etc.)
