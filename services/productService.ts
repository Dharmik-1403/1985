import { Product, Category } from '../types';

// ----------------------------------------------------------------------
// DATASETS WITH SPECIFIC IMAGES
// ----------------------------------------------------------------------

const SHOES_DB = [
  // NIKE JORDAN
  { name: 'Air Jordan 1 High "Chicago"', brand: 'Nike Air Jordan', price: 18995, img: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800&auto=format&fit=crop' },
  { name: 'Air Jordan 1 Retro High OG "Mocha"', brand: 'Nike Air Jordan', price: 17500, img: 'https://images.unsplash.com/photo-1600269452135-494e8c549be5?q=80&w=800&auto=format&fit=crop' },
  { name: 'Air Jordan 4 Retro "Black Cat"', brand: 'Nike Air Jordan', price: 22000, img: 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?q=80&w=800&auto=format&fit=crop' },
  { name: 'Air Jordan 1 Low "Travis Scott"', brand: 'Nike Air Jordan', price: 45000, img: 'https://images.unsplash.com/photo-1586525198428-225f6f12c240?q=80&w=800&auto=format&fit=crop' },
  { name: 'Air Jordan 1 Mid "Bred"', brand: 'Nike Air Jordan', price: 11995, img: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=800&auto=format&fit=crop' },
  { name: 'Air Jordan 11 Retro "Cool Grey"', brand: 'Nike Air Jordan', price: 19995, img: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=800&auto=format&fit=crop' },

  // NIKE AIR FORCE & OTHERS
  { name: 'Air Force 1 \'07 Triple White', brand: 'Nike Air Force', price: 8995, img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop' },
  { name: 'Air Force 1 Shadow "Pastel"', brand: 'Nike Air Force', price: 10500, img: 'https://images.unsplash.com/photo-1556906781-9a412961d28c?q=80&w=800&auto=format&fit=crop' },
  { name: 'Nike Dunk Low "Panda"', brand: 'Nike', price: 9995, img: 'https://images.unsplash.com/photo-1637844527275-66da641d3992?q=80&w=800&auto=format&fit=crop' }, // Specific Panda look
  { name: 'Nike Air Max 90 "Infrared"', brand: 'Nike', price: 11500, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop' },
  { name: 'Nike Blazer Mid \'77', brand: 'Nike', price: 8500, img: 'https://images.unsplash.com/photo-1520256862855-3982eb6c5865?q=80&w=800&auto=format&fit=crop' },
  { name: 'Nike SB Dunk Low "Travis"', brand: 'Nike', price: 14000, img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop' },

  // ADIDAS
  { name: 'Adidas Yeezy Boost 350 V2', brand: 'Adidas', price: 24000, img: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aef4?q=80&w=800&auto=format&fit=crop' },
  { name: 'Adidas Superstar Original', brand: 'Adidas', price: 7999, img: 'https://images.unsplash.com/photo-1518002171953-a080ee8029a2?q=80&w=800&auto=format&fit=crop' },
  { name: 'Adidas Stan Smith Green', brand: 'Adidas', price: 6999, img: 'https://images.unsplash.com/photo-1550395905-5f65355694c9?q=80&w=800&auto=format&fit=crop' },
  { name: 'Adidas NMD_R1 Black', brand: 'Adidas', price: 12500, img: 'https://images.unsplash.com/photo-1539185441755-94337583d978?q=80&w=800&auto=format&fit=crop' },
  { name: 'Adidas Forum Low White', brand: 'Adidas', price: 9999, img: 'https://images.unsplash.com/photo-1608667508764-33cf0726b13a?q=80&w=800&auto=format&fit=crop' },
  { name: 'Adidas Ultraboost 22', brand: 'Adidas', price: 16999, img: 'https://images.unsplash.com/photo-1560769629-975e13f0c470?q=80&w=800&auto=format&fit=crop' },

  // REEBOK
  { name: 'Reebok Club C 85 Vintage', brand: 'Reebok', price: 6500, img: 'https://images.unsplash.com/photo-1627993427909-5c4d57c2a44f?q=80&w=800&auto=format&fit=crop' },
  { name: 'Reebok Classic Leather', brand: 'Reebok', price: 5999, img: 'https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?q=80&w=800&auto=format&fit=crop' },
  { name: 'Reebok Instapump Fury', brand: 'Reebok', price: 13500, img: 'https://images.unsplash.com/photo-1584735174965-98cb29ad9219?q=80&w=800&auto=format&fit=crop' },
  { name: 'Reebok Question Mid "Iverson"', brand: 'Reebok', price: 12999, img: 'https://images.unsplash.com/photo-1579338908476-3a3a1d71a706?q=80&w=800&auto=format&fit=crop' },

  // PUMA
  { name: 'Puma RS-X Reinvent', brand: 'Puma', price: 8999, img: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop' },
  { name: 'Puma Suede Classic Red', brand: 'Puma', price: 5499, img: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=800&auto=format&fit=crop' },
  { name: 'Puma Cali Star', brand: 'Puma', price: 6999, img: 'https://images.unsplash.com/photo-1605408499391-6368c0510f63?q=80&w=800&auto=format&fit=crop' },
  { name: 'Puma Future Rider', brand: 'Puma', price: 6499, img: 'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?q=80&w=800&auto=format&fit=crop' },

  // CAMPUS
  { name: 'Campus High Top Street', brand: 'Campus', price: 1899, img: 'https://images.unsplash.com/photo-1560769629-975e13f0c470?q=80&w=800&auto=format&fit=crop' },
  { name: 'Campus Active Run', brand: 'Campus', price: 1499, img: 'https://images.unsplash.com/photo-1562183241825-a903d9f42d29?q=80&w=800&auto=format&fit=crop' },
  { name: 'Campus Urban Walker', brand: 'Campus', price: 1299, img: 'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=80&w=800&auto=format&fit=crop' },
  { name: 'Campus North Plus', brand: 'Campus', price: 1599, img: 'https://images.unsplash.com/photo-1512374382149-233c48084275?q=80&w=800&auto=format&fit=crop' },
];

const HOODIES_DB = [
  // BRANDED
  { name: 'Nike Sportswear Club Fleece', brand: 'Nike', price: 3500, img: 'https://images.unsplash.com/photo-1556906781-9a412961d28c?q=80&w=800&auto=format&fit=crop' }, // Grey Nike Style
  { name: 'Nike Tech Fleece Black', brand: 'Nike', price: 6500, img: 'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?q=80&w=800&auto=format&fit=crop' },
  { name: 'Adidas Trefoil Hoodie', brand: 'Adidas', price: 4200, img: 'https://images.unsplash.com/photo-1618223689406-384392231268?q=80&w=800&auto=format&fit=crop' }, // White hoodie details
  { name: 'Puma Essentials Logo', brand: 'Puma', price: 2999, img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop' },
  { name: 'GAP Arch Logo Hoodie Navy', brand: 'Gap', price: 3999, img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop' },
  { name: 'H&M Oversized Cotton', brand: 'H&M', price: 1999, img: 'https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=800&auto=format&fit=crop' },
  { name: 'Benetton United Hoodie Green', brand: 'United Colors of Benetton', price: 3200, img: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=800&auto=format&fit=crop' },
  { name: 'Benetton Basic Red', brand: 'United Colors of Benetton', price: 3200, img: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=800&auto=format&fit=crop' },
  { name: 'Essentials Fear of God (Rep)', brand: 'Streetwear', price: 4500, img: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=800&auto=format&fit=crop' },
  { name: 'Carhartt WIP Hoodie', brand: 'Streetwear', price: 6800, img: 'https://images.unsplash.com/photo-1513379733131-47fc74b45fc7?q=80&w=800&auto=format&fit=crop' },

  // ANIME / GRAPHIC
  { name: 'Jujutsu Kaisen Gojo Print', brand: 'Anime Style', price: 2499, img: 'https://images.unsplash.com/photo-1617114919297-3c8ddbec014e?q=80&w=800&auto=format&fit=crop' },
  { name: 'Naruto Akatsuki Cloud', brand: 'Anime Style', price: 2499, img: 'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?q=80&w=800&auto=format&fit=crop' },
  { name: 'One Piece Luffy Gear 5', brand: 'Anime Style', price: 2599, img: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800&auto=format&fit=crop' },
  { name: 'Attack on Titan Wings', brand: 'Anime Style', price: 2499, img: 'https://images.unsplash.com/photo-1492446845049-9c50cc313f00?q=80&w=800&auto=format&fit=crop' },
  { name: 'Demon Slayer Tanjiro Check', brand: 'Anime Style', price: 2399, img: 'https://images.unsplash.com/photo-1504194921103-f8b80cadd5e4?q=80&w=800&auto=format&fit=crop' },
  { name: 'Tokyo Revengers Draken', brand: 'Anime Style', price: 2499, img: 'https://images.unsplash.com/photo-1572495532056-8583af1cbae0?q=80&w=800&auto=format&fit=crop' }, // Yellow vibe
  { name: 'Cyberpunk Edgerunners', brand: 'Anime Style', price: 2699, img: 'https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?q=80&w=800&auto=format&fit=crop' }, // Neon
  { name: 'Ghibli Totoro Minimal', brand: 'Anime Style', price: 2199, img: 'https://images.unsplash.com/photo-1530655648858-bd4588e401b2?q=80&w=800&auto=format&fit=crop' }, // Grey
  { name: 'Dragon Ball Z Goku', brand: 'Anime Style', price: 2499, img: 'https://images.unsplash.com/photo-1548883354-94bcfe321cbb?q=80&w=800&auto=format&fit=crop' },
  { name: 'Berserk Guts Rage', brand: 'Anime Style', price: 2599, img: 'https://images.unsplash.com/photo-1484517586036-ed3ec9e3d64b?q=80&w=800&auto=format&fit=crop' },
];

const SHIRTS_DB = [
  // RAYMOND
  { name: 'Raymond Premium Cotton White', brand: 'Raymond', price: 2499, img: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?q=80&w=800&auto=format&fit=crop' },
  { name: 'Raymond Royal Blue Formal', brand: 'Raymond', price: 2699, img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop' },
  { name: 'Raymond Textured Grey', brand: 'Raymond', price: 2899, img: 'https://images.unsplash.com/photo-1589719391036-69e160e1f7c0?q=80&w=800&auto=format&fit=crop' },
  { name: 'Raymond Black Satin', brand: 'Raymond', price: 3299, img: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop' },
  
  // PETER ENGLAND
  { name: 'Peter England Checkered Slim', brand: 'Peter England', price: 1899, img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop' },
  { name: 'Peter England Solid Navy', brand: 'Peter England', price: 1799, img: 'https://images.unsplash.com/photo-1598032448182-93255667e2e6?q=80&w=800&auto=format&fit=crop' },
  { name: 'Peter England Linen Blend', brand: 'Peter England', price: 2199, img: 'https://images.unsplash.com/photo-1621072118058-1936e7886470?q=80&w=800&auto=format&fit=crop' },
  { name: 'Peter England Oxford Blue', brand: 'Peter England', price: 1999, img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop' },

  // ALLEN SOLLY
  { name: 'Allen Solly Yellow Friday', brand: 'Allen Solly', price: 2299, img: 'https://images.unsplash.com/photo-1563630381190-77c336ea545a?q=80&w=800&auto=format&fit=crop' },
  { name: 'Allen Solly Pink Regular', brand: 'Allen Solly', price: 1999, img: 'https://images.unsplash.com/photo-1559551409-dadc959f76b8?q=80&w=800&auto=format&fit=crop' },
  { name: 'Allen Solly White Print', brand: 'Allen Solly', price: 2100, img: 'https://images.unsplash.com/photo-1622519407650-3df9883f76a5?q=80&w=800&auto=format&fit=crop' },
  { name: 'Allen Solly Casual Check', brand: 'Allen Solly', price: 1899, img: 'https://images.unsplash.com/photo-1594938298603-c8148c47e356?q=80&w=800&auto=format&fit=crop' },

  // PARK AVENUE & OTHERS
  { name: 'Park Avenue Dark Grey', brand: 'Park Avenue', price: 2400, img: 'https://images.unsplash.com/photo-1586078130702-d208859b6223?q=80&w=800&auto=format&fit=crop' },
  { name: 'Park Avenue Crisp White', brand: 'Park Avenue', price: 2500, img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop' },
  { name: 'Park Avenue Tuxedo Shirt', brand: 'Park Avenue', price: 4500, img: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800&auto=format&fit=crop' },
  { name: 'Ralph Lauren Oxford (Import)', brand: 'Ralph Lauren', price: 12000, img: 'https://images.unsplash.com/photo-1603252109303-27514432f839?q=80&w=800&auto=format&fit=crop' }, // Old Money
  { name: 'Brooks Brothers Non-Iron', brand: 'Brooks Brothers', price: 8000, img: 'https://images.unsplash.com/photo-1472417583565-62e7bdeda490?q=80&w=800&auto=format&fit=crop' },
  { name: 'Flannel Lumberjack Red', brand: 'Generic', price: 1500, img: 'https://images.unsplash.com/photo-1627885746011-2c067e2f5b66?q=80&w=800&auto=format&fit=crop' },
  { name: 'Linen Beige Summer', brand: 'Generic', price: 1800, img: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=800&auto=format&fit=crop' },
  { name: 'Mandarin Collar White', brand: 'Generic', price: 1600, img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop' },
];

const TSHIRTS_DB = [
  { name: 'Anime Oversize "Akira"', brand: 'Anime Studio', price: 1299, img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop' },
  { name: 'Anime Oversize "Evangelion"', brand: 'Anime Studio', price: 1299, img: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=800&auto=format&fit=crop' },
  { name: 'Streetwear Plain Black', brand: 'Urban Street', price: 999, img: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop' },
  { name: 'Streetwear Plain White', brand: 'Urban Street', price: 999, img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop' },
  { name: 'Graphic Tee "Retro 1985"', brand: 'Urban Street', price: 1199, img: 'https://images.unsplash.com/photo-1503341455253-b2e72333dbdb?q=80&w=800&auto=format&fit=crop' },
  { name: 'Graphic Tee "Tokyo"', brand: 'Urban Street', price: 1199, img: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=800&auto=format&fit=crop' },
  { name: 'Anime Oversize "Gundam"', brand: 'Anime Studio', price: 1399, img: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800&auto=format&fit=crop' },
  { name: 'Anime Oversize "Sailor Moon"', brand: 'Anime Studio', price: 1399, img: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=800&auto=format&fit=crop' },
  { name: 'Heavyweight Boxy Fit Grey', brand: 'Urban Street', price: 1499, img: 'https://images.unsplash.com/photo-1534450539339-65f9c6d5880e?q=80&w=800&auto=format&fit=crop' },
  { name: 'Heavyweight Boxy Fit Beige', brand: 'Urban Street', price: 1499, img: 'https://images.unsplash.com/photo-1527719327859-ac9ce0131f18?q=80&w=800&auto=format&fit=crop' },
  { name: 'Anime Oversize "Chainsaw Man"', brand: 'Anime Studio', price: 1299, img: 'https://images.unsplash.com/photo-1515964891157-df422f534839?q=80&w=800&auto=format&fit=crop' },
  { name: 'Anime Oversize "Spy x Family"', brand: 'Anime Studio', price: 1299, img: 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=800&auto=format&fit=crop' },
  { name: 'Vintage Wash Black', brand: 'Urban Street', price: 1599, img: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop' },
  { name: 'Vintage Wash Brown', brand: 'Urban Street', price: 1599, img: 'https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?q=80&w=800&auto=format&fit=crop' },
  { name: 'Anime Oversize "Haikyuu"', brand: 'Anime Studio', price: 1299, img: 'https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?q=80&w=800&auto=format&fit=crop' },
  { name: 'Anime Oversize "Blue Lock"', brand: 'Anime Studio', price: 1299, img: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop' },
  { name: 'Tie Dye Splash', brand: 'Urban Street', price: 1699, img: 'https://images.unsplash.com/photo-1485230948866-61e029c20f01?q=80&w=800&auto=format&fit=crop' },
  { name: 'Striped Sailor Tee', brand: 'Urban Street', price: 1199, img: 'https://images.unsplash.com/photo-1564859228273-274232fdb516?q=80&w=800&auto=format&fit=crop' },
  { name: 'Pocket Tee Minimal', brand: 'Urban Street', price: 899, img: 'https://images.unsplash.com/photo-1532202193792-e95ef22f1bce?q=80&w=800&auto=format&fit=crop' },
  { name: 'Long Sleeve Graphic', brand: 'Urban Street', price: 1399, img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop' },
  { name: 'Anime Oversize "Bleach"', brand: 'Anime Studio', price: 1299, img: 'https://images.unsplash.com/photo-1633966887768-64f9a421a7b5?q=80&w=800&auto=format&fit=crop' },
  { name: 'Anime Oversize "Hunter x Hunter"', brand: 'Anime Studio', price: 1299, img: 'https://images.unsplash.com/photo-1525171254930-643fc658b64e?q=80&w=800&auto=format&fit=crop' },
  { name: 'Grunge Distressed', brand: 'Urban Street', price: 1799, img: 'https://images.unsplash.com/photo-1416339134316-0e91dc9ded92?q=80&w=800&auto=format&fit=crop' },
  { name: 'Earth Tone Olive', brand: 'Urban Street', price: 999, img: 'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?q=80&w=800&auto=format&fit=crop' },
  { name: 'Back Print "Dragon"', brand: 'Urban Street', price: 1299, img: 'https://images.unsplash.com/photo-1485145782098-4f5fd605a66b?q=80&w=800&auto=format&fit=crop' },
  { name: 'Back Print "Rose"', brand: 'Urban Street', price: 1299, img: 'https://images.unsplash.com/photo-1555690623-080e22703bcc?q=80&w=800&auto=format&fit=crop' },
  { name: 'Muscle Fit Black', brand: 'Urban Street', price: 899, img: 'https://images.unsplash.com/photo-1536243297741-546b7996336a?q=80&w=800&auto=format&fit=crop' },
  { name: 'Muscle Fit White', brand: 'Urban Street', price: 899, img: 'https://images.unsplash.com/photo-1605218427368-23267d2e087c?q=80&w=800&auto=format&fit=crop' },
  { name: 'Polo T-Shirt Navy', brand: 'Urban Street', price: 1499, img: 'https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=800&auto=format&fit=crop' },
  { name: 'Raglan Sleeve Baseball', brand: 'Urban Street', price: 1199, img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop' },
];

const JEANS_DB = [
  // LEVIS
  { name: 'Levi\'s 501 Original Blue', brand: 'Levis', price: 4500, img: 'https://images.unsplash.com/photo-1542272454324-414fb2877312?q=80&w=800&auto=format&fit=crop' },
  { name: 'Levi\'s 511 Slim Fit Black', brand: 'Levis', price: 3999, img: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=800&auto=format&fit=crop' },
  { name: 'Levi\'s 512 Tapered Grey', brand: 'Levis', price: 4200, img: 'https://images.unsplash.com/photo-1604176354204-9268737828c4?q=80&w=800&auto=format&fit=crop' },
  { name: 'Levi\'s Trucker Jacket', brand: 'Levis', price: 5500, img: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=800&auto=format&fit=crop' },
  { name: 'Levi\'s Ripped Knee', brand: 'Levis', price: 4800, img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop' },

  // PEPE
  { name: 'Pepe Jeans London Skinny', brand: 'Pepe', price: 3200, img: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=800&auto=format&fit=crop' },
  { name: 'Pepe Jeans Regular Dark', brand: 'Pepe', price: 2999, img: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800&auto=format&fit=crop' },
  { name: 'Pepe Jeans Light Wash', brand: 'Pepe', price: 3100, img: 'https://images.unsplash.com/photo-1560243563-062bfc001d68?q=80&w=800&auto=format&fit=crop' },
  { name: 'Pepe Jeans Bootcut', brand: 'Pepe', price: 3400, img: 'https://images.unsplash.com/photo-1475180098004-ca77a66827be?q=80&w=800&auto=format&fit=crop' },
  
  // SPYKAR
  { name: 'Spykar Super Skinny', brand: 'Spykar', price: 2299, img: 'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?q=80&w=800&auto=format&fit=crop' },
  { name: 'Spykar Distressed Ice', brand: 'Spykar', price: 2499, img: 'https://images.unsplash.com/photo-1584370848010-d7cc6bc76e4f?q=80&w=800&auto=format&fit=crop' },
  { name: 'Spykar Cargo Jogger', brand: 'Spykar', price: 2699, img: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?q=80&w=800&auto=format&fit=crop' },
  { name: 'Spykar Biker Jeans', brand: 'Spykar', price: 2899, img: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop' },

  // DIESEL
  { name: 'Diesel Larkee Straight', brand: 'Diesel', price: 12000, img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop' },
  { name: 'Diesel Thommer Slim', brand: 'Diesel', price: 11500, img: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?q=80&w=800&auto=format&fit=crop' },
  { name: 'Diesel Sleenker Skinny', brand: 'Diesel', price: 13000, img: 'https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?q=80&w=800&auto=format&fit=crop' },
  { name: 'Diesel Black Gold', brand: 'Diesel', price: 15000, img: 'https://images.unsplash.com/photo-1514311721092-ee02f29ed37f?q=80&w=800&auto=format&fit=crop' },

  // WRANGLER & OTHERS
  { name: 'Wrangler Texas Fit', brand: 'Wrangler', price: 3200, img: 'https://images.unsplash.com/photo-1520627993056-b633045f0884?q=80&w=800&auto=format&fit=crop' },
  { name: 'Wrangler Retro Bootcut', brand: 'Wrangler', price: 3500, img: 'https://images.unsplash.com/photo-1582142345037-37d452d0d210?q=80&w=800&auto=format&fit=crop' },
  { name: 'Wrangler Greensboro', brand: 'Wrangler', price: 3100, img: 'https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?q=80&w=800&auto=format&fit=crop' },
  { name: 'Calvin Klein Skinny', brand: 'Calvin Klein', price: 6000, img: 'https://images.unsplash.com/photo-1454769263156-f61b7296dc63?q=80&w=800&auto=format&fit=crop' },
  { name: 'Armani Exchange Fit', brand: 'Armani Exchange', price: 8500, img: 'https://images.unsplash.com/photo-1614676471928-2ed3a2166699?q=80&w=800&auto=format&fit=crop' },
  { name: 'Zara Mom Jeans', brand: 'Zara', price: 2590, img: 'https://images.unsplash.com/photo-1595500055743-b92440938477?q=80&w=800&auto=format&fit=crop' },
  { name: 'H&M Relaxed Fit', brand: 'H&M', price: 2299, img: 'https://images.unsplash.com/photo-1598522137979-45927c62770d?q=80&w=800&auto=format&fit=crop' },
];

export const generateProducts = (): Product[] => {
  const products: Product[] = [];
  let idCounter = 1;

  const addCategory = (dataset: any[], category: Category, isAnimeDefault = false) => {
    dataset.forEach(item => {
      products.push({
        id: `prod-${idCounter++}`,
        name: item.name,
        brand: item.brand,
        category: category,
        price: item.price,
        description: `Authentic ${item.name} from ${item.brand}. Premium quality materials and craftsmanship.`,
        imageUrl: item.img,
        isAnime: isAnimeDefault || item.brand === 'Anime Studio' || item.name.includes('Anime')
      });
    });
  };

  addCategory(SHOES_DB, Category.SHOES);
  addCategory(HOODIES_DB, Category.HOODIES);
  addCategory(SHIRTS_DB, Category.SHIRTS);
  addCategory(TSHIRTS_DB, Category.TSHIRTS);
  addCategory(JEANS_DB, Category.JEANS);

  return products;
};
