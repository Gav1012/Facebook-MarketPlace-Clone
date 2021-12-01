-- Your database schema goes here --
DROP TABLE IF EXISTS member cascade;
DROP TABLE IF EXISTS category cascade;
DROP TABLE IF EXISTS listing;
DROP TABLE IF EXISTS filter;
CREATE TABLE member(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), member jsonb);
CREATE TABLE category(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), parent UUID, names VARCHAR(100));
CREATE TABLE listing(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),  categoryID UUID, FOREIGN KEY(categoryID) REFERENCES category(id), memberID UUID, FOREIGN KEY (memberID) REFERENCES member(id), listings jsonb);
CREATE TABLE filter(id UUID, parent UUID, names VARCHAR(100), attributes jsonb);