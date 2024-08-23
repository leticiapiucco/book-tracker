const whitelist = ['http://example1.com', 'http://example2.com']; // Define your whitelist of allowed origins

export const corsOptions = {
	origin: function (origin, callback) {
	  if (whitelist.indexOf(origin) !== -1 || !origin) {
		callback(null, true);
	  } else {
		callback(new Error('Not allowed by CORS'));
	  }
	},
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	// allowedHeaders: ['Content-Type', 'Authorization'], // Add any custom headers you need
	// credentials: true, // Enable if you need to send cookies or HTTP authentication headers
};