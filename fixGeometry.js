const mongoose = require("mongoose");
const Listing = require("./models/listing");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function fixGeometry() {
    await mongoose.connect(MONGO_URL);
    console.log("DB Connected");

    const listings = await Listing.find({
        $or: [
            { "geometry.latitude": { $exists: false } },
            { "geometry.latitude": null }
        ]
    });

    console.log(`${listings.length} listings fix karni hain...`);

    for (let listing of listings) {
        const address = `${listing.location}, ${listing.country}`;
        console.log(`Fixing: ${address}`);

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
                { headers: { "User-Agent": "wanderlust-app" } }
            );
            const data = await response.json();

            if (data.length > 0) {
                listing.geometry = {
                    latitude: parseFloat(data[0].lat),
                    longitude: parseFloat(data[0].lon),
                };
                await listing.save();
                console.log(`✅ Fixed: ${address}`);
            } else {
                console.log(`❌ Not found: ${address}`);
            }

            await new Promise(resolve => setTimeout(resolve, 1000));

        } catch (err) {
            console.log(`Error: ${address}`, err);
        }
    }

    console.log("Sab fix ho gaya!");
    mongoose.connection.close();
}

fixGeometry();