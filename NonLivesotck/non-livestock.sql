CREATE TABLE non_livestock_food_product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    food_product VARCHAR(255) UNIQUE NOT NULL,
    total_emission FLOAT NOT NULL
);


INSERT INTO non_livestock_food_product (food_product, total_emission) VALUES ('Wheat & Rye (Bread)', 1.4);
INSERT INTO non_livestock_food_product (food_product, total_emission) VALUES ('Maize (Meal)', 1.1);
INSERT INTO non_livestock_food_product (food_product, total_emission) VALUES ('Barley (Beer)', 1.1);
INSERT INTO non_livestock_food_product (food_product, total_emission) VALUES ('Oatmeal', 1.6);
INSERT INTO non_livestock_food_product (food_product, total_emission) VALUES ('Rice', 4.0);
INSERT INTO non_livestock_food_product (food_product, total_emission) VALUES ('Potatoes', 0.3);
INSERT INTO non_livestock_food_product (food_product, total_emission) VALUES ('Cassava', 0.9);
INSERT INTO non_livestock_food_product (food_product, total_emission) VALUES ('Cane Sugar', 2.6);
INSERT INTO non_livestock_food_product (food_product, total_emission) VALUES ('Beet Sugar', 1.4);
INSERT INTO non_livestock_food_product (food_product, total_emission) VALUES ('Other Pulses', 1.6);
INSERT INTO non_livestock_food_product (food_product, total_emission) VALUES ('Peas', 0.799999999999999);
INSERT INTO non_livestock_food_product (food_product, total_emission) VALUES ('Nuts', 0.2);
INSERT INTO non_livestock_food_product (food_product, total_emission) VALUES ('Groundnuts', 2.4);
INSERT INTO non_livestock_food_product (food_product, total_emission) VALUES ('Soymilk', 1.0);
INSERT INTO non_livestock_food_product (food_product, total_emission) VALUES ('Tofu', 3.0);
INSERT INTO non_livestock_food_product (food_product, total_emission) VALUES ('Soybean Oil', 5.99999999999999);
INSERT INTO non_livestock_food_product (food_product, total_emission) VALUES ('Palm Oil', 7.6);
INSERT INTO non_livestock_food_product (food_product, total_emission) VALUES ('Sunflower Oil', 3.5);
INSERT INTO non_livestock_food_product (food_product, total_emission) VALUES ('Rapeseed Oil', 3.7);
INSERT INTO non_livestock_food_product (food_product, total_emission) VALUES ('Olive Oil', 6.0);
INSERT INTO non_livestock_food_product (food_product, total_emission) VALUES ('Tomatoes', 1.4);
INSERT INTO non_livestock_food_product (food_product, total_emission) VALUES ('Onions & Leeks', 0.3);
INSERT INTO non_livestock_food_product (food_product, total_emission) VALUES ('Root Vegetables', 0.3);
INSERT INTO non_livestock_food_product (food_product, total_emission) VALUES ('Brassicas', 0.4);
INSERT INTO non_livestock_food_product (food_product, total_emission) VALUES ('Other Vegetables', 0.5);
INSERT INTO non_livestock_food_product (food_product, total_emission) VALUES ('Citrus Fruit', 0.3);
INSERT INTO non_livestock_food_product (food_product, total_emission) VALUES ('Bananas', 0.799999999999999);
INSERT INTO non_livestock_food_product (food_product, total_emission) VALUES ('Apples', 0.3);
INSERT INTO non_livestock_food_product (food_product, total_emission) VALUES ('Berries & Grapes', 1.09999999999999);
INSERT INTO non_livestock_food_product (food_product, total_emission) VALUES ('Wine', 1.4);
INSERT INTO non_livestock_food_product (food_product, total_emission) VALUES ('Other Fruit', 0.7);
INSERT INTO non_livestock_food_product (food_product, total_emission) VALUES ('Coffee', 16.5);
INSERT INTO non_livestock_food_product (food_product, total_emission) VALUES ('Dark Chocolate', 18.7);


SELECT * 
FROM non_livestock_food_product;




