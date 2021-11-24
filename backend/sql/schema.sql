-- Your database schema goes here --
CREATE TABLE member(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), member jsonb);
CREATE TABLE category(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), category jsonb);
CREATE TABLE listings(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), memberID UUID, FOREIGN KEY (memberID) REFERENCES member(id), categoryID UUID, FOREIGN KEY(categoryID) REFERENCES category(id), listings jsonb);