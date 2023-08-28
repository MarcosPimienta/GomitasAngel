USE GummyStore;

-- Fetch all users
SELECT * FROM Users;

-- Fetch all products
SELECT * FROM Products;

-- Fetch all orders for a specific user (e.g., userID = 1)
SELECT * FROM Orders WHERE userID = 1;

-- Fetch details of a specific order (e.g., orderID = 1)
SELECT
    o.orderID,
    o.orderDate,
    o.shippingStatus,
    p.productName,
    od.quantity,
    p.price,
    (od.quantity * p.price) AS totalCost
FROM Orders o
JOIN OrderDetails od ON o.orderID = od.orderID
JOIN Products p ON od.productID = p.productID
WHERE o.orderID = 1;

-- Fetch all notifications for a specific user sorted by date (e.g., userID = 1)
SELECT * FROM Notifications
WHERE userID = 1
ORDER BY notificationDate DESC;

-- Update shipping status for an order (e.g., orderID = 1)
UPDATE Orders SET shippingStatus = 'Shipped' WHERE orderID = 1;

-- Delete an order (e.g., orderID = 1)
-- Note: You might want cascading deletes or checks before doing this in a real application
DELETE FROM Orders WHERE orderID = 1;

-- Count the total number of orders for each design
SELECT
    bd.designName,
    COUNT(o.orderID) AS totalOrders
FROM BoxDesigns bd
LEFT JOIN Orders o ON bd.designID = o.designID
GROUP BY bd.designName;
