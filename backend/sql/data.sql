-- Dummy Data --
INSERT INTO dummy (created) VALUES (current_timestamp);

-- Populate Your Tables Here --
-- categories
INSERT INTO category(id, parent, names) VALUES ('480939b6-95ce-430f-b30a-7d7c5e5a9c88',NULL,'Vehicles');
INSERT INTO category(id, parent, names) VALUES ('700e982d-15fb-4f2e-a9c0-6629d16730fd','480939b6-95ce-430f-b30a-7d7c5e5a9c88','Cars');
INSERT INTO category(id, parent, names) VALUES ('c082f693-dc37-47f3-8f01-7bc11c957594','480939b6-95ce-430f-b30a-7d7c5e5a9c88','Motorcycles');
INSERT INTO category(id, parent, names) VALUES ('882b7132-c340-4d77-bcf1-3522b86526a8',NULL,'Apparel');
INSERT INTO category(id, parent, names) VALUES ('e2af758a-0c87-4710-a611-14a9ecbccc9a','882b7132-c340-4d77-bcf1-3522b86526a8','Clothing');
INSERT INTO category(id, parent, names) VALUES ('006915ba-51c1-4bb5-bcfe-5f45e59a5c3a','882b7132-c340-4d77-bcf1-3522b86526a8','Accessories');

-- users
INSERT INTO member(id, member) VALUES ('fd4e8e32-bef3-41c0-b111-61f695ea3912','{"name":"Jason Bourne", "password":"secretman123", "email":"jasonbourne@gmail.com"}');
INSERT INTO member(id, member) VALUES ('59599566-32d7-4cff-a293-48178ff58876','{"name":"Superman", "password":"kryptonite", "email":"supermane@gmail.com"}');
INSERT INTO member(id, member) VALUES ('ff761662-3505-4fcf-b44d-e7307bb586c6','{"name":"David Harrison", "password":"cse183", "email":"davidharrison@gmail.com"}');


-- listings
INSERT INTO listing(id, categoryID, memberID, listings) VALUES ('da01bf73-a3f1-42ae-8203-f4835585671b','700e982d-15fb-4f2e-a9c0-6629d16730fd','fd4e8e32-bef3-41c0-b111-61f695ea3912','{"title":"really cool car","content":"it''s really cool","price":"$1,000","createDate":"November 23, 2021","comments":[],"images":[{"link":"https://upload.wikimedia.org/wikipedia/commons/b/b1/Beater_Nissan.jpg"}, {"link": "https://render.fineartamerica.com/images/rendered/default/flat/puzzle/images/artworkimages/medium/1/jalopy-skip-hunt.jpg?&targetx=-77&targety=0&imagewidth=1154&imageheight=750&modelwidth=1000&modelheight=750&backgroundcolor=716626&orientation=0&producttype=puzzle-18-24&brightness=253&v=6"}, {"link": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_-rv4Zn6HB7r37LXAmAgDhGjmvqto9Om_DA&usqp=CAU"}]}');
INSERT INTO listing(id, categoryID, memberID, listings) VALUES ('101e6e3f-f843-4984-95f8-c6305162b1cd','c082f693-dc37-47f3-8f01-7bc11c957594','fd4e8e32-bef3-41c0-b111-61f695ea3912','{"title":"real motorcycle","content":"this is not a scam","price":"$100,000,000","createDate":"November 03, 2021","comments":[],"images":[{"link":"https://moneyinc.com/wp-content/uploads/2021/04/Futuristic-Motorcycle-Concepts-750x563.jpg"}]}');
INSERT INTO listing(id, categoryID, memberID, listings) VALUES ('61d21627-0c63-4b85-9ae1-c7b668009348','e2af758a-0c87-4710-a611-14a9ecbccc9a','59599566-32d7-4cff-a293-48178ff58876','{"title":"grey shirt","content":"it''s a grey shirt","price":"$3","createDate":"November 22, 2021","comments":[],"images":[{"link":"https://media.istockphoto.com/photos/grey-shirt-design-template-picture-id1136907894?k=20&m=1136907894&s=170667a&w=0&h=mBacJ40Wo_3XOH5_IO0r0CFQmJEg0aeQA4kFdMxUjfI="}]}');
INSERT INTO listing(id, categoryID, memberID, listings) VALUES ('91bc30cf-186e-4de8-a4c1-37a1449059c7','006915ba-51c1-4bb5-bcfe-5f45e59a5c3a','ff761662-3505-4fcf-b44d-e7307bb586c6','{"title":"gold necklace","content":"it is made out of gold","price":"$582","createDate":"November 23, 2021","comments":[],"images":[{"link":"https://slimages.macysassets.com/is/image/MCY/products/4/optimized/884154_fpx.tif?op_sharpen=1&wid=700&hei=855&fit=fit,1"}]}');
