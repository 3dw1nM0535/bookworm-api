import express from 'express';

const router = express.Router();

router.get('/search', (req, res) => {
	res.json({
		books: [
			{
				goodreadsId: 1,
				title: 'How To Be Perfect',
				authors: 'Karthian Brands',
				covers: [
					'https://spark.adobe.com/images/landing/examples/how-to-book-cover.jpg',
					'https://images.custommade.com/e8s7ryMxDLbQGsmvN3GaQh-78h0=/custommade-photosets/248743/248743.906190.jpg'
				],
				pages: 198,
			},
			{
				goodreadsId: 2,
				title: 'Red Clocks',
				authors: 'Jerome K. Jerome',
				covers: [
					'https://images.gr-assets.com/books/1494345016l/35099035.jpg',
					'http://www.creativindie.com/wp-content/uploads/2013/10/Enchantment-Book-Cover-Best-Seller1.jpg'
				],
				pages: 256
			}
		]
	});
});

export default router;
