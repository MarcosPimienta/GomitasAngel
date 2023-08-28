USE GummyStore;

-- Users Table
CREATE TABLE Users (
    userID INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Consider hashing the password
    shippingAddress TEXT,
    phoneNumber VARCHAR(20)
);

-- Products Table
CREATE TABLE Products (
    productID INT AUTO_INCREMENT PRIMARY KEY,
    productName VARCHAR(255) NOT NULL,
    productDescription TEXT,
    price DECIMAL(10, 2)
);

-- BoxDesigns Table
CREATE TABLE BoxDesigns (
    designID INT AUTO_INCREMENT PRIMARY KEY,
    designName VARCHAR(255) NOT NULL,
    designDescription TEXT
);

-- Orders Table
CREATE TABLE Orders (
    orderID INT AUTO_INCREMENT PRIMARY KEY,
    userID INT,
    designID INT,
    orderDate DATE,
    shippingStatus VARCHAR(50),
    FOREIGN KEY (userID) REFERENCES Users(userID),
    FOREIGN KEY (designID) REFERENCES BoxDesigns(designID)
);

-- OrderDetails Table
CREATE TABLE OrderDetails (
    orderDetailID INT AUTO_INCREMENT PRIMARY KEY,
    orderID INT,
    productID INT,
    quantity INT,
    FOREIGN KEY (orderID) REFERENCES Orders(orderID),
    FOREIGN KEY (productID) REFERENCES Products(productID)
);

-- Notifications Table
CREATE TABLE Notifications (
    notificationID INT AUTO_INCREMENT PRIMARY KEY,
    userID INT,
    notificationText TEXT,
    notificationDate DATE,
    notificationType VARCHAR(50), -- Email or Text
    FOREIGN KEY (userID) REFERENCES Users(userID)
);