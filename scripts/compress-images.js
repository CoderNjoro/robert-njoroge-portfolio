const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

const dataFilePath = path.join(__dirname, '..', 'data', 'projects.json');

async function compressImage(base64Data) {
    if (!base64Data || !base64Data.startsWith('data:image')) {
        return base64Data;
    }

    try {
        const img = await loadImage(base64Data);
        const canvas = createCanvas(img.width, img.height);
        const ctx = canvas.getContext('2d');

        // Resize to max 800px width
        const maxWidth = 800;
        const scale = Math.min(1, maxWidth / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Compress to 70% quality
        return canvas.toDataURL('image/jpeg', 0.7);
    } catch (error) {
        console.error('Error compressing image:', error);
        return base64Data;
    }
}

async function compressProjects() {
    console.log('Reading projects.json...');
    const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
    const projects = JSON.parse(fileContent);

    console.log(`Found ${projects.length} projects`);

    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        console.log(`Processing project ${i + 1}/${projects.length}: ${project.title}`);

        if (project.images && project.images.length > 0) {
            console.log(`  Compressing ${project.images.length} images...`);
            const compressedImages = [];

            for (let j = 0; j < project.images.length; j++) {
                const compressed = await compressImage(project.images[j]);
                compressedImages.push(compressed);
                console.log(`    Image ${j + 1}/${project.images.length} compressed`);
            }

            project.images = compressedImages;
        }
    }

    // Create backup
    const backupPath = dataFilePath + '.backup';
    fs.copyFileSync(dataFilePath, backupPath);
    console.log(`Backup created at ${backupPath}`);

    // Save compressed version
    fs.writeFileSync(dataFilePath, JSON.stringify(projects, null, 4), 'utf-8');

    const newSize = fs.statSync(dataFilePath).size;
    console.log(`Done! New file size: ${Math.round(newSize / 1024)}KB`);
}

compressProjects().catch(console.error);
