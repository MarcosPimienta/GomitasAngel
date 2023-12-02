USE GummyStore;

-- Populate Users
INSERT INTO Users (username, email, password, shippingAddress, phoneNumber)
VALUES
('johnDoe', 'john@example.com', 'hashed_password1', '1234 Candy Lane, Candyville, 12345', '+1234567890'),
('janeSmith', 'jane@example.com', 'hashed_password2', '5678 Sweet St, Candyville, 12345', '+0987654321');

-- Populate Products
INSERT INTO Products (productName, productDescription, price)
VALUES
('ChocoMellows', 'Delicious chocolate covered marshmallows.', 10.99),
('LifeSavers', 'Sweet and tangy lifesaver candies.', 5.99),
('Oranges', 'Tasty orange flavored gummies.', 7.99),
('Ribbons', 'Tasty long tape flavored gummies.', 7.99),
('Strawberries', 'Tasty starwberry flavored gummies.', 7.99),
('Worms', 'Sour tasty flavored gummies.', 7.99);

-- Populate BoxDesigns
INSERT INTO BoxDesigns (designName, designDescription)
VALUES
('Classic Design', 'A classic box design with a glossy finish.'),
('Modern Design', 'A sleek and modern design with matte finishing.');

-- Populate Orders (assuming user with userID 1 made an order with the Classic Design)
INSERT INTO Orders (userID, designID, orderDate, shippingStatus)
VALUES
(1, 1, CURDATE(), 'Pending');

-- Populate OrderDetails (assuming the above order has 2 ChocoMellows and 3 LifeSavers)
INSERT INTO OrderDetails (orderID, productID, quantity)
VALUES
(1, 1, 2),
(1, 2, 3);

-- Populate Notifications
INSERT INTO Notifications (userID, notificationText, notificationDate, notificationType)
VALUES
(1, 'Your order has been received and is being processed.', CURDATE(), 'Email');
