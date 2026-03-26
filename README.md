Project Overview
The Party Pantry is an app designed to take the hassle out of meal prep for users and limiting food waste by utilising food in your kitchen. Users can update their profile, browse meals for inspiration, add ingredients from the pantry, and save meals to refer to later. 

This app is built with 	Next.js, with the following features:
-	Multi-page structure
-	Dynamic routing
-	Database integration 
-	User profile customisation
-	Clerk user authentication and authorisation
-	Responsive UI design with Tailwind CSS
-	CRUD functionality

Target Users
The Party Pantry is designed for:
-	Users with busy lifestyles to take the hassle out of cooking
-	Users who are environmentally conscious and keen to limit waste
-	Users who enjoy cooking and trying new recipes

Setup Guide
1.	Clone the repository to your local device.
2.	Install dependencies by running npm install.
3.	Create a .env.local file in the root of the project and add the following environment variables:
• DATABASE_URL - Supabase connection string
• NEXT_PUBLIC_SUPABASE_URL - Supabase project API URL
• NEXT_PUBLIC_SUPABASE_ANON_KEY - Supabase project API key
• NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY - Clerk API publishable key
• CLERK_SECRET_KEY - Clerk API secret key
4.	Start the development server by running 		             
5.	Open the site on your local host

Future Improvements
Like and comments feature on meals which can be viewed by other users.
Broaden the available meals.
Include motion image graphics in the pantry.
