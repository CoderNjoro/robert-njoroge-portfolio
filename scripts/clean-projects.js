const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'data', 'projects.json');

function cleanProjects() {
    console.log('Reading projects.json...');
    const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
    const projects = JSON.parse(fileContent);

    console.log(`Found ${projects.length} projects`);
    console.log(`Current file size: ${Math.round(fs.statSync(dataFilePath).size / 1024 / 1024)}MB`);

    // Create backup
    const backupPath = dataFilePath + '.backup';
    fs.copyFileSync(dataFilePath, backupPath);
    console.log(`Backup created at ${backupPath}`);

    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        console.log(`\nProject ${i + 1}: ${project.title}`);

        if (project.images && project.images.length > 0) {
            const originalCount = project.images.length;
            // Keep only first 3 images to reduce file size
            project.images = project.images.slice(0, 3);
            console.log(`  Reduced images from ${originalCount} to ${project.images.length}`);
        }
    }

    // Save cleaned version
    fs.writeFileSync(dataFilePath, JSON.stringify(projects, null, 4), 'utf-8');

    const newSize = fs.statSync(dataFilePath).size;
    console.log(`\nDone! New file size: ${Math.round(newSize / 1024)}KB (${Math.round(newSize / 1024 / 1024 * 100) / 100}MB)`);
}

cleanProjects();
