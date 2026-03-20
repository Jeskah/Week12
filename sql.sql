CREATE TABLE ingredients (
  ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT,
  is_vegan BOOLEAN DEFAULT false,
  is_vegetarian BOOLEAN DEFAULT false
);

INSERT INTO ingredients (name, type, is_vegan, is_vegetarian)
VALUES
('Egg', 'Protien', false, false),
('Flour', 'Staple', true, true),
('Milk', 'Dairy', false, true),
('Bread', 'Staple', true, true),
('Bacon', 'Meat', false, false),
('Lemon', 'Fruit', true, true),
('Onion', 'Vegetable', true, true),
('Honey', 'Sweetner', false, true);


CREATE TABLE meals (
  ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  is_vegan BOOLEAN DEFAULT false,
  is_vegetarian BOOLEAN DEFAULT false,
  difficulty TEXT,
  is_public BOOLEAN DEFAULT true
);

INSERT INTO meals (name, description, is_vegan, is_vegetarian, difficulty, is_public) 
VALUES 
('French Toast', 'Elegant and simple, pair with a syrup of your choice', false, true, 'Easy', true),
('Sweet Pancake', 'So many ways to pan a cake, here`s a traditional favourite', false, true, 'Skilled', true),
('Omlette', 'A strong go to to fuel up', false, false, 'Easy', 'true');

CREATE TABLE meal_ingredients (
  ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  meal_id INT REFERENCES meals(id) ON DELETE CASCADE,
  ingredient_id INT REFERENCES ingredients(id) ON DELETE CASCADE
);

INSERT INTO meal_ingredients (meal_id, ingredient_id)
VALUES
(1, 1), (1, 4), (2, 1), (2, 2), (2, 3), (2, 2), (2, 8);

SELECT * FROM meals
SELECT * FROM ingredients
SELECT * FROM meal_ingredients

SELECT 
  m.name,
  ARRAY_AGG(i.name) AS ingredients
FROM meals m
JOIN meal_ingredients mi ON m.id = mi.meal_id
JOIN ingredients i ON i.id = mi.ingredient_id
GROUP BY m.name;