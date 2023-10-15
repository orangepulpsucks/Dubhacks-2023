# Snip-Cal 🌿
We are **CTRL + ALT + DEFEAT**! This is our submission for **Dubhacks '23**. We've come together to create **Snip-Cal** 🌿 an app that simplifies appointment management for seniors. Just take of an appointment or any physical note and **Snip-Cal** 🌿 will automatically schedule the appointment right into your Google Calendar.

**Hackathon Submission:** https://devpost.com/software/snip-cal

# Getting Started(Source Code)

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
