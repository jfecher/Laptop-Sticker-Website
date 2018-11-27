insert into brand (brand_id, name) values (0, "NBC");
insert into brand (brand_id, name) values(1, "Barstool Sports");
insert into brand (brand_id, name) values (2, "Mugatunes");
insert into brand (brand_id, name) values (3, "Northeastern University");
insert into brand (brand_id, name) values (4, "Boston.com");
insert into brand (brand_id, name) values (5, "2K Games");
insert into brand (brand_id, name) values (6, "MLB");
insert into brand (brand_id, name) values (7, "Harmonix");
insert into brand (brand_id, name) values (8, "Sony");
insert into brand (brand_id, name) values (9, "Dirty Floor Brown Ale");
insert into brand (brand_id, name) values (10, "Heartwood");

insert into color (color_id, name) values (0, "Black");
insert into color (color_id, name) values (1, "Red");
insert into color (color_id, name) values (2, "Blue");
insert into color (color_id, name) values (3, "Gray");
insert into color (color_id, name) values (4, "White");
insert into color (color_id, name) values (5, "Silver");
insert into color (color_id, name) values (6, "Orange");
insert into color (color_id, name) values (7, "Yellow");
insert into color (color_id, name) values (8, "Green");



insert into sticker (sticker_id, text, width, height, color_id, brand_id) values (0, "Dunder Mifflin Paper Company", 2, 1, 0, 0);
insert into sticker (sticker_id, text, width, height, color_id, brand_id) values (1, "Swanson Pyramid of Greatness", 4, 3, 1, 0);

insert into sticker (sticker_id, text, width, height, color_id, brand_id) values (2, "Viva La", 5, 4, 0, 1);
insert into sticker (sticker_id, text, width, height, color_id) values (3, "Las Olas Tacqueria", 4, 2, 2);
insert into sticker (sticker_id, text, width, height, color_id) values (4, "Trezor", 4, 2, 0);
insert into sticker (sticker_id, text, width, height, color_id, brand_id) values (5, "#NoShittyMusic", 8, 2, 0, 2);
insert into sticker (sticker_id, text, width, height, color_id) values (6, "Blenders Rocked With Pride Worldwide", 3, 3, 2);

insert into sticker (sticker_id, width, height, color_id) values (7, 3, 3, 3);
insert into sticker (sticker_id, text, width, height, color_id, brand_id) values (8, "Just Dewitt.", 3, 4, 0, 5);
insert into sticker (sticker_id, text, width, height, color_id) values (9, "10p", 3, 4, 1);
insert into sticker (sticker_id, text, width, height, color_id, brand_id) values (10, "NUSCI", 3, 3, 4, 3);
insert into sticker (sticker_id, text, width, height, color_id) values (11, "boston.com Keep up.", 3, 6, 0, 4);
insert into sticker (sticker_id, width, height, color_id, brand_id) values (12, 3, 3, 5, 5);
insert into sticker (sticker_id, text, width, height, color_id, brand_id) values (13, "Oakland Athletics", 4, 4, 4, 6);

insert into sticker (sticker_id, text, width, height, color_id) values (14, "Cardly", 4, 2, 0);

insert into sticker (sticker_id, width, height, color_id, brand_id) values (15, 4, 4, 4, 7);
insert into sticker (sticker_id, width, height, color_id, brand_id) values (16, 2, 2, 2, 8);
insert into sticker (sticker_id, text, width, height, color_id) values (17, "The Taco & Ice Cream Joint", 5, 3, 1);
insert into sticker (sticker_id, text, width, height, color_id, brand_id) values (18, "We Live Together", 3, 3, 4, 9);
insert into sticker (sticker_id, text, width, height, color_id, brand_id) values (19, "Can't You", 3, 3, 4, 10);

insert into sticker (sticker_id, text, width, height, color_id) values (20, "God is within her she will not fall", 3, 4, 0);
insert into sticker (sticker_id, text, width, height, color_id) values (21, "You are my sunshine", 3, 1, 0);
insert into sticker (sticker_id, text, width, height, color_id) values (22, "Boston", 4, 2, 0);
insert into sticker (sticker_id, text, width, height, color_id) values (23, "Colorado", 3, 1, 0);
insert into sticker (sticker_id, text, width, height, color_id) values (24, "Visit Uganda", 3, 3, 6);
insert into sticker (sticker_id, width, height, color_id) values (25, 2, 4, 0);
insert into sticker (sticker_id, text, width, height, color_id, brand_id) values (26, "Northeastern University", 4, 2, 0, 3);
insert into sticker (sticker_id, text, width, height, color_id) values (27, "Radiate Positivity", 3, 3, 7);
insert into sticker (sticker_id, width, height, color_id) values (28, 3, 3, 8);
insert into sticker (sticker_id, width, height, color_id) values (29, 2, 1, 0);

insert into person_has_sticker (person_id, sticker_id) values (45, 0);
insert into person_has_sticker (person_id, sticker_id) values (45, 1);

insert into person_has_sticker (person_id, sticker_id) values (46, 2);
insert into person_has_sticker (person_id, sticker_id) values (46, 3);
insert into person_has_sticker (person_id, sticker_id) values (46, 4);
insert into person_has_sticker (person_id, sticker_id) values (46, 5);
insert into person_has_sticker (person_id, sticker_id) values (46, 6);

insert into person_has_sticker (person_id, sticker_id) values (51, 7);
insert into person_has_sticker (person_id, sticker_id) values (51, 8);
insert into person_has_sticker (person_id, sticker_id) values (51, 9);
insert into person_has_sticker (person_id, sticker_id) values (51, 10);
insert into person_has_sticker (person_id, sticker_id) values (51, 11);
insert into person_has_sticker (person_id, sticker_id) values (51, 12);
insert into person_has_sticker (person_id, sticker_id) values (51, 13);

insert into person_has_sticker (person_id, sticker_id) values (52, 14);

insert into person_has_sticker (person_id, sticker_id) values (59, 15);
insert into person_has_sticker (person_id, sticker_id) values (59, 16);
insert into person_has_sticker (person_id, sticker_id) values (59, 17);
insert into person_has_sticker (person_id, sticker_id) values (59, 18);
insert into person_has_sticker (person_id, sticker_id) values (59, 19);
