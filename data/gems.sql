CREATE TABLE IF NOT EXISTS gems (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  origin TEXT NOT NULL,
  carat TEXT NOT NULL,
  price TEXT NOT NULL DEFAULT 'POA',
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  colour TEXT NOT NULL
);

DELETE FROM gems;

INSERT INTO gems (id, name, type, origin, carat, price, image, description, colour) VALUES
  (1, 'Midnight Sapphire', 'Sapphire', 'Sri Lanka', '3.42 ct', 'POA', '/images/midnight-sapphire.jpg', 'A deep, velvety blue with an almost ink-like saturation. This unheated oval carries a quiet, exceptional glow.', 'Blue'),
  (2, 'Garden Emerald', 'Emerald', 'Colombia', '2.18 ct', '$8,400', '/images/garden-emerald.jpg', 'A vivid green emerald with a lively garden of inclusions and a beautifully balanced rectangular cut.', 'Green'),
  (3, 'Rosecut Ruby', 'Ruby', 'Mozambique', '1.76 ct', '$5,900', '/images/rosecut-ruby.jpg', 'A glowing raspberry-red ruby, rose-cut by hand to preserve its natural, softly luminous character.', 'Red'),
  (4, 'Golden Beryl', 'Other', 'Brazil', '5.06 ct', '$3,200', '/images/golden-beryl.jpg', 'Warm champagne tones meet a bright, open cut in this generous golden beryl from Minas Gerais.', 'Yellow'),
  (5, 'Twilight Spinel', 'Other', 'Vietnam', '1.92 ct', '$4,750', '/images/twilight-spinel.jpg', 'A rare violet-grey spinel with a moody shift in changing light and a crisp cushion cut.', 'Violet'),
  (6, 'Seafoam Tourmaline', 'Other', 'Namibia', '4.11 ct', '$6,100', '/images/seafoam-tourmaline.jpg', 'A fresh seafoam tourmaline with extraordinary clarity and a soft, watery gradient of colour.', 'Green');
