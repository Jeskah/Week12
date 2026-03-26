CREATE TABLE ingredients (
  ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT,
  is_vegan BOOLEAN DEFAULT false,
  is_vegetarian BOOLEAN DEFAULT false,
  image_url TEXT
);

INSERT INTO ingredients (name, type, is_vegan, is_vegetarian, image_url) VALUES ('Red Pepper', 'Vegetable', true, true, 'https://png.pngtree.com/png-vector/20240913/ourmid/pngtree-red-peppers-png-image_13182047.png');


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
('only3'),
('breakfast'),
('lunch'),
('dinner');

CREATE TABLE meals (
  ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  is_vegan BOOLEAN DEFAULT false,
  is_vegetarian BOOLEAN DEFAULT false,
  difficulty TEXT CHECK (difficulty IN ('Easy', 'Medium', 'Skilled', 'Hells Kicthen')),
  is_public BOOLEAN DEFAULT true,
  image_url TEXT,
  prep TEXT,
  clerk_id TEXT;
);

INSERT INTO meals (name, description, is_vegan, is_vegetarian, difficulty, is_public, image_url, prep) VALUES ('Posh BLT', 'Made this once and it was so good thought I`d share', false, false, 'Easy', true, 'https://instakoch.de/wp-content/uploads/2022/09/BLT-Sandwich-010922-5x4-003-scaled.jpg', 'so quick, just do what you ususally would for a bacon sarnie and add all the extras, make it up as you go along');

CREATE TABLE meal_ingredients (
  ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  meal_id INT NOT NULL REFERENCES meals(id) ON DELETE CASCADE,
  ingredient_id INT NOT NULL REFERENCES ingredients(id) ON DELETE CASCADE
);

INSERT INTO meal_ingredients (meal_id, ingredient_id) VALUES 
(4, 13);

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

CREATE TABLE meal_tags (
  meal_id INT NOT NULL REFERENCES meals(id) ON DELETE CASCADE,
  tag_id INT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (meal_id, tag_id)
);



SELECT 
  m.*,
  COALESCE(mt.tags, '{}') AS tag_names
FROM meals m
LEFT JOIN (
    SELECT 
        meal_tags.meal_id,
        array_agg(tags.name) AS tags
    FROM meal_tags
    JOIN tags ON meal_tags.tag_id = tags.id
    GROUP BY meal_tags.meal_id
) mt ON m.id = mt.meal_id;

CREATE TABLE users (
  ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  clerk_id TEXT UNIQUE,
  username TEXT UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  bio TEXT
);

INSERT INTO users (users_id, bio,) VALUES (1, 'Far from a professional cook however I love experimenting in the kitchen and coming up with wild combinations of flavours, love indian cooking so if you`re like me with a dedicated cupboard of spices I can give you some ways to use them up!');

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

INSERT INTO users (clerk_id, username) VALUES 
('clerk_id_placeholder', 'HungryJess'),
('nSja99w0sop', 'HungryPatience'),
('3ca0Jsnmlls', 'HungryAyrton'),
('anWnns6taWA', 'HungrySeyitali');

