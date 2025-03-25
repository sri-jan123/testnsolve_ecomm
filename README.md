Ecommerce Application
Overview
This is an ecommerce application that allows users to register, log in, and manage their cart. Users can add products to their cart, adjust quantities, and receive discounts based on the number of products in the cart. The application also includes a "Forgot Password" functionality with a security question feature to help users recover their account credentials.

Features
1. User Registration and Login
Users can register by creating an account with a unique username, email, and password.

Registered users can log in to their accounts using their credentials (username/email and password).

2. User Cart
After logging in, users can add products to their shopping cart.

Users can adjust the quantity of items in their cart by increasing or decreasing the number.

If the quantity of products in the cart is 10 or more, a 10% discount will be applied to the price of every additional product added to the cart.

3. Discount Functionality
No Discount: If the total quantity of products is less than 10, no discount is applied.

Discount Applied: If the quantity of products reaches or exceeds 10, a 10% discount will be applied to every new product added to the cart.

4. Forgot Password
If a user forgets their password, they can navigate to the "Forgot Password" page.

The user must answer a security question to recover their password and set a new one.

Screenshots
1. Register and Login Functionality
Registration Screen:
![Screenshot 2025-03-25 105222](https://github.com/user-attachments/assets/d42a6c5a-b9d4-4fcb-b559-25222379913a)
Login Screen:
![Screenshot 2025-03-25 105232](https://github.com/user-attachments/assets/830fcb6e-0b6d-47ad-a372-0ea2014327d9)

2.Home Page
Home Page:
![Screenshot 2025-03-25 105259](https://github.com/user-attachments/assets/7a44b570-ea32-4b8d-ac9e-94d2e7c75516)

3. User Cart
Cart Page:
![Screenshot 2025-03-25 105319](https://github.com/user-attachments/assets/59b40043-6dbb-4364-9780-926311c5724c)

4. Discount Functionality
No Discount Applied (Less Than 10 Products):
![Screenshot 2025-03-25 105319](https://github.com/user-attachments/assets/3a577144-8717-40de-9f5e-4e103fb9511a)

Discount Applied (10 or More Products):
![Screenshot 2025-03-25 105347](https://github.com/user-attachments/assets/b1e4a17e-634f-4d1a-b7b3-09eeeabe650d)

Tech Stack

Frontend:
React (Optional for dynamic UI)

Backend:
Node.js
Express.js
MongoDB (or any other database for storing user data and cart information)

Authentication:
JWT (JSON Web Tokens) for user authentication and authorization.
Other Technologies:
bcrypt (for password hashing)


