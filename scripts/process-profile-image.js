#!/usr/bin/env node
// scripts/process-profile-image.js
// Usage: put your input image at ./input.jpg and run `node scripts/process-profile-image.js`

const sharp = require('sharp');
const fs = require('fs');

const INPUT = 'input.jpg';
const OUTPUT = 'assets/profile.webp';

async function run() {
  if (!fs.existsSync(INPUT)) {
    console.error(`Input file ${INPUT} not found. Please place your photo as ${INPUT} in the repo root.`);
    process.exit(1);
  }

  try {
    // Step 1: Resize & center-crop to 400x400
    await sharp(INPUT)
      .resize(400, 400, { fit: 'cover', position: 'centre' })
      .modulate({ brightness: 1.03, saturation: 1.05 })
      .sharpen()
      .webp({ quality: 80 })
      .toFile(OUTPUT);

    console.log(`Processed image written to ${OUTPUT}`);
  } catch (err) {
    console.error('Image processing failed:', err);
    process.exit(1);
  }
}

run();
