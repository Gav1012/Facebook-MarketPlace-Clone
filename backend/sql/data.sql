-- Populate Your Tables Here --
-- categories
INSERT INTO category(id, parent, names) VALUES ('480939b6-95ce-430f-b30a-7d7c5e5a9c88',NULL,'Vehicles');
INSERT INTO category(id, parent, names) VALUES ('700e982d-15fb-4f2e-a9c0-6629d16730fd','480939b6-95ce-430f-b30a-7d7c5e5a9c88','Cars');
INSERT INTO category(id, parent, names) VALUES ('c082f693-dc37-47f3-8f01-7bc11c957594','480939b6-95ce-430f-b30a-7d7c5e5a9c88','Motorcycles');
INSERT INTO category(id, parent, names) VALUES ('add85f35-0199-4856-9dd6-324768eebdf3','480939b6-95ce-430f-b30a-7d7c5e5a9c88','RVs');
INSERT INTO category(id, parent, names) VALUES ('9d71dcc0-92bd-4105-ae08-45bac3da819a','480939b6-95ce-430f-b30a-7d7c5e5a9c88','Boats');
INSERT INTO category(id, parent, names) VALUES ('882b7132-c340-4d77-bcf1-3522b86526a8',NULL,'Apparel');
INSERT INTO category(id, parent, names) VALUES ('e2af758a-0c87-4710-a611-14a9ecbccc9a','882b7132-c340-4d77-bcf1-3522b86526a8','Clothing');
INSERT INTO category(id, parent, names) VALUES ('006915ba-51c1-4bb5-bcfe-5f45e59a5c3a','882b7132-c340-4d77-bcf1-3522b86526a8','Accessories');
INSERT INTO category(id, parent, names) VALUES ('3ad197ef-07ff-4ef3-8d57-4d8d1771fe01','882b7132-c340-4d77-bcf1-3522b86526a8','Shoes');
INSERT INTO category(id, parent, names) VALUES ('51a044c1-02bd-4ffa-9cc2-a44607c0c16e',NULL,'Electronics');
INSERT INTO category(id, parent, names) VALUES ('9c33bf00-e7b9-45a3-b910-9a53e1517c6d','51a044c1-02bd-4ffa-9cc2-a44607c0c16e','Computers');
INSERT INTO category(id, parent, names) VALUES ('7f6795b4-92a6-4030-b35d-f3d093f39fee','51a044c1-02bd-4ffa-9cc2-a44607c0c16e','Cellphones');
INSERT INTO category(id, parent, names) VALUES ('4554e2ab-c238-4b99-a4fc-f132c4a6b4f6','51a044c1-02bd-4ffa-9cc2-a44607c0c16e','TVs');
INSERT INTO category(id, parent, names) VALUES ('dfdd0784-ed34-4eb8-9259-728cec089642',NULL,'Sporting Goods');
INSERT INTO category(id, parent, names) VALUES ('2adb69f4-9529-4991-b502-af060ceb6295','dfdd0784-ed34-4eb8-9259-728cec089642','Sports Equipment');
INSERT INTO category(id, parent, names) VALUES ('ac13a949-5aac-4960-b192-d0afddd21783','dfdd0784-ed34-4eb8-9259-728cec089642','Camping');

-- users
INSERT INTO member(id, member) VALUES ('fd4e8e32-bef3-41c0-b111-61f695ea3912','{"name":"Jason Bourne", "password":"$2b$04$yYw78cmFe/VQhKDFWG4HG.LZLIPOVR5w0z/7/7MSM9ngWpaflFygO", "email":"jasonbourne@gmail.com"}');
INSERT INTO member(id, member) VALUES ('59599566-32d7-4cff-a293-48178ff58876','{"name":"Superman", "password":"$2b$04$9Rk7QXhcI6h0uYkLeTahp.s0VCV8jQmV7Nj0Dc2VEKtv5pCEfip0u", "email":"supermane@gmail.com"}');
INSERT INTO member(id, member) VALUES ('ff761662-3505-4fcf-b44d-e7307bb586c6','{"name":"David Harrison", "password":"$2b$04$e17gHnkUDwGrE1A.PdCyG.jh8pMW26jWkKEkqz2IDylWp2HFRRqae", "email":"davidharrison@gmail.com"}');


-- listings
INSERT INTO listing(id, categoryID, memberID, listings) VALUES ('da01bf73-a3f1-42ae-8203-f4835585671b','700e982d-15fb-4f2e-a9c0-6629d16730fd','fd4e8e32-bef3-41c0-b111-61f695ea3912','{"title":"really cool car","content":"it''s really cool","price":"$1,000","createDate":"November 23, 2021","comments":[],"images":[{"link":"https://upload.wikimedia.org/wikipedia/commons/b/b1/Beater_Nissan.jpg"}, {"link": "https://render.fineartamerica.com/images/rendered/default/flat/puzzle/images/artworkimages/medium/1/jalopy-skip-hunt.jpg?&targetx=-77&targety=0&imagewidth=1154&imageheight=750&modelwidth=1000&modelheight=750&backgroundcolor=716626&orientation=0&producttype=puzzle-18-24&brightness=253&v=6"}, {"link": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_-rv4Zn6HB7r37LXAmAgDhGjmvqto9Om_DA&usqp=CAU"}]}');
INSERT INTO listing(id, categoryID, memberID, listings) VALUES ('101e6e3f-f843-4984-95f8-c6305162b1cd','c082f693-dc37-47f3-8f01-7bc11c957594','fd4e8e32-bef3-41c0-b111-61f695ea3912','{"title":"real motorcycle","content":"this is not a scam","price":"$100,000,000","createDate":"November 03, 2021","comments":[],"images":[{"link":"https://moneyinc.com/wp-content/uploads/2021/04/Futuristic-Motorcycle-Concepts-750x563.jpg"}]}');
INSERT INTO listing(id, categoryID, memberID, listings) VALUES ('61d21627-0c63-4b85-9ae1-c7b668009348','e2af758a-0c87-4710-a611-14a9ecbccc9a','59599566-32d7-4cff-a293-48178ff58876','{"title":"grey shirt","content":"it''s a grey shirt","price":"$3","createDate":"November 22, 2021","comments":[],"images":[{"link":"https://media.istockphoto.com/photos/grey-shirt-design-template-picture-id1136907894?k=20&m=1136907894&s=170667a&w=0&h=mBacJ40Wo_3XOH5_IO0r0CFQmJEg0aeQA4kFdMxUjfI="}]}');
INSERT INTO listing(id, categoryID, memberID, listings) VALUES ('91bc30cf-186e-4de8-a4c1-37a1449059c7','006915ba-51c1-4bb5-bcfe-5f45e59a5c3a','ff761662-3505-4fcf-b44d-e7307bb586c6','{"title":"gold necklace","content":"it is made out of gold","price":"$582","createDate":"November 23, 2021","comments":[],"images":[{"link":"https://slimages.macysassets.com/is/image/MCY/products/4/optimized/884154_fpx.tif?op_sharpen=1&wid=700&hei=855&fit=fit,1"}]}');
-- filter
INSERT INTO filter(id, parent, names, attributes) VALUES ('480939b6-95ce-430f-b30a-7d7c5e5a9c88',NULL,'Vehicles', NULL);
INSERT INTO filter(id, parent, names, attributes) VALUES ('bd03c850-a20e-46f7-a02b-4016fa7084fd','480939b6-95ce-430f-b30a-7d7c5e5a9c88','Vehicle Color', '{"color1":"White","color2":"Grey","color3":"Black", "color4":"Red","color5":"Blue"}');
INSERT INTO filter(id, parent, names, attributes) VALUES ('882b7132-c340-4d77-bcf1-3522b86526a8',NULL,'Apparel', NULL);
INSERT INTO filter(id, parent, names, attributes) VALUES ('0fab243a-744c-4cd7-b0f2-7a1a3afd5197','882b7132-c340-4d77-bcf1-3522b86526a8','Apparel Type', '{"type1":"Mens","type2":"Womens"}');
INSERT INTO filter(id, parent, names, attributes) VALUES ('51a044c1-02bd-4ffa-9cc2-a44607c0c16e',NULL,'Electronics', NULL);
INSERT INTO Filter(id, parent, names, attributes) VALUES ('6ee3737d-e0fa-4308-ba35-f1c65f5c2f2e','51a044c1-02bd-4ffa-9cc2-a44607c0c16e','Electronics Brand', '{"brand1":"Sony","brand2":"Samsung","brand3":"Apple"}');
INSERT INTO filter(id, parent, names, attributes) VALUES ('dfdd0784-ed34-4eb8-9259-728cec089642',NULL,'Sporting Goods');
INSERT INTO filter(id, parent, names, attributes) VALUES ('610e2636-0cbf-4c8e-ac8c-588650756572','dfdd0784-ed34-4eb8-9259-728cec089642','Condition', '{"conition1":"New","condition2":"Used"}');
