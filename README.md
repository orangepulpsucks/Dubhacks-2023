# Snip-Cal 🌿

This is source code for the DubHacks 2023 hackathon.

## Getting started

1. Install dependencies in the project directory:

    ```
    npm install
    ```

2. Create a file called `keys.ts` under `src/` and export necessary keys from it

3. Run the following to start the development server:

    ```
    npm run dev
    ```

4. Open a browser and go to `localhost:5173` to see the app!

5. Type `Ctrl+C` or `q` in the terminal with the server to stop the server.

## Running as Android or iOS app

To run the project as a mobile app:

1. Sync the web assets into the native projects:

    ```
    npm run sync
    ```

    Note that `npm install` needs to be run first, and the `keys.ts` file mentioned in the Getting Started section still needs to exist.

2. To open the project as an Android project in Android Studio, run:

    ```
    npx cap open android
    ```

    To open the project as an iOS project in XCode, run:

    ```
    npx cap open ios
    ```