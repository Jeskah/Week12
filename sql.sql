CREATE TABLE ingredients (
  ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT,
  is_vegan BOOLEAN DEFAULT false,
  is_vegetarian BOOLEAN DEFAULT false
);

INSERT INTO ingredients (name, type, is_vegan, is_vegetarian)
VALUES
('Egg', 'Protein', false, false),
('Flour', 'Staple', true, true),
('Milk', 'Dairy', false, true),
('Bread', 'Staple', true, true),
('Bacon', 'Meat', false, false),
('Lemon', 'Fruit', true, true),
('Onion', 'Vegetable', true, true),
('Honey', 'Sweetener', false, true);

CREATE TABLE meals (
  ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  is_vegan BOOLEAN DEFAULT false,
  is_vegetarian BOOLEAN DEFAULT false,
  difficulty TEXT CHECK (difficulty IN ('Easy', 'Medium', 'Skilled', 'Hells Kicthen')),
  is_public BOOLEAN DEFAULT true,
  img_url TEXT,
  prep TEXT
);

INSERT INTO meals (name, description, is_vegan, is_vegetarian, difficulty, is_public) 
VALUES 
('French Toast', 'Elegant and simple, pair with a syrup of your choice', false, true, 'Easy', true),
('Sweet Pancake', 'So many ways to pan a cake, here`s a traditional favourite', false, true, 'Skilled', true),
('Omelette', 'A strong go to to fuel up', false, false, 'Easy', true);

CREATE TABLE meal_ingredients (
  ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  meal_id INT NOT NULL REFERENCES meals(id) ON DELETE CASCADE,
  ingredient_id INT NOT NULL REFERENCES ingredients(id) ON DELETE CASCADE
);

SELECT 
  m.name,
  ARRAY_AGG(i.name) AS ingredients
FROM meals m
JOIN meal_ingredients mi ON m.id = mi.meal_id
JOIN ingredients i ON i.id = mi.ingredient_id
GROUP BY m.name;

CREATE TABLE tags (
  ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  tag_name TEXT UNIQUE
);

INSERT INTO tags (tag_name) VALUES
('mamscooking'), 
('go-to-food'),
('indulgent'),
('ewwww'), 
('strangely-good'), 
('masterchef'), 
('wild'), 
('spring'), 
('traditional'), 
('comfort_food'), 
('only3');

CREATE TABLE meal_tags (
  meal_id INT NOT NULL REFERENCES meals(id) ON DELETE CASCADE,
  tag_id INT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (meal_id, tag_id)
);

CREATE TABLE users (
  ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  clerk_id TEXT UNIQUE,
  username TEXT UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_favourites (
  ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  meal_id INT NOT NULL REFERENCES meals(id) ON DELETE CASCADE,
  UNIQUE (user_id, meal_id)
);

CREATE TABLE user_saves (
  ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  meal_id INT NOT NULL REFERENCES meals(id) ON DELETE CASCADE,
  UNIQUE (user_id, meal_id)
);

CREATE TABLE reviews (
  ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  meal_id INT NOT NULL REFERENCES meals(id) ON DELETE CASCADE,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (clerk_id, username) VALUES ('clerk_id_placeholder', 'HungryJess'),
('clerk_id_placeholder', 'HungryPatience'),
('clerk_id_placeholder', 'HungryAyrton'),
('clerk_id_placeholder', 'HungrySeyitali');