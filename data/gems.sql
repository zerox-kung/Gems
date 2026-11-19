CREATE TABLE IF NOT EXISTS gems (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  origin TEXT NOT NULL,
  carat TEXT NOT NULL,
  price TEXT NOT NULL DEFAULT 'POA',
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  colour TEXT NOT NULL,
  cut TEXT NOT NULL DEFAULT '',
  clarity TEXT NOT NULL DEFAULT '',
  dimensions TEXT NOT NULL DEFAULT '',
  treatment TEXT NOT NULL DEFAULT '',
  sampleId TEXT NOT NULL DEFAULT '',
  reportNote TEXT NOT NULL DEFAULT ''
);

DELETE FROM gems;

INSERT INTO gems (id, name, type, origin, carat, price, image, description, colour, cut, clarity, dimensions, treatment, sampleId, reportNote) VALUES
  (1, 'Midnight Sapphire', 'Sapphire', 'Sri Lanka', '3.42 ct', 'POA', '/images/midnight-sapphire.jpg', 'A deep blue oval with a dark, even tone and a bright return of light along its crown.', 'Blue', 'Oval mixed cut', 'Eye-clean (sample)', '9.2 × 7.1 × 4.8 mm', 'No heat indicated in sample data', 'DEMO-GEM-001', 'Training data only; not an independent grading report.'),
  (2, 'Garden Emerald', 'Emerald', 'Colombia', '2.18 ct', '$8,400', '/images/garden-emerald.jpg', 'A vivid green emerald with visible inclusions and a balanced rectangular outline.', 'Green', 'Rectangular step cut', 'Moderate jardin (sample)', '8.1 × 6.4 × 4.3 mm', 'Oiling noted in sample data', 'DEMO-GEM-002', 'Training data only; not an independent grading report.'),
  (3, 'Rosecut Ruby', 'Ruby', 'Mozambique', '1.76 ct', '$5,900', '/images/rosecut-ruby.jpg', 'A raspberry-red ruby in a rose cut, with a low profile and a softer play of light.', 'Red', 'Rose cut', 'Visible inclusions (sample)', '7.2 × 6.1 × 3.8 mm', 'No treatment recorded in sample data', 'DEMO-GEM-003', 'Training data only; not an independent grading report.'),
  (4, 'Golden Beryl', 'Other', 'Brazil', '5.06 ct', '$3,200', '/images/golden-beryl.jpg', 'A warm yellow beryl with an open step cut and a broad face-up view.', 'Yellow', 'Step cut', 'Eye-clean (sample)', '12.4 × 9.2 × 6.1 mm', 'No treatment recorded in sample data', 'DEMO-GEM-004', 'Training data only; not an independent grading report.'),
  (5, 'Twilight Spinel', 'Other', 'Vietnam', '1.92 ct', '$4,750', '/images/twilight-spinel.jpg', 'A violet-grey spinel with a crisp cushion outline and a subtle shift in changing light.', 'Violet', 'Cushion mixed cut', 'Eye-clean (sample)', '7.8 × 6.9 × 4.6 mm', 'No treatment recorded in sample data', 'DEMO-GEM-005', 'Training data only; not an independent grading report.'),
  (6, 'Seafoam Tourmaline', 'Other', 'Namibia', '4.11 ct', '$6,100', '/images/seafoam-tourmaline.jpg', 'A seafoam-green tourmaline with a soft transition from pale mint to deeper green.', 'Green', 'Cushion brilliant cut', 'Eye-clean (sample)', '10.1 × 8.2 × 5.3 mm', 'No heat indicated in sample data', 'DEMO-GEM-006', 'Training data only; not an independent grading report.');
