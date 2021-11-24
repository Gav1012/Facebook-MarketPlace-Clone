-- Your database schema goes here --
-- CREATE TABLE member(id text UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), member jsonb);
-- CREATE TABLE category(id text UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), category jsonb);
-- CREATE TABLE listing(id text UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),  categoryID text, FOREIGN KEY(categoryID) REFERENCES category(id), memberID text, FOREIGN KEY (memberID) REFERENCES member(id), listings jsonb);
-- -- Your database schema goes here --
-- CREATE TABLE member(id text UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), member jsonb);
-- CREATE TABLE category(id text UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), category jsonb);
-- CREATE TABLE listing(id text UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), categoryID text, memberID text, listings jsonb);
CREATE TABLE member(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), member jsonb);
CREATE TABLE category(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), parent UUID, names VARCHAR(100));
-- CREATE TABLE listing(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),  categoryID UUID, memberID UUID, listings jsonb);
CREATE TABLE listing(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),  categoryID UUID, FOREIGN KEY(categoryID) REFERENCES category(id), memberID UUID, FOREIGN KEY (memberID) REFERENCES member(id), listings jsonb);
-- CREATE TABLE listing(id text UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), categoryID text, memberID text, listings jsonb);